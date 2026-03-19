/**
 * A simple SplitText implementation that replaces GSAP's premium SplitText plugin.
 * It provides .words, .chars, and .lines properties for easy animation.
 */
export class SplitText {
  element: HTMLElement;
  options: { type: string; linesClass?: string; wordsClass?: string; charsClass?: string };
  originalHTML: string;
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  lines: HTMLElement[] = [];

  constructor(element: HTMLElement | string | (string | HTMLElement)[], options: { type: string; linesClass?: string; wordsClass?: string; charsClass?: string }) {
    if (Array.isArray(element)) {
      // Find the first valid element if passed an array/selector
      const first = element.find(el => typeof el === 'string' || el instanceof HTMLElement);
      if (typeof first === 'string') {
        this.element = document.querySelector(first) as unknown as HTMLElement;
      } else {
        this.element = first as unknown as HTMLElement;
      }
    } else if (typeof element === 'string') {
      this.element = document.querySelector(element) as unknown as HTMLElement;
    } else {
      this.element = element;
    }

    if (!this.element) {
        throw new Error(`SplitText: Element not found: ${element}`);
    }

    this.options = options;
    this.originalHTML = this.element.innerHTML;
    this.init();
  }

  init() {
    const text = this.element.innerText;
    const types = this.options.type.split(',');

    this.element.innerHTML = '';
    
    // Simple word & char splitting
    const wordsArr = text.trim().split(/\s+/);
    
    wordsArr.forEach((wordText, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      if (this.options.wordsClass) wordSpan.classList.add(this.options.wordsClass);
      
      if (types.includes('chars')) {
        wordText.split('').forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.style.display = 'inline-block';
          charSpan.innerText = char;
          if (this.options.charsClass) charSpan.classList.add(this.options.charsClass);
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        });
      } else {
        wordSpan.innerText = wordText;
      }

      this.element.appendChild(wordSpan);
      this.words.push(wordSpan);

      // Add space after word if not the last one
      if (wordIdx < wordsArr.length - 1) {
        this.element.appendChild(document.createTextNode(' '));
      }
    });

    // Simple line splitting (based on offsetTop)
    if (types.includes('lines')) {
      this.splitIntoLines();
    }
  }

  splitIntoLines() {
    const linesMap = new Map<number, HTMLElement[]>();
    
    // Group words by their offsetTop
    this.words.forEach(word => {
      const top = word.offsetTop;
      if (!linesMap.has(top)) {
        linesMap.set(top, []);
      }
      linesMap.get(top)!.push(word);
    });

    this.element.innerHTML = '';
    const sortedTops = Array.from(linesMap.keys()).sort((a, b) => a - b);
    
    sortedTops.forEach(top => {
      const lineWords = linesMap.get(top)!;
      const lineSpan = document.createElement('div');
      lineSpan.style.display = 'block';
      if (this.options.linesClass) lineSpan.classList.add(this.options.linesClass);
      
      lineWords.forEach((word, idx) => {
        lineSpan.appendChild(word);
        if (idx < lineWords.length - 1) {
          lineSpan.appendChild(document.createTextNode(' '));
        }
      });

      this.element.appendChild(lineSpan);
      this.lines.push(lineSpan);
    });
  }

  revert() {
    this.element.innerHTML = this.originalHTML;
  }
}
