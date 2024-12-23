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

    const prompt = `
      You are tasked with writing a compelling and professionally formatted proposal that persuades the client to move forward with the project. Use the inputs provided in the questionnaire and insights derived from the company's website to tailor the proposal.

      COMPANY INFORMATION:
      Company Name: ${formData.company_name}
      Primary Goal: ${formData.primary_goal}
      Website: ${websiteUrl}
      Target Audience: ${JSON.stringify(formData.target_audience)}
      Services: ${formData.services?.join('\n')}
      Challenges: ${formData.challenges?.join('\n')}
      Company Strengths: ${formData.strengths?.join('\n')}
      Success Metrics: ${JSON.stringify(formData.success_metrics)}
      Proposal Tone: ${formData.proposal_tone || 'Professional and confident'}
      Persuasion Level: ${formData.persuasion_level || 'Moderate'}
      Awards & Recognition: ${formData.awards_recognitions?.join('\n')}
      Testimonials: ${JSON.stringify(formData.testimonials)}
      Reasons to Work With Us: ${formData.reasons_to_work_with}

      Key Components to Include:

      1. EXECUTIVE SUMMARY
      - Provide a concise overview of the proposal's purpose
      - Highlight the client's primary goals and how this proposal will meet them
      - End with a strong value statement

      2. UNDERSTANDING THE CLIENT
      - Summarize insights about their business, goals, and challenges
      - Demonstrate understanding of their industry and audience
      - Address specific pain points identified

      3. PROPOSED SOLUTION
      - Outline specific services, strategies, or tactics
      - Use results-oriented language with concrete metrics
      - Include key deliverables and methodologies

      4. WHY CHOOSE US
      - Highlight unique strengths, awards, and experience
      - Feature client testimonials
      - Emphasize guarantees or special commitments

      5. TIMELINE AND MILESTONES
      - Present clear project phases
      - Include specific timeframes
      - Show key deliverables

      6. SUCCESS METRICS AND REPORTING
      - Detail how success will be measured
      - Outline specific KPIs and targets
      - Explain monitoring process

      7. NEXT STEPS
      - Provide clear call to action
      - Outline immediate next steps
      - Include contact information

      Format the response in clear sections with proper headings and professional business language.
      Make it persuasive and tailored to the client's specific needs.
    `;

    console.log('Sending request to OpenAI with prompt');

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
            content: 'You are an expert business proposal writer with years of experience creating winning proposals. You excel at crafting compelling, professional, and persuasive business proposals that are highly personalized to each client\'s needs.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
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