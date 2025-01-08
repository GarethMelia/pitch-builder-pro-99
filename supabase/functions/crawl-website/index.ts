import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0';
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    console.log('Received URL to crawl:', url);

    if (!url) {
      throw new Error('URL is required');
    }

    // Launch browser
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      console.log('Navigating to URL:', url);
      
      // Set a reasonable timeout
      await page.setDefaultNavigationTimeout(15000);
      
      // Navigate to the page
      await page.goto(url, { waitUntil: 'networkidle0' });

      // Extract relevant information
      const websiteData = await page.evaluate(() => {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        
        // Get all text content from important elements
        const headings = Array.from(document.querySelectorAll('h1, h2')).map(el => el.textContent?.trim()).filter(Boolean);
        const paragraphs = Array.from(document.querySelectorAll('p')).map(el => el.textContent?.trim()).filter(Boolean);
        
        // Get navigation links to understand site structure
        const navLinks = Array.from(document.querySelectorAll('nav a')).map(el => ({
          text: el.textContent?.trim(),
          href: el.getAttribute('href')
        })).filter(link => link.text);

        return {
          title,
          description,
          headings: headings.slice(0, 5), // First 5 headings
          content: paragraphs.slice(0, 5).join('\n'), // First 5 paragraphs
          navigation: navLinks.slice(0, 5) // First 5 nav items
        };
      });

      console.log('Extracted website data:', websiteData);

      // Initialize OpenAI
      const configuration = new Configuration({
        apiKey: Deno.env.get('OPENAI_API_KEY'),
      });
      const openai = new OpenAIApi(configuration);

      // Generate overview using OpenAI
      console.log('Generating overview with OpenAI...');
      const completion = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional business writer who creates engaging proposal overviews."
          },
          {
            role: "user",
            content: `Using the following website information, generate a concise overview for the proposal. The overview should summarize the company's purpose, key highlights, and values in a professional and engaging tone:
            
            ${JSON.stringify(websiteData, null, 2)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const overview = completion.data.choices[0].message?.content;
      
      if (!overview) {
        throw new Error('Failed to generate overview with OpenAI');
      }

      console.log('Successfully generated overview');

      return new Response(
        JSON.stringify({ success: true, overview }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      );
    } finally {
      // Always close the browser
      await browser.close();
    }
  } catch (error) {
    console.error('Error in crawl-website function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process website' 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      },
    );
  }
});