import { ImgLoadingItem } from "./ImgLoadingItem";
import { ImgLoadingOptions, Selector } from "./types/index";
export declare class ImgLoading {
    elements: Array<HTMLElement>;
    items: Array<ImgLoadingItem>;
    imagesContainer: HTMLElement | null;
    prefix: string;
    intersectionObserver: IntersectionObserver | null;
    constructor();
    withPrefix(text: string): string;
    getElements(selector: Selector): NodeListOf<Element> | NodeList;
    getHtmlElementFromNode(elements: NodeListOf<Element> | NodeList): void;
    getItemsFromElements(): void;
    init(selector: Selector, options?: ImgLoadingOptions): void;
}
