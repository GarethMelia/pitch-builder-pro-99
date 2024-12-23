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

    const prompt = `
      You are tasked with writing a compelling and professionally formatted proposal that persuades the client to move forward with the project. Use the provided information to create a tailored, persuasive proposal.

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

      Structure the proposal with the following sections:

      1. EXECUTIVE SUMMARY
      - Provide a concise overview of the proposal's purpose
      - Highlight the client's primary goals and how this proposal will meet them
      - End with a strong value statement

      2. UNDERSTANDING THE CLIENT
      - Demonstrate deep understanding of their business, goals, and challenges
      - Show industry expertise and knowledge of their target audience
      - Address specific pain points identified

      3. PROPOSED SOLUTION
      - Detail specific services and strategies to achieve their goals
      - Use results-oriented language with concrete metrics
      - Outline key deliverables and methodologies
      - Include implementation approach

      4. WHY CHOOSE US
      - Highlight company credentials and unique value proposition
      - Showcase relevant experience and success stories
      - Feature client testimonials and awards
      - Emphasize any guarantees or special commitments

      5. TIMELINE AND MILESTONES
      - Present clear project phases and deliverables
      - Include specific timeframes where possible
      - Show key milestones and outcomes

      6. SUCCESS METRICS AND REPORTING
      - Detail how success will be measured
      - Outline specific KPIs and targets
      - Explain monitoring and reporting process

      7. NEXT STEPS
      - Provide clear call to action
      - Outline immediate next steps
      - Include contact information and response timeframes

      Formatting Guidelines:
      - Use clear headings and subheadings
      - Include bullet points for easy scanning
      - Keep paragraphs concise and focused
      - Use professional business language
      - Maintain consistent formatting throughout

      Style Requirements:
      - Professional yet approachable tone
      - Results-focused language
      - Data-driven where possible
      - Highly personalized to the client
      - Confident but not aggressive
      - Clear and jargon-free
      
      The proposal should be:
      - Highly tailored to their specific needs and industry
      - Professional and polished in presentation
      - Focused on concrete outcomes and ROI
      - Clear and easy to understand
      - Persuasive without being pushy
      - Backed by data and evidence where possible

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
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert business proposal writer with years of experience creating winning proposals. You excel at crafting compelling, professional, and persuasive business proposals that are highly personalized to each client\'s needs. Your proposals consistently achieve high conversion rates by focusing on client value and concrete outcomes.'
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