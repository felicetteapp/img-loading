import { ImgLoading } from './ImgLoading';

export class ImgLoadingItem {
  public static propsToCheck = ['thumbnail', 'fullsize'];

  public fullsize: string;
  public node: HTMLElement;
  public imgEl: HTMLImageElement = new Image();
  public thumbnailEl: HTMLImageElement = new Image();
  public thumbnail: string = '';
  public loaded: boolean = false;
  public error: boolean = false;
  public imgWidth: number = 0;
  public imgHeight: number = 0;
  public mainColor: string = '';
  public aspectRatio: string = '1/1';
  public onLoaded?: (item: ImgLoadingItem) => void;
  public onError?: (item: ImgLoadingItem) => void;
  public parent: ImgLoading;
  private thumbnailLoaded: boolean = false;
  private imgLoaded: boolean = false;
  private thumbnailLoading: boolean = false;
  private imgLoading: boolean = false;

  public get isThumbnailLoaded() {
    return this.thumbnailLoaded;
  }

  public get isImgLoaded() {
    return this.imgLoaded;
  }

  public get isThumbnailLoading() {
    return this.thumbnailLoading;
  }

  public get isImgLoading() {
    return this.imgLoading;
  }

  constructor({
    fullsize,
    thumbnail,
    onLoaded,
    onError,
    parent,
    imgWidth,
    imgHeight,
    node,
    aspectRatio,
    mainColor,
  }: {
    fullsize: string;
    thumbnail: string;
    onLoaded?: (item: ImgLoadingItem) => void;
    onError?: (item: ImgLoadingItem) => void;
    parent: ImgLoading;
    node?: HTMLElement;
    imgWidth: number;
    imgHeight: number;
    aspectRatio?: string;
    mainColor?: string;
  }) {
    this.fullsize = fullsize;
    this.thumbnail = thumbnail;
    this.onLoaded = onLoaded;
    this.onError = onError;
    this.parent = parent;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.node = node;
    this.aspectRatio = aspectRatio || '1/1';
    this.mainColor = mainColor || '';

    this.imgEl = new Image();
    this.thumbnailEl = new Image();
    this.thumbnailEl.width = this.imgWidth;
    this.thumbnailEl.height = this.imgHeight;
    this.imgEl.width = this.imgWidth;
    this.imgEl.height = this.imgHeight;

    //clear the node style
    this.node.style.cssText = '';

    // add css variable to the node
    this.node.style.setProperty(
      `--${this.parent.withPrefix('main-color')}`,
      this.mainColor,
    );
    this.node.style.setProperty(
      `--${this.parent.withPrefix('aspect-ratio')}`,
      this.aspectRatio,
    );

    this.addClass('thumbnail', this.thumbnailEl);
    this.addClass('img', this.imgEl);
    this.addClass('item');
    this.addClass('item--initialized');
    this.node.innerHTML = '';

    this.imgEl.onload = () => {
      this.addClass('item--img-loaded');
      this.removeClass('item--img-loading');
      this.imgLoaded = true;
      this.onLoaded?.(this);
    };

    this.imgEl.onerror = () => {
      this.addClass('item--img-error');
      this.removeClass('item--img-loading');
      this.error = true;
      this.onError?.(this);
    };

    this.thumbnailEl.onload = () => {
      this.addClass('item--thumbnail-loaded');
      this.removeClass('item--thumbnail-loading');
      this.addClass('item--img-loading');
      this.thumbnailLoaded = true;
      this.imgEl.src = this.fullsize;
    };

    if (this.parent.intersectionObserver) {
      this.parent.intersectionObserver.observe(this.node);
    } else {
      this.load();
    }
  }

  public withPrefix(text: string) {
    return this.parent.withPrefix(text);
  }

  private addClasses(classNames: string[], node: HTMLElement = this.node) {
    classNames.forEach((className) => {
      node.classList.add(this.withPrefix(className));
    });
  }

  private removeClasses(classNames: string[], node: HTMLElement = this.node) {
    classNames.forEach((className) => {
      node.classList.remove(this.withPrefix(className));
    });
  }

  private addClass(className: string, node: HTMLElement = this.node) {
    this.addClasses([className], node);
  }

  private removeClass(className: string, node: HTMLElement = this.node) {
    this.removeClasses([className], node);
  }

  public load() {
    this.addClass('item--thumbnail-loading');
    this.thumbnailEl.src = this.thumbnail;
    this.node.appendChild(this.imgEl);
    this.node.appendChild(this.thumbnailEl);

    this.parent.intersectionObserver.unobserve(this.node);
  }

  public destroy() {
    if (this.parent.intersectionObserver) {
      this.parent.intersectionObserver.unobserve(this.node);
    }
    this.node.remove();
  }

  static elementHasCorrectData(
    element: HTMLElement,
    withPrefix: (text: string) => string,
  ) {
    const hasAllProps = ImgLoadingItem.propsToCheck.every((prop) =>
      element.hasAttribute(withPrefix(prop)),
    );
    if (!hasAllProps) {
      const missingProps = ImgLoadingItem.propsToCheck
        .filter((prop) => !element.hasAttribute(withPrefix(prop)))
        .map((prop) => withPrefix(prop));
      console.error(
        `Element is missing the following attributes: ${missingProps.join(
          ', ',
        )}`,
        element,
      );
    }
    return hasAllProps;
  }

  static extractDataFromAttributes(
    element: HTMLElement,
    withPrefix: (text: string) => string,
  ) {
    if (!ImgLoadingItem.elementHasCorrectData(element, withPrefix)) {
      return null;
    }

    const props = {
      thumbnail: element.getAttribute(withPrefix('thumbnail')) as string,
      fullsize: element.getAttribute(withPrefix('fullsize')) as string,
      imgWidth: parseFloat(element.getAttribute(withPrefix('width'))),
      imgHeight: parseFloat(element.getAttribute(withPrefix('height'))),
      aspectRatio: element.getAttribute(withPrefix('aspect-ratio')) || '1/1',
      mainColor: element.getAttribute(withPrefix('main-color')) || '',
    };

    return props;
  }

  static fromNode(node: HTMLElement, parent: ImgLoading) {
    const data = ImgLoadingItem.extractDataFromAttributes(
      node,
      parent.withPrefix.bind(parent),
    );

    if (!data) {
      return null;
    }
    return new ImgLoadingItem({
      ...data,
      parent,
      node,
    });
  }
}
