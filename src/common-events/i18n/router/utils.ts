import { UrlObject } from "url";
import { ParsedUrlQueryInput } from "querystring";

import qs from "query-string";
import { NextRouter } from "next/router";

import i18nRoutes from "../../../../i18nRoutes.config";
import { Language } from "../../../types";
import AppConfig from "../../../domain/app/AppConfig";

// dynamic path: /venues/:id
// segmented: /venues/[id]
// FIXME: Does not work with article URIs
function transformDynamicPathIntoSegmentedDynamicPath(path: string): string {
  return path
    .split("/")
    .map((part) => (part.startsWith(":") ? `[${part.slice(1)}]` : part))
    .join("/");
}

export function getI18nPath(route: string, locale: string): string {
  // English is the default language within code so it doesn't need transforming
  if (locale === "en") {
    return route;
  }

  const i18nRewriteRules =
    Object.entries(i18nRoutes).find(
      ([routeKey]) =>
        transformDynamicPathIntoSegmentedDynamicPath(routeKey) === route
    )?.[1] ?? [];

  if (!i18nRewriteRules || i18nRewriteRules.length === 0) {
    return route;
  }

  const i18nRewriteRuleForCurrentLocale = i18nRewriteRules.find(
    (rewriteRule) => rewriteRule.locale === locale
  );

  if (!i18nRewriteRuleForCurrentLocale) {
    return route;
  }
  return transformDynamicPathIntoSegmentedDynamicPath(
    i18nRewriteRuleForCurrentLocale.source
  );
}

const isDynamic = (part: string) => part.startsWith("[") && part.endsWith("]");
const parseDynamicName = (part: string) => part.slice(1, -1);
const queryToString = (
  query: Record<string, unknown> | string | undefined,
  usedQueryParts: string[]
) => {
  if (!query) {
    return;
  }

  if (typeof query === "string") {
    return query;
  }

  const queryWithoutUsed = Object.entries(query).reduce((acc, [key, value]) => {
    if (usedQueryParts.includes(key)) {
      return acc;
    }

    return {
      ...acc,
      [key]: value,
    };
  }, {});

  const queryAsString = qs.stringify(queryWithoutUsed);

  return queryAsString.length > 0 ? `?${queryAsString}` : null;
};

export function stringifyUrlObject(url: UrlObject): string {
  const usedQueryParts: string[] = [];
  const pathname = url.pathname
    ?.split("/")
    .map((part) => {
      if (!isDynamic(part)) {
        return part;
      }

      const dynamicPartName = parseDynamicName(part);

      usedQueryParts.push(dynamicPartName);

      return (url.query as ParsedUrlQueryInput)?.[dynamicPartName] ?? part;
    })
    .join("/");

  const search =
    url.search ??
    queryToString(url.query as ParsedUrlQueryInput, usedQueryParts) ??
    "";

  return `${pathname}${search}`;
}

export function getLocaleOrError(locale: string): Language {
  if (!AppConfig.locales.includes(locale)) {
    throw Error(`Locale ${locale} is not supported`);
  }

  return locale as Language;
}

/**
 * If removeList is empty, the function removes all params from url.
 * @param {*} router
 * @param {*} removeList
 */
export const removeQueryParamsFromRouter = (
  router: NextRouter,
  removeList: string[] = []
) => {
  const queryObject = { ...router.query };

  if (removeList.length > 0) {
    removeList.forEach((param) => delete router.query[param]);
  } else {
    // Remove all
    Object.keys(queryObject).forEach((param) => delete queryObject[param]);
  }
  router.replace(
    {
      pathname: router.pathname,
      query: router.query,
    },
    undefined,
    /**
     * Do not refresh the page
     */
    { shallow: true }
  );
};
