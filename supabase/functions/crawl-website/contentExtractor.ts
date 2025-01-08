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
        score += matches.length * 0.2;
      }
    });

    // Length scoring
    const lengthScore = Math.min(content.length / 500, 1) * 0.3;
    score += lengthScore;

    // Sentence structure scoring
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = sentences.reduce((acc, s) => 
      acc + s.trim().split(/\s+/).length, 0) / sentences.length;
    if (avgWordsPerSentence >= 5 && avgWordsPerSentence <= 25) {
      score += 0.3;
    }

    return Math.min(score, 1);
  }

  private findParentSection(element: Element): Element | null {
    let current = element;
    while (current.parentElement) {
      if (current.parentElement.tagName.toLowerCase() === 'section' ||
          current.parentElement.tagName.toLowerCase() === 'article' ||
          current.parentElement.tagName.toLowerCase() === 'div') {
        return current.parentElement;
      }
      current = current.parentElement;
    }
    return null;
  }

  private extractContentFromElement(element: Element): string {
    let content = '';
    
    // First try to get content from next siblings until next heading
    let currentElement: Element | null = element;
    while (currentElement && !currentElement.tagName.match(/^H[1-6]$/)) {
      if (currentElement.textContent) {
        content += currentElement.textContent.trim() + ' ';
      }
      currentElement = currentElement.nextElementSibling;
    }

    // If content is too short, try getting content from parent container
    if (content.length < 100) {
      const parentSection = this.findParentSection(element);
      if (parentSection) {
        const children = Array.from(parentSection.children);
        content = children
          .filter(child => !child.tagName.match(/^(H[1-6]|SCRIPT|STYLE|NAV|HEADER|FOOTER)$/))
          .map(child => child.textContent?.trim())
          .filter(Boolean)
          .join(' ');
      }
    }

    return content.trim();
  }

  private extractMetaContent(name: string): string | null {
    const metaTag = this.doc.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    return metaTag?.getAttribute('content') || null;
  }

  public findSection(config: SectionConfig): SectionData | null {
    let bestMatch: SectionData | null = null;
    let maxConfidence = 0;

    // Search through headings
    this.headings.forEach((heading, index) => {
      const headingText = heading.textContent?.toLowerCase() || '';
      
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

    // Try meta tags if no good match found
    if (!bestMatch || maxConfidence < 0.3) {
      for (const variation of config.variations) {
        const metaContent = this.extractMetaContent(variation.toLowerCase().replace(/\s+/g, '-'));
        if (metaContent) {
          const confidence = this.calculateConfidence(metaContent, config);
          if (confidence > maxConfidence) {
            maxConfidence = confidence;
            bestMatch = {
              content: metaContent,
              confidence,
              source: `meta:${variation}`,
              position: -1
            };
          }
        }
      }
    }

    return bestMatch;
  }
}