import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { NextRouter } from 'next/router';
import React from 'react';
import { Helmet, HelmetProps } from 'react-helmet-async';
import {
  Config,
  defaultConfig as rhhcDefaultConfig,
  getUri,
  ModuleItemTypeEnum,
} from 'react-helsinki-headless-cms';

import useLocale from '../common-events/hooks/useLocale';
import { getI18nPath } from '../common-events/i18n/router/utils';
import AppConfig from '../domain/app/AppConfig';

const CMS_API_DOMAIN = AppConfig.cmsGraphqlEndpoint
  ? new URL(AppConfig.cmsGraphqlEndpoint).origin
  : null;

export default function useRHHCConfig(
  cmsApolloClient: ApolloClient<NormalizedCacheObject>,
  router: NextRouter
) {
  const { t } = useTranslation(['common', 'cms']);
  const locale = useLocale();

  const rhhcConfig = React.useMemo(() => {
    const getIsHrefExternal = (href: string) => {
      if (
        !href?.includes(router.basePath) ||
        (CMS_API_DOMAIN && !href?.includes(CMS_API_DOMAIN))
      ) {
        return true;
      }
      return false;
    };
    const internalHrefOrigins = CMS_API_DOMAIN ? [CMS_API_DOMAIN] : [];
    const getRoutedInternalHref: Config['utils']['getRoutedInternalHref'] = (
      link,
      type
    ) => {
      if (!link) {
        return '#';
      }
      const uri = getUri(link, internalHrefOrigins, getIsHrefExternal);
      // if (uri === link) {
      //   return link;
      // }

      if (type === ModuleItemTypeEnum.Article) {
        // TODO: fix the getI18nPath for articles
        return getI18nPath('/articles', locale) + uri;
      }
      if (type === ModuleItemTypeEnum.Page) {
        // TODO: fix the getI18nPath for pages
        return getI18nPath('/pages', locale) + uri;
      }
      return getI18nPath(link, locale);
    };
    return {
      ...rhhcDefaultConfig,
      components: {
        ...rhhcDefaultConfig.components,
        Head: (props: HelmetProps) => <Helmet {...props} />,
      },
      siteName: t('appName'),
      currentLanguageCode: locale.toUpperCase(),
      apolloClient: cmsApolloClient,
      copy: {
        breadcrumbNavigationLabel: t(
          'common:breadcrumb.breadcrumbNavigationLabel'
        ),
        breadcrumbListLabel: t('common:breadcrumb.breadcrumbListLabel'),
        menuToggleAriaLabel: t('common:menu.menuToggleAriaLabel'),
        skipToContentLabel: t('common:linkSkipToContent'),
        openInExternalDomainAriaLabel: t('common:srOnly.opensInAnExternalSite'),
        openInNewTabAriaLabel: t('common:srOnly.opensInANewTab'),
        closeButtonLabelText: t('common:button.close'),
        archiveSearch: {
          searchTextPlaceholder: t('cms:archiveSearch.searchTextPlaceholder'),
          searchButtonLabelText: t('cms:archiveSearch.searchButtonLabelText'),
          loadMoreButtonLabelText: t(
            'cms:archiveSearch.loadMoreButtonLabelText'
          ),
          noResultsText: t('cms:archiveSearch.noResultsText'),
        },
      },
      utils: {
        ...rhhcDefaultConfig.utils,
        getIsHrefExternal,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRoutedInternalHref,
      },
      internalHrefOrigins,
    } as Config;
  }, [router.basePath, t, cmsApolloClient, locale]);
  return rhhcConfig;
}
