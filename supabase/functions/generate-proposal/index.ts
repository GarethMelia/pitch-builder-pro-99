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

    const prompt = `
      Create a professional business proposal with the following structure and formatting:
      
      # Business Proposal for ${formData.company_name}
      
      ## Executive Summary
      
      Prepared for: [Client Name]
      Prepared by: ${formData.company_name}
      Date: ${new Date().toLocaleDateString()}
      Website: ${formData.website_url}
      
      ## Introduction
      
      ${formData.primary_goal}
      
      ## Services Offered
      
      ${formData.services?.join('\n- ') || 'Not specified'}
      
      ## Target Audience
      
      ${JSON.stringify(formData.target_audience || {})}
      
      ## Project Timeline
      
      ${formData.timeframe || 'To be determined based on project requirements'}
      
      ## Success Metrics
      
      ${formData.success_metrics?.map((metric) => `- ${metric.id}: ${metric.value}`).join('\n') || 'Not specified'}
      
      ## Our Strengths
      
      ${formData.strengths?.map(strength => `- ${strength}`).join('\n') || 'Not specified'}
      
      ## Challenges We'll Address
      
      ${formData.challenges?.map(challenge => `- ${challenge}`).join('\n') || 'Not specified'}
      
      ## Recommended Strategies
      
      ${formData.recommended_strategies?.map(strategy => `- ${strategy}`).join('\n') || 'Not specified'}
      
      ## Company Credentials
      
      ### Experience
      ${formData.relevant_experience?.join('\n- ') || 'Not specified'}
      
      ### Awards & Recognition
      ${formData.awards_recognitions?.join('\n- ') || 'Not specified'}
      
      ### Guarantees
      ${formData.guarantees?.join('\n- ') || 'Not specified'}
      
      Please format this as a clean, professional business proposal without showing any markdown syntax in the final output.
    `;

    console.log('Sending prompt to OpenAI:', prompt);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert business proposal writer. Create a professional, well-formatted proposal without showing any markdown syntax in the output. Use proper formatting for headings, lists, and emphasis."
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

    const markdownContent = completion.data.choices[0].message.content;
    const htmlContent = marked(markdownContent, {
      headerIds: false,
      mangle: false
    });

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