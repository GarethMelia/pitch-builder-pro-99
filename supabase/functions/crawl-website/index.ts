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

    // Function to extract text content from elements and their children
    const extractContent = (element: Element): string => {
      if (!element) return '';
      
      // Get all text nodes within this element and its children
      const walker = doc.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null
      );

      let text = '';
      let node;
      while (node = walker.nextNode()) {
        text += node.textContent.trim() + ' ';
      }
      
      console.log('Extracted content length:', text.length);
      return text.trim();
    }

    // Function to find section by heading or class/id containing keywords
    const findSectionContent = (keywords: string[]): string => {
      let bestContent = '';

      // Try finding by headings and surrounding content
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      for (const heading of headings) {
        const headingText = heading.textContent?.toLowerCase() || '';
        for (const keyword of keywords) {
          if (headingText.includes(keyword.toLowerCase())) {
            let content = extractContent(heading);
            
            // Get parent section or div if it exists
            let parent = heading.parentElement;
            while (parent && !['section', 'div', 'article'].includes(parent.tagName.toLowerCase())) {
              parent = parent.parentElement;
            }
            
            if (parent) {
              content = extractContent(parent);
            } else {
              // If no suitable parent, get next siblings until next heading
              let nextElement = heading.nextElementSibling;
              while (nextElement && !nextElement.tagName.match(/^H[1-6]$/)) {
                content += ' ' + extractContent(nextElement);
                nextElement = nextElement.nextElementSibling;
              }
            }
            
            if (content.length > bestContent.length) {
              bestContent = content;
            }
          }
        }
      }

      // Try finding by common class/id names if no content found by headings
      if (!bestContent) {
        const possibleSelectors = keywords.flatMap(keyword => [
          `[class*="${keyword}"]`,
          `[id*="${keyword}"]`,
          `[class*="${keyword.replace(/\s+/g, '-')}"]`,
          `[id*="${keyword.replace(/\s+/g, '-')}"]`,
          `[class*="${keyword.replace(/\s+/g, '_')}"]`,
          `[id*="${keyword.replace(/\s+/g, '_')}"]`,
          `section[class*="${keyword}"]`,
          `div[class*="${keyword}"]`,
          `article[class*="${keyword}"]`
        ]);

        for (const selector of possibleSelectors) {
          try {
            const elements = doc.querySelectorAll(selector);
            elements.forEach(element => {
              const content = extractContent(element);
              if (content.length > bestContent.length && content.length > 50) {
                bestContent = content;
              }
            });
          } catch (e) {
            console.log(`Error with selector ${selector}:`, e);
          }
        }
      }

      // Try finding in meta tags if still no content
      if (!bestContent) {
        keywords.forEach(keyword => {
          const metaTag = doc.querySelector(`meta[name*="${keyword}"], meta[property*="${keyword}"]`);
          if (metaTag) {
            const content = metaTag.getAttribute('content');
            if (content && content.length > bestContent.length) {
              bestContent = content;
            }
          }
        });
      }

      return bestContent;
    }

    // Extract content for each section with multiple keyword variations
    const aboutUs = findSectionContent([
      'about', 'about us', 'about-us', 'who we are', 'our story', 
      'company', 'background', 'history'
    ]);
    
    const overview = findSectionContent([
      'overview', 'introduction', 'summary', 'what we do',
      'services', 'solutions', 'offerings'
    ]);
    
    const mission = findSectionContent([
      'mission', 'our mission', 'mission statement',
      'purpose', 'why we exist', 'what drives us'
    ]);
    
    const vision = findSectionContent([
      'vision', 'our vision', 'vision statement',
      'future', 'where we\'re going', 'goals'
    ]);

    console.log('Extraction results:', {
      aboutUs: `Found (${aboutUs.length} chars)`,
      overview: `Found (${overview.length} chars)`,
      mission: `Found (${mission.length} chars)`,
      vision: `Found (${vision.length} chars)`
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