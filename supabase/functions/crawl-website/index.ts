import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    // Make a direct fetch request to the URL
    const response = await fetch(url);
    const htmlContent = await response.text();

    // Basic extraction of relevant content using regex
    const extractContent = (html: string) => {
      const removeHtmlTags = (str: string) => str.replace(/<[^>]*>/g, ' ');
      const removeExtraSpaces = (str: string) => str.replace(/\s+/g, ' ').trim();

      // Extract content between specific tags or from meta descriptions
      const metaDescription = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);

      return {
        title: titleMatch ? removeExtraSpaces(titleMatch[1]) : '',
        description: metaDescription ? removeExtraSpaces(metaDescription[1]) : '',
        content: bodyContent ? removeExtraSpaces(removeHtmlTags(bodyContent[1])).substring(0, 1000) : ''
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
          content: "You are a professional business writer who creates engaging proposal overviews."
        },
        {
          role: "user",
          content: `Using the following website information, generate an overview for the proposal. The overview should summarize the company's purpose, key highlights, and values in a professional and engaging tone, tailored for the proposal:
          
          ${JSON.stringify(extractedData, null, 2)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const overview = completion.data.choices[0].message?.content || '';

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
      JSON.stringify({ success: false, error: error.message }),
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