import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { ContentExtractor } from './contentExtractor.ts';
import { SECTION_CONFIGS } from './sectionConfig.ts';
import { CrawlResult } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    console.log('Attempting to crawl URL:', url);

    if (!url) {
      throw new Error('URL is required');
    }

    // Fetch the webpage content
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    console.log('Successfully fetched HTML content');

    const extractor = new ContentExtractor(html);
    const result: CrawlResult = {
      success: true,
      data: {}
    };

    // Extract content for each section
    for (const config of SECTION_CONFIGS) {
      console.log(`Searching for ${config.name} section...`);
      const sectionData = extractor.findSection(config);
      
      if (sectionData && sectionData.confidence > 0.3) {
        result.data[config.name] = sectionData;
        console.log(`Found ${config.name} section with confidence ${sectionData.confidence}`);
        console.log(`Content length: ${sectionData.content.length} characters`);
      } else {
        console.log(`No ${config.name} section found or confidence too low`);
      }
    }

    // Check if any sections were found
    if (Object.keys(result.data).length === 0) {
      result.success = false;
      result.error = "No relevant sections found on the page";
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error crawling website:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        details: error.stack
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});