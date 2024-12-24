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
    const { formData } = await req.json();
    console.log('Received form data:', formData);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Format the services, challenges, and metrics into readable bullet points
    const services = formData.services?.map((s: string) => `• ${s}`).join('\n') || 'N/A';
    const challenges = formData.challenges?.map((c: string) => `• ${c}`).join('\n') || 'N/A';
    const metrics = formData.success_metrics?.map((m: any) => `• ${m.id}: ${m.value}`).join('\n') || 'N/A';
    const strengths = formData.strengths?.map((s: string) => `• ${s}`).join('\n') || 'N/A';
    const strategies = formData.recommended_strategies?.map((s: string) => `• ${s}`).join('\n') || 'N/A';

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
            content: `You are an expert business proposal writer with years of experience. 
            Your task is to create a professional, compelling, and highly personalized proposal 
            that addresses the client's specific needs and demonstrates clear value.`
          },
          {
            role: 'user',
            content: `Create a detailed business proposal using this information:

COMPANY PROFILE:
Company Name: ${formData.company_name}
Primary Goal: ${formData.primary_goal}
Target Audience: ${JSON.stringify(formData.target_audience)}

SERVICES AND SOLUTIONS:
${services}

KEY CHALLENGES TO ADDRESS:
${challenges}

COMPANY STRENGTHS:
${strengths}

SUCCESS METRICS:
${metrics}

RECOMMENDED STRATEGIES:
${strategies}

Additional Information:
- Proposal Tone: ${formData.proposal_tone || 'Professional'}
- Timeline: ${formData.timeframe || 'To be discussed'}
- Why Choose Us: ${formData.reasons_to_work_with || 'Our expertise and track record'}

Format the proposal with these sections:
1. Executive Summary
   - Brief overview of the proposal
   - Value proposition
   - Key benefits

2. Understanding Your Needs
   - Current challenges
   - Business objectives
   - Target audience analysis

3. Our Proposed Solution
   - Detailed service description
   - Implementation approach
   - Expected outcomes

4. Implementation Strategy
   - Timeline and milestones
   - Key deliverables
   - Success metrics

5. Why Choose Us
   - Company strengths
   - Relevant experience
   - Unique value proposition

Make the proposal professional, persuasive, and focused on demonstrating clear value 
to the client. Use clear headings and maintain a confident yet approachable tone.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI');

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