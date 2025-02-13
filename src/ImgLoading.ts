import { ImgLoadingItem } from './ImgLoadingItem';
import { ImgLoadingOptions, Selector } from './types/index';

export class ImgLoading {
  public elements: Array<HTMLElement> = [];
  public items: Array<ImgLoadingItem> = [];
  public imagesContainer: HTMLElement | null = null;
  public prefix = 'il';
  public intersectionObserver: IntersectionObserver | null = null;

  constructor() {}

  public withPrefix(text: string) {
    return `${this.prefix}-${text}`;
  }

  getElements(selector: Selector): NodeListOf<Element> | NodeList {
    if (typeof selector === 'string') {
      return document.querySelectorAll(selector);
    } else if (selector instanceof HTMLElement) {
      return document.querySelectorAll(selector.tagName);
    } else if (selector instanceof Element) {
      return document.querySelectorAll(selector.tagName);
    } else if (selector instanceof NodeList) {
      return selector;
    } else if (selector instanceof HTMLCollection) {
      return document.querySelectorAll(
        Array.from(selector)
          .map((el) => el.tagName)
          .join(','),
      );
    } else if (Array.isArray(selector)) {
      return document.querySelectorAll(
        selector.map((el) => el.tagName).join(','),
      );
    } else if (selector instanceof Object && 'length' in selector) {
      return document.querySelectorAll(
        Array.from(selector)
          .map((el) => el.tagName)
          .join(','),
      );
    } else {
      return document.querySelectorAll('');
    }
  }

  getHtmlElementFromNode(elements: NodeListOf<Element> | NodeList) {
    this.elements = Array.from(elements) as Array<HTMLElement>;
  }

  public getItemsFromElements() {
    this.items = this.elements
      .map((element) => ImgLoadingItem.fromNode(element, this))
      .filter(Boolean);
  }

  init(selector: Selector, options: ImgLoadingOptions = {}) {
    const actualOptions = Object.assign(
      {
        prefix: 'il',
      },
      options,
    );
    this.prefix = actualOptions.prefix;
    this.imagesContainer = actualOptions.container || null;

    if (this.imagesContainer) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(
          (entry) => {
            if (entry.isIntersecting) {
              const item = this.items.find(
                (item) => item.node === entry.target,
              );

              if (item) {
                if (!item.isImgLoaded || !item.isThumbnailLoaded) {
                  item.load();
                }
              }
            }
          },
          {
            root: this.imagesContainer,
          },
        );
      });
    }

    this.getHtmlElementFromNode(this.getElements(selector));
    this.getItemsFromElements();
  }
}
