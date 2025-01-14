import { Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

export class DOMUtils {
  static removeNoiseElements(doc: any): void {
    const noiseSelectors = [
      'script', 'style', 'noscript', 'iframe', 'img', 'svg', 'video', 'audio',
      '.cookie-notice', '.advertisement', '.social-share', 'nav',
      'header:not(.main-header)', 'footer:not(.main-footer)',
      '#cookie-banner', '.popup', '.modal', '.chat-widget'
    ];
    const noiseElements = doc.querySelectorAll(noiseSelectors.join(','));
    noiseElements.forEach((el: Element) => el.remove());
  }

  static findMainContent(doc: any): Element | null {
    const mainSelectors = [
      'main', 'article', '[role="main"]', '#main-content', '.main-content',
      '.content', '#content', '.page-content', '.site-content', '.entry-content',
      '.post-content', '.container', '.wrapper',
      'section[class*="about"]', 'div[class*="about"]',
      'section[class*="mission"]', 'div[class*="mission"]',
      'section[class*="vision"]', 'div[class*="vision"]'
    ];

    for (const selector of mainSelectors) {
      const element = doc.querySelector(selector);
      if (element) return element;
    }
    return doc.body;
  }

  static cleanContent(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .replace(/[^\S\n]+/g, ' ')
      .trim();
  }
}