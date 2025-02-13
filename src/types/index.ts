export type Selector =
  | string
  | HTMLElement
  | Element
  | NodeList
  | NodeListOf<Element>
  | HTMLCollection
  | Array<Element>
  | ArrayLike<Element>
  | null;
export interface ImgLoadingOptions {
  prefix?: string;
  container?: HTMLElement;
}
