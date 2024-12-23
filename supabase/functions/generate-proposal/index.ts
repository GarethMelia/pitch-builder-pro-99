import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { FirecrawlApp } from "npm:@mendable/firecrawl-js";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { websiteUrl, formData } = await req.json();

    // Initialize Firecrawl
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
    
    // Crawl website
    const crawlResult = await firecrawl.crawlUrl(websiteUrl, {
      limit: 5,
      scrapeOptions: {
        formats: ['markdown']
      }
    });

    const websiteContent = crawlResult.data?.map(page => page.markdown).join('\n\n');

    const prompt = `
      Create a professional business proposal using the following information:
      
      Company Information:
      - Company Name: ${formData.company_name}
      - Primary Goal: ${formData.primary_goal}
      - Website: ${websiteUrl}
      
      Website Analysis:
      ${websiteContent}
      
      Additional Context:
      - Target Audience: ${JSON.stringify(formData.target_audience)}
      - Challenges: ${formData.challenges?.join(', ')}
      - Strengths: ${formData.strengths?.join(', ')}
      
      Proposal Structure:
      1. Executive Summary
      2. Company Overview
      3. Problem Statement
      4. Proposed Solutions
      5. Detailed Service Offerings
      6. Implementation Strategy
      7. Success Metrics
      8. Why Choose Us
      9. Next Steps

      Use a professional and persuasive tone. Highlight the company's unique strengths and how they address the target audience's needs.
    `;

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
            content: 'You are an expert business proposal writer creating comprehensive, persuasive proposals.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
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