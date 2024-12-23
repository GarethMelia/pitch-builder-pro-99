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

    // Create a detailed prompt for the proposal
    const prompt = `
      As an expert business proposal writer, create a compelling and professional business proposal using the following information:

      COMPANY INFORMATION:
      Company Name: ${formData.company_name}
      Primary Goal: ${formData.primary_goal}
      Website: ${websiteUrl}

      TARGET AUDIENCE:
      ${JSON.stringify(formData.target_audience)}

      SERVICES TO BE PROVIDED:
      ${formData.services?.join('\n')}

      CHALLENGES TO ADDRESS:
      ${formData.challenges?.join('\n')}

      COMPANY STRENGTHS:
      ${formData.strengths?.join('\n')}

      PROPOSAL TONE: ${formData.proposal_tone || 'Professional and confident'}
      PERSUASION LEVEL: ${formData.persuasion_level || 'Moderate'}

      Please write a comprehensive business proposal that includes:

      1. An engaging executive summary that highlights our understanding of their needs and our unique value proposition
      2. A detailed breakdown of our proposed solutions and how they address the client's specific challenges
      3. Clear success metrics and expected outcomes
      4. A compelling section about why they should choose us, incorporating our strengths and relevant experience
      5. Implementation timeline and next steps

      The proposal should be:
      - Highly personalized to their needs
      - Professional yet engaging
      - Focused on value and outcomes
      - Clear and well-structured
      - Persuasive without being pushy

      Format the response in clear sections with proper headings and professional business language.
    `;

    console.log('Generating proposal with prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert business proposal writer with years of experience creating winning proposals. You excel at crafting compelling, professional, and persuasive business proposals that are highly personalized to each client\'s needs.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
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