export type Language = 'en' | 'fi' | 'sv';

export type OptionType = {
  label: string;
  value: string;
};

export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl';

export type LandingPageTextColor = 'BLACK' | 'WHITE';

export type CmsLanguage = {
  id: string;
  name: string;
  slug: string;
  code: string;
  locale: string;
};

export type MenuItem = {
  id: string;
  order: number;
  path: string;
  target: string;
  title: string;
  url: string;
  label: string;
};

export type Connection<T> = {
  edges: Node<T>[];
};

export type Node<T> = {
  cursor: string;
  node: T;
};
