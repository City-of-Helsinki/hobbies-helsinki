import { DEFAULT_LANGUAGE } from "../../../constants";
import { Language } from "../../../types";
import useRouterFromConfig from "../../hooks/useRouterFromConfig";
import { getI18nPath, stringifyUrlObject } from "./utils";

export default function useRouter() {
  const { asPath, locale, defaultLocale, ...router } = useRouterFromConfig();
  const search = asPath.split("?")[1];

  return {
    ...router,
    defaultLocale: defaultLocale as Language,
    locale: locale as Language,
    asPath:
      stringifyUrlObject({
        pathname: getI18nPath(router.route, locale ?? DEFAULT_LANGUAGE),
        query: router.query,
        search: search ? `?${search}` : null,
      }) ?? asPath,
  };
}
