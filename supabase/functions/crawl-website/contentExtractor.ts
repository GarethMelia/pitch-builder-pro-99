import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { SectionConfig, SectionData } from './types.ts';

export class ContentExtractor {
  private doc: any;
  private headings: Element[];
  
  constructor(html: string) {
    const parser = new DOMParser();
    this.doc = parser.parseFromString(html, 'text/html');
    this.headings = Array.from(this.doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  }

  private calculateConfidence(content: string, config: SectionConfig): number {
    let score = 0;
    const normalizedContent = content.toLowerCase();
    
    // Check for keywords presence
    config.keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = normalizedContent.match(regex);
      if (matches) {
        score += matches.length * 0.2; // 0.2 points per keyword match
      }
    });

    // Length scoring (ideal length between 100-500 characters)
    const lengthScore = Math.min(content.length / 500, 1) * 0.3;
    score += lengthScore;

    // Sentence structure scoring (complete sentences)
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = sentences.reduce((acc, s) => 
      acc + s.trim().split(/\s+/).length, 0) / sentences.length;
    if (avgWordsPerSentence >= 5 && avgWordsPerSentence <= 25) {
      score += 0.3;
    }

    return Math.min(score, 1); // Normalize to 0-1
  }

  private extractContentFromElement(element: Element): string {
    let content = '';
    let currentElement: Element | null = element;

    // Get content from the current element and its siblings until next heading
    while (currentElement && !currentElement.tagName.match(/^H[1-6]$/)) {
      if (currentElement.textContent) {
        content += currentElement.textContent.trim() + ' ';
      }
      currentElement = currentElement.nextElementSibling;
    }

    // If content is too short, try getting content from parent container
    if (content.length < 100) {
      const parent = element.closest('section, div, article');
      if (parent) {
        content = Array.from(parent.children)
          .filter(child => !child.tagName.match(/^(H[1-6]|SCRIPT|STYLE|NAV|HEADER|FOOTER)$/))
          .map(child => child.textContent?.trim())
          .filter(Boolean)
          .join(' ');
      }
    }

    return content.trim();
  }

  public findSection(config: SectionConfig): SectionData | null {
    let bestMatch: SectionData | null = null;
    let maxConfidence = 0;

    // Search through headings
    this.headings.forEach((heading, index) => {
      const headingText = heading.textContent?.toLowerCase() || '';
      
      // Check if heading matches any variation
      if (config.variations.some(v => headingText.includes(v.toLowerCase()))) {
        const content = this.extractContentFromElement(heading);
        const confidence = this.calculateConfidence(content, config);
        
        if (confidence > maxConfidence) {
          maxConfidence = confidence;
          bestMatch = {
            content,
            confidence,
            source: headingText,
            position: index
          };
        }
      }
    });

    // If no match found through headings, try meta tags
    if (!bestMatch) {
      const metaTags = this.doc.querySelectorAll('meta[name], meta[property]');
      metaTags.forEach((meta: Element) => {
        const name = (meta.getAttribute('name') || meta.getAttribute('property'))?.toLowerCase();
        const content = meta.getAttribute('content');
        
        if (name && content && config.variations.some(v => name.includes(v.toLowerCase()))) {
          const confidence = this.calculateConfidence(content, config);
          if (confidence > maxConfidence) {
            maxConfidence = confidence;
            bestMatch = {
              content,
              confidence,
              source: `meta:${name}`,
              position: -1
            };
          }
        }
      });
    }

    return bestMatch;
  }
}