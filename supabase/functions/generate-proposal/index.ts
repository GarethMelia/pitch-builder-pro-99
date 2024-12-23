import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { websiteData, formData } = await req.json();

    const prompt = `
      Create a professional business proposal using the following information:
      
      Company Information:
      - Company Name: ${formData.company_name}
      - Primary Goal: ${formData.primary_goal}
      - Website: ${formData.website_url}
      
      Website Analysis Data:
      ${JSON.stringify(websiteData)}
      
      Additional Context:
      - Target Audience: ${JSON.stringify(formData.target_audience)}
      - Challenges: ${formData.challenges?.join(', ')}
      - Strengths: ${formData.strengths?.join(', ')}
      
      Format the proposal with clear sections including:
      1. Executive Summary
      2. Company Overview
      3. Problem Statement & Solutions
      4. Proposed Services
      5. Implementation Timeline
      6. Expected Outcomes
      7. Why Choose Us
      8. Next Steps
      
      Use a ${formData.proposal_tone || 'professional'} tone.
      Persuasion Level: ${formData.persuasion_level || 'moderate'}
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert business proposal writer. Create well-structured, persuasive proposals that incorporate website analysis data and highlight key value propositions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    const data = await response.json();
    const formattedProposal = data.choices[0].message.content;

    return new Response(JSON.stringify({ formattedProposal }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-proposal function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});