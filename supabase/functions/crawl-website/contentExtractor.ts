import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { SectionConfig, SectionData } from './types.ts';

export class ContentExtractor {
  private doc: any;
  private headings: Element[];
  private allText: string;
  
  constructor(html: string) {
    const parser = new DOMParser();
    this.doc = parser.parseFromString(html, 'text/html');
    this.headings = Array.from(this.doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    this.allText = this.extractAllText();
  }

  private extractAllText(): string {
    // Remove script and style elements
    const scripts = this.doc.querySelectorAll('script, style, nav, footer, header');
    scripts.forEach((script: Element) => script.remove());
    
    // Get text content from body
    const bodyText = this.doc.body?.textContent || '';
    return bodyText.replace(/\s+/g, ' ').trim();
  }

  private calculateConfidence(content: string, config: SectionConfig): number {
    let score = 0;
    const normalizedContent = content.toLowerCase();
    
    // Check for keywords presence with weighted scoring
    config.keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = normalizedContent.match(regex);
      if (matches) {
        score += matches.length * 0.2;
      }
    });

    // Length scoring - prefer content between 50 and 1000 characters
    const lengthScore = Math.min(
      Math.max(content.length - 50, 0) / 950,
      1
    ) * 0.3;
    score += lengthScore;

    // Sentence structure scoring
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = sentences.reduce((acc, s) => 
      acc + s.trim().split(/\s+/).length, 0) / sentences.length;
    if (avgWordsPerSentence >= 5 && avgWordsPerSentence <= 25) {
      score += 0.3;
    }

    // Context relevance scoring
    const contextScore = config.variations.some(v => 
      content.toLowerCase().includes(v.toLowerCase())
    ) ? 0.2 : 0;
    score += contextScore;

    return Math.min(score, 1);
  }

  private findParentSection(element: Element): Element | null {
    let current = element;
    const maxDepth = 5; // Prevent infinite loops
    let depth = 0;
    
    while (current.parentElement && depth < maxDepth) {
      if (current.parentElement.tagName.toLowerCase() === 'section' ||
          current.parentElement.tagName.toLowerCase() === 'article' ||
          current.parentElement.tagName.toLowerCase() === 'div') {
        return current.parentElement;
      }
      current = current.parentElement;
      depth++;
    }
    return null;
  }

  private extractContentFromElement(element: Element, config: SectionConfig): string {
    let content = '';
    
    // First try to get content from next siblings until next heading
    let currentElement: Element | null = element;
    let paragraphCount = 0;
    const maxParagraphs = 3;
    
    while (currentElement && !currentElement.tagName.match(/^H[1-6]$/) && paragraphCount < maxParagraphs) {
      if (currentElement.tagName === 'P') {
        const text = currentElement.textContent?.trim();
        if (text && text.length > 20) { // Minimum length threshold
          content += text + ' ';
          paragraphCount++;
        }
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

    // Clean up the content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();

    return content;
  }

  private findInMetaTags(config: SectionConfig): SectionData | null {
    for (const variation of config.variations) {
      // Check standard meta tags
      const metaContent = this.doc.querySelector(
        `meta[name="${variation}"], meta[property="${variation}"], meta[name="og:${variation}"], meta[property="og:${variation}"]`
      )?.getAttribute('content');

      if (metaContent) {
        const confidence = this.calculateConfidence(metaContent, config);
        if (confidence > 0.3) {
          return {
            content: metaContent,
            confidence,
            source: `meta:${variation}`,
            position: -1
          };
        }
      }
    }
    return null;
  }

  public findSection(config: SectionConfig): SectionData | null {
    let bestMatch: SectionData | null = null;
    let maxConfidence = 0;

    // First try to find content through headings
    this.headings.forEach((heading, index) => {
      const headingText = heading.textContent?.toLowerCase() || '';
      
      if (config.variations.some(v => headingText.includes(v.toLowerCase()))) {
        const content = this.extractContentFromElement(heading, config);
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

    // If no good match found through headings, try meta tags
    if (!bestMatch || maxConfidence < 0.3) {
      const metaMatch = this.findInMetaTags(config);
      if (metaMatch && metaMatch.confidence > maxConfidence) {
        bestMatch = metaMatch;
        maxConfidence = metaMatch.confidence;
      }
    }

    // If still no good match, try searching in all text
    if (!bestMatch || maxConfidence < 0.3) {
      for (const variation of config.variations) {
        const regex = new RegExp(`(${variation}[:\\s-]+([^.!?]+[.!?]))`, 'i');
        const match = this.allText.match(regex);
        if (match) {
          const content = match[2].trim();
          const confidence = this.calculateConfidence(content, config);
          if (confidence > maxConfidence) {
            bestMatch = {
              content,
              confidence,
              source: 'full-text',
              position: -1
            };
            maxConfidence = confidence;
          }
        }
      }
    }

    return bestMatch;
  }
}