import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1';

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
    
    if (!url) {
      throw new Error('URL is required');
    }

    console.log('Crawling website:', url);

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    // Make a direct fetch request to the URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const htmlContent = await response.text();

    // Extract content using regex
    const extractContent = (html: string) => {
      // Remove HTML tags and clean up text
      const removeHtmlTags = (str: string) => str.replace(/<[^>]*>/g, ' ');
      const removeExtraSpaces = (str: string) => str.replace(/\s+/g, ' ').trim();

      // Extract meta description
      const metaDescription = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
      
      // Extract title
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      
      // Extract body content
      const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);

      return {
        title: titleMatch ? removeExtraSpaces(titleMatch[1]) : '',
        description: metaDescription ? removeExtraSpaces(metaDescription[1]) : '',
        content: bodyContent ? removeExtraSpaces(removeHtmlTags(bodyContent[1])).substring(0, 1500) : ''
      };
    };

    const extractedData = extractContent(htmlContent);
    console.log('Extracted website data:', extractedData);

    // Generate overview using OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional business writer who creates engaging proposal overviews. Keep the overview concise, professional, and focused on key business aspects."
        },
        {
          role: "user",
          content: `Based on this website content, create a brief, professional overview that highlights the company's main business focus, value proposition, and any standout features. Use this information:

          Title: ${extractedData.title}
          Description: ${extractedData.description}
          Content: ${extractedData.content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const overview = completion.data.choices[0].message?.content;

    if (!overview) {
      throw new Error('Failed to generate overview');
    }

    console.log('Generated overview:', overview);

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
        error: error.message || 'An error occurred while processing the request' 
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