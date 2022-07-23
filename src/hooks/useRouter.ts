import { useRouter as useNextRouter } from 'next/router';

import { Language } from '../types';
import { getI18nPath, stringifyUrlObject } from '../utils/routerUtils';

export default function useRouter() {
  const { asPath, locale, defaultLocale, ...router } = useNextRouter();
  const search = asPath.split('?')[1];

  return {
    ...router,
    defaultLocale: defaultLocale as Language,
    locale: locale as Language,
    asPath:
      stringifyUrlObject({
        pathname: getI18nPath(router.route, locale as Language),
        query: router.query,
        search: search ? `?${search}` : null,
      }) ?? asPath,
  };
}
