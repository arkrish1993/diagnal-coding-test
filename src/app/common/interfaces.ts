export interface ContentItem {
  name: string;
  ["poster-image"]: string;
}

export interface PageItem {
  title: string;
  ["content-items"]: {
    content: ContentItem[];
  };
  ["page-size-requested"]: string;
  ["total-content-items"]: string;
}
