import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0';
import { load } from "https://deno.land/x/cheerio@1.0.7/mod.ts";

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
    const html = await response.text();

    // Parse the HTML using cheerio
    const $ = load(html);

    // Extract relevant information
    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content') || '';
    const h1s = $('h1').map((_, el) => $(el).text()).get();
    const paragraphs = $('p').map((_, el) => $(el).text()).get().slice(0, 5); // Get first 5 paragraphs

    // Combine extracted data
    const websiteData = {
      title,
      description,
      headings: h1s,
      content: paragraphs.join('\n'),
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