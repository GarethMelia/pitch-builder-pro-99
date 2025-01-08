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
    console.log('Crawling URL:', url)

    if (!url) {
      throw new Error('URL is required')
    }

    // Fetch the webpage content
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`)
    }

    const html = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    if (!doc) {
      throw new Error('Failed to parse HTML')
    }

    // Function to extract text content from elements
    const extractContent = (element: Element): string => {
      return element?.textContent?.trim() || ''
    }

    // Function to find section by heading text
    const findSectionByHeading = (headingText: string): string => {
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
      for (const heading of headings) {
        const text = heading.textContent?.toLowerCase() || ''
        if (text.includes(headingText.toLowerCase())) {
          // Get the next sibling elements until the next heading
          let content = ''
          let currentElement = heading.nextElementSibling
          while (currentElement && !currentElement.tagName.match(/^H[1-6]$/)) {
            content += extractContent(currentElement) + ' '
            currentElement = currentElement.nextElementSibling
          }
          return content.trim()
        }
      }
      return ''
    }

    // Extract content for each section
    const aboutUs = findSectionByHeading('about') || findSectionByHeading('about us')
    const overview = findSectionByHeading('overview')
    const mission = findSectionByHeading('mission')
    const vision = findSectionByHeading('vision')

    const result = {
      success: true,
      data: {
        about_us: aboutUs,
        overview: overview,
        mission: mission,
        vision: vision
      }
    }

    console.log('Crawling completed successfully')
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error crawling website:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})