import { ArticleType, PageType } from 'react-helsinki-headless-cms';
import { Navigation as RHHCApolloNavigation } from 'react-helsinki-headless-cms/apollo';
import { DEFAULT_HEADER_MENU_NAME, Language } from 'events-helsinki-core';
import { useLocale, useRouterFromConfig } from 'events-helsinki-components';

import {
  getI18nPath,
  getLocalizedCmsItemUrl,
} from '../../../utils/routerUtils';
import {
  getSlugFromUri,
  removeContextPathFromUri,
} from '../../utils/headless-cms/headlessCmsUtils';

type NavigationProps = {
  page?: PageType | ArticleType;
};

export default function Navigation({ page }: NavigationProps) {
  const router = useRouterFromConfig();
  const locale = useLocale();
  const navigationMenuName = DEFAULT_HEADER_MENU_NAME[locale as Language];
  const currentPage = router.pathname;

  // TODO: This break the build with: TypeError: Cannot read properties of null (reading 'useState')
  return (null
    /*
    <RHHCApolloNavigation
      menuName={navigationMenuName ?? ''}
      onTitleClick={() => {
        router.push('/');
      }}
      getIsItemActive={({ path }) => {
        return (
          path === getI18nPath(currentPage, locale) ||
          path === `/${locale}${getI18nPath(currentPage, locale)}`
        );
      }}
      getPathnameForLanguage={({ slug }) => {
        const translatedPage = (page?.translations as PageType[])?.find(
          (translation) => translation?.language?.slug === slug
        );
        return getLocalizedCmsItemUrl(
          currentPage,
          translatedPage
            ? {
                slug:
                  getSlugFromUri(
                    removeContextPathFromUri(translatedPage.uri)
                  ) ?? '',
              }
            : router.query,
          slug as Language
        );
      }}
    />
    */

  );
}
