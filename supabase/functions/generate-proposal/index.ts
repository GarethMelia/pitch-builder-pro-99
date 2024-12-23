import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { websiteUrl, formData } = await req.json();
    console.log('Received request with data:', { websiteUrl, formData });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log('Sending request to OpenAI');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert business proposal writer. Your task is to create a professional, compelling proposal based on the provided information. Focus on clear value propositions and actionable solutions.`
          },
          {
            role: 'user',
            content: `Create a detailed business proposal using this information:
              
              Company: ${formData.company_name}
              Website: ${websiteUrl}
              Primary Goal: ${formData.primary_goal}
              Target Audience: ${JSON.stringify(formData.target_audience)}
              Services Offered: ${formData.services?.join(', ')}
              Key Challenges: ${formData.challenges?.join(', ')}
              Company Strengths: ${formData.strengths?.join(', ')}
              
              Format the proposal to include:
              1. Executive Summary
              2. Understanding of Client Needs
              3. Proposed Solution
              4. Implementation Strategy
              5. Success Metrics
              6. Why Choose Us
              
              Make it professional, persuasive, and focused on value delivery.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('No content received from OpenAI');
    }

    const formattedProposal = data.choices[0].message.content;

    return new Response(JSON.stringify({ formattedProposal }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-proposal function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});