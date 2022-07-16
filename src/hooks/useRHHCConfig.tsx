import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { NextRouter } from 'next/router';
import React from 'react';
import {
  Config,
  defaultConfig as rhhcDefaultConfig,
  getUri,
  ModuleItemTypeEnum,
} from 'react-helsinki-headless-cms';

import useLocale from '../common-events/hooks/useLocale';
import {
  getI18nPath,
  getLocalizedModuleItemUrl,
} from '../common-events/i18n/router/utils';
import AppConfig from '../domain/app/AppConfig';
import { Language } from '../types';

const CMS_API_DOMAIN = new URL(AppConfig.cmsGraphqlEndpoint).origin;
const LINKEDEVENTS_API_EVENT_ENDPOINT = new URL(
  AppConfig.linkedEventsEventEndpoint
).href;

export default function useRHHCConfig(
  cmsApolloClient: ApolloClient<NormalizedCacheObject>,
  eventsApolloClient: ApolloClient<NormalizedCacheObject>,
  router: NextRouter
) {
  const { t } = useTranslation(['common', 'cms']);
  const locale = useLocale();

  const rhhcConfig = React.useMemo(() => {
    const internalHrefOrigins = [
      CMS_API_DOMAIN,
      LINKEDEVENTS_API_EVENT_ENDPOINT,
    ];
    const getIsHrefExternal = (href: string) => {
      if (
        !href?.includes(router.basePath) &&
        !internalHrefOrigins.some((origin) => href?.includes(origin))
      ) {
        return true;
      }
      return false;
    };
    const getRoutedInternalHref: Config['utils']['getRoutedInternalHref'] = (
      link,
      type
    ) => {
      if (!link) {
        return '#';
      }
      const uri = getUri(link, internalHrefOrigins, getIsHrefExternal);

      if (type === ModuleItemTypeEnum.Article) {
        return getLocalizedModuleItemUrl(
          '/articles/[...slug]',
          { slug: uri.replace(/^\//, '') },
          locale,
          router.defaultLocale as Language
        );
      }
      if (type === ModuleItemTypeEnum.Page) {
        return getLocalizedModuleItemUrl(
          '/pages/[...slug]',
          { slug: uri.replace(/^\//, '') },
          locale,
          router.defaultLocale as Language
        );
      }
      if (type === ModuleItemTypeEnum.Event) {
        return getLocalizedModuleItemUrl(
          '/courses/[eventId]',
          { eventId: uri.replace(/^\//, '') },
          locale,
          router.defaultLocale as Language
        );
      }
      //TODO: test the default case
      return getI18nPath(link, locale);
    };
    return {
      ...rhhcDefaultConfig,
      siteName: t('appName'),
      currentLanguageCode: locale.toUpperCase(),
      apolloClient: cmsApolloClient,
      eventsApolloClient: eventsApolloClient,
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
        loadMoreButtonLabelText: t('common:button.loadMore'),
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
  }, [
    router.basePath,
    router.defaultLocale,
    t,
    cmsApolloClient,
    eventsApolloClient,
    locale,
  ]);
  return rhhcConfig;
}
