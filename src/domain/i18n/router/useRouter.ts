import { useRouter as useNextRouter } from "next/router";

import { DEFAULT_LANGUAGE } from "../../../constants";
import { Locale } from "../../../types";
import { getI18nPath, stringifyUrlObject } from "./utils";

export default function useRouter() {
  const { asPath, locale, defaultLocale, ...router } = useNextRouter();
  const search = asPath.split("?")[1];

  return {
    ...router,
    defaultLocale: defaultLocale as Locale,
    locale: locale as Locale,
    asPath:
      stringifyUrlObject({
        pathname: getI18nPath(router.route, locale ?? DEFAULT_LANGUAGE),
        query: router.query,
        search: search ? `?${search}` : null,
      }) ?? asPath,
  };
}
