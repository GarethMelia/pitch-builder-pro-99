import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0';

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

    // Simulate website crawling (replace with actual crawling logic)
    const websiteData = {
      about: "Sample about section",
      contact: "Sample contact information",
      mission: "Sample mission statement",
    };

    // Generate overview using OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional business writer who creates engaging proposal overviews."
        },
        {
          role: "user",
          content: `Using the following website information, generate an overview for the proposal. The overview should summarize the company's purpose, key highlights, and values in a professional and engaging tone, tailored for the proposal:
          
          ${JSON.stringify(websiteData, null, 2)}`
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