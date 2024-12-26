import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0';
import { marked } from 'https://esm.sh/marked@9.1.6';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData } = await req.json();
    console.log('Received form data:', formData);

    if (!Deno.env.get('OPENAI_API_KEY')) {
      throw new Error('OpenAI API key not configured');
    }

    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    if (!formData) {
      throw new Error('No form data provided');
    }

    // Create a structured prompt from the form data
    const prompt = `
      Create a professional business proposal based on the following information:
      
      Company Information:
      - Company Name: ${formData.company_name || 'Not specified'}
      - Website: ${formData.website_url || 'Not specified'}
      - Primary Goal: ${formData.primary_goal || 'Not specified'}
      
      Services Offered:
      ${formData.services?.join(', ') || 'Not specified'}
      
      Target Audience:
      ${JSON.stringify(formData.target_audience || {})}
      
      Project Timeframe: ${formData.timeframe || 'Not specified'}
      
      Success Metrics:
      ${formData.success_metrics?.map((metric) => `- ${metric.id}: ${metric.value}`).join('\n') || 'Not specified'}
      
      Company Strengths:
      ${formData.strengths?.join('\n') || 'Not specified'}
      
      Challenges to Address:
      ${formData.challenges?.join('\n') || 'Not specified'}
      
      Recommended Strategies:
      ${formData.recommended_strategies?.join('\n') || 'Not specified'}
      
      Company Credentials:
      - Experience: ${formData.relevant_experience?.join('\n') || 'Not specified'}
      - Awards: ${formData.awards_recognitions?.join('\n') || 'Not specified'}
      - Guarantees: ${formData.guarantees?.join('\n') || 'Not specified'}
      
      Please write a detailed, professional proposal that:
      1. Introduces the company and establishes credibility
      2. Clearly outlines the services and solutions
      3. Demonstrates understanding of the client's needs
      4. Presents a clear action plan with timelines
      5. Includes success metrics and guarantees
      6. Maintains a ${formData.proposal_tone || 'professional'} tone
      7. Concludes with a clear call to action
      
      Format the proposal with clear sections and professional language.
    `;

    console.log('Sending prompt to OpenAI:', prompt);

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert business proposal writer with years of experience in creating compelling and successful proposals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    if (!completion.data?.choices?.[0]?.message?.content) {
      throw new Error('No proposal content generated');
    }

    // Convert markdown to HTML
    const markdownContent = completion.data.choices[0].message.content;
    const htmlContent = marked(markdownContent);

    return new Response(
      JSON.stringify({ formattedProposal: htmlContent }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in generate-proposal function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
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