import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { formData } = await req.json()
    console.log('Received form data:', formData)

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Create a structured prompt from the form data
    const prompt = `
      Create a professional business proposal based on the following information:
      
      Company Information:
      - Company Name: ${formData.company_name}
      - Website: ${formData.website_url}
      - Primary Goal: ${formData.primary_goal}
      
      Services Offered:
      ${formData.services?.join(', ')}
      
      Target Audience:
      ${JSON.stringify(formData.target_audience)}
      
      Project Timeframe: ${formData.timeframe}
      
      Success Metrics:
      ${formData.success_metrics?.map((metric: any) => `- ${metric.id}: ${metric.value}`).join('\n')}
      
      Company Strengths:
      ${formData.strengths?.join('\n')}
      
      Challenges to Address:
      ${formData.challenges?.join('\n')}
      
      Recommended Strategies:
      ${formData.recommended_strategies?.join('\n')}
      
      Company Credentials:
      - Experience: ${formData.relevant_experience?.join('\n')}
      - Awards: ${formData.awards_recognitions?.join('\n')}
      - Guarantees: ${formData.guarantees?.join('\n')}
      
      Please write a detailed, professional proposal that:
      1. Introduces the company and establishes credibility
      2. Clearly outlines the services and solutions
      3. Demonstrates understanding of the client's needs
      4. Presents a clear action plan with timelines
      5. Includes success metrics and guarantees
      6. Maintains a ${formData.proposal_tone || 'professional'} tone
      7. Concludes with a clear call to action
      
      Format the proposal with clear sections and professional language.
    `

    console.log('Sending prompt to OpenAI:', prompt)

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
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
    })

    const formattedProposal = completion.data.choices[0].message?.content

    console.log('Generated proposal:', formattedProposal)

    return new Response(
      JSON.stringify({ formattedProposal }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      },
    )
  }
})