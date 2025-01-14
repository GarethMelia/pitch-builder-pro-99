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

    // Fetch the webpage content with a proper user agent
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

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
      console.log(`Processing ${config.name} section...`);
      const sectionData = extractor.findSection(config);
      
      if (sectionData) {
        console.log(`Found ${config.name} section:`, {
          confidence: sectionData.confidence,
          source: sectionData.source,
          contentLength: sectionData.content.length
        });
        
        result.data[config.name] = sectionData;
      } else {
        console.log(`No ${config.name} section found`);
      }
    }

    // Check if any sections were found
    if (Object.keys(result.data).length === 0) {
      console.log('No sections found in the webpage');
      result.success = false;
      result.error = "No relevant sections found on the page";
    } else {
      console.log(`Successfully extracted ${Object.keys(result.data).length} sections`);
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