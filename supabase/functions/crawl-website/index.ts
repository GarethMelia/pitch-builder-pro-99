import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    console.log('Attempting to crawl URL:', url)

    if (!url) {
      throw new Error('URL is required')
    }

    // Fetch the webpage content
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`)
    }

    const html = await response.text()
    console.log('Successfully fetched HTML content')

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    if (!doc) {
      throw new Error('Failed to parse HTML')
    }

    // Function to extract text content from elements
    const extractContent = (element: Element): string => {
      if (!element) return '';
      const text = element.textContent?.trim() || '';
      console.log('Extracted content:', text.substring(0, 100) + '...'); // Log first 100 chars
      return text;
    }

    // Function to find section by heading or class/id containing keywords
    const findSectionContent = (keywords: string[]): string => {
      // Try finding by headings first
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      for (const heading of headings) {
        const text = heading.textContent?.toLowerCase() || '';
        for (const keyword of keywords) {
          if (text.includes(keyword.toLowerCase())) {
            let content = extractContent(heading);
            let nextElement = heading.nextElementSibling;
            while (nextElement && !nextElement.tagName.match(/^H[1-6]$/)) {
              content += ' ' + extractContent(nextElement);
              nextElement = nextElement.nextElementSibling;
            }
            return content.trim();
          }
        }
      }

      // Try finding by common class/id names
      const possibleSelectors = keywords.flatMap(keyword => [
        `[class*="${keyword}"]`,
        `[id*="${keyword}"]`,
        `[class*="${keyword.replace(/\s+/g, '-')}"]`,
        `[id*="${keyword.replace(/\s+/g, '-')}"]`,
        `[class*="${keyword.replace(/\s+/g, '_')}"]`,
        `[id*="${keyword.replace(/\s+/g, '_')}"]`
      ]);

      for (const selector of possibleSelectors) {
        try {
          const element = doc.querySelector(selector);
          if (element) {
            const content = extractContent(element);
            if (content.length > 20) { // Minimum content length threshold
              return content;
            }
          }
        } catch (e) {
          console.log(`Error with selector ${selector}:`, e);
        }
      }

      return '';
    }

    // Extract content for each section with multiple keyword variations
    const aboutUs = findSectionContent(['about', 'about us', 'about-us', 'who we are', 'our story']);
    const overview = findSectionContent(['overview', 'introduction', 'summary']);
    const mission = findSectionContent(['mission', 'our mission', 'mission statement']);
    const vision = findSectionContent(['vision', 'our vision', 'vision statement']);

    console.log('Extraction results:', {
      aboutUs: aboutUs ? 'Found' : 'Not found',
      overview: overview ? 'Found' : 'Not found',
      mission: mission ? 'Found' : 'Not found',
      vision: vision ? 'Found' : 'Not found'
    });

    const result = {
      success: true,
      data: {
        about_us: aboutUs,
        overview: overview,
        mission: mission,
        vision: vision
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

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
    )
  }
})