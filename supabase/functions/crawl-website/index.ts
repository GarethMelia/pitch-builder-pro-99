import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser, Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0';

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

    // Fetch the webpage content
    console.log('Fetching webpage content...');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch webpage: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    
    // Parse the HTML content using deno_dom
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    if (!doc) {
      throw new Error('Failed to parse HTML content');
    }

    // Extract relevant information with proper type handling
    const titleElement = doc.querySelector('title');
    const descriptionMeta = doc.querySelector('meta[name="description"]');
    const headings = Array.from(doc.querySelectorAll('h1, h2'));
    const paragraphs = Array.from(doc.querySelectorAll('p'));
    const navLinks = Array.from(doc.querySelectorAll('nav a'));

    const websiteData = {
      title: titleElement?.textContent || '',
      description: descriptionMeta?.getAttribute('content') || '',
      headings: headings
        .map((el) => (el as Element).textContent?.trim())
        .filter((text): text is string => text !== undefined && text !== null)
        .slice(0, 5),
      content: paragraphs
        .map((el) => (el as Element).textContent?.trim())
        .filter((text): text is string => text !== undefined && text !== null)
        .slice(0, 5)
        .join('\n'),
      navigation: navLinks
        .map((el) => ({
          text: (el as Element).textContent?.trim() || '',
          href: (el as Element).getAttribute('href') || ''
        }))
        .filter(link => link.text)
        .slice(0, 5)
    };

    console.log('Extracted website data:', websiteData);

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    // Generate overview using OpenAI
    console.log('Generating overview with OpenAI...');
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
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