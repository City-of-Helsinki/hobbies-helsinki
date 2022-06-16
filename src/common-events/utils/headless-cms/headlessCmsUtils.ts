import { DEFAULT_LANGUAGE } from "../../../constants";
import { Language } from "../../../types";

export const getUriID = (slugs: string[], locale: Language): string => {
  if (!slugs) return "/";
  if (locale === DEFAULT_LANGUAGE) {
    return `/${slugs.join("/")}/`;
  }
  return `/${locale}/${slugs.join("/")}/`;
};

export const getSlugFromUri = (uri?: string | null): string[] | null => {
  const uriWithoutLang = stripLocaleFromUri(uri ?? "");
  if (uriWithoutLang) {
    return uriWithoutLang.split("/").filter((i) => i);
  }
  return null;
};

export const stripLocaleFromUri = (uri: string): string => {
  return uri.replace(/^\/(en|sv|fi)(?![a-z0-9])/i, "");
};

export const removeTrailingSlash = (uri: string): string => {
  return uri.replace(/\/$/, "");
};

// '/segment1/segment2/' -> ['/segment1/', '/segment1/segment2/']
// current implementation required both leading and trailing slashes
// to include all breadcrumbs
export const uriToBreadcrumbs = (uri: string): string[] => {
  return slugsToUriSegments(
    stripLocaleFromUri(uri)
      .split("/")
      // Filter out empty strings
      .filter((i) => i)
  );
};

export const slugsToUriSegments = (slugs: string[]): string[] => {
  return slugs.map((slug, index) => {
    return `/${slugs.slice(0, index + 1).join("/")}/`;
  });
};
