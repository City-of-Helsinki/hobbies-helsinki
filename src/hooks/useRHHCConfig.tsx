import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  Config,
  defaultConfig as rhhcDefaultConfig,
  getUri,
  ModuleItemTypeEnum,
} from 'react-helsinki-headless-cms';

import { ROUTES } from '../constants';
import AppConfig from '../domain/app/AppConfig';
import { getLocalizedCmsItemUrl } from '../utils/routerUtils';
import useLocale from './useLocale';

const APP_DOMAIN = new URL(AppConfig.origin).origin;
const CMS_API_DOMAIN = new URL(AppConfig.cmsGraphqlEndpoint).origin;
const LINKEDEVENTS_API_EVENT_ENDPOINT = new URL(
  AppConfig.linkedEventsEventEndpoint
).href;

export default function useRHHCConfig(
  cmsApolloClient: ApolloClient<NormalizedCacheObject>,
  eventsApolloClient: ApolloClient<NormalizedCacheObject>
) {
  const { t } = useTranslation(['common', 'cms']);
  const locale = useLocale();

  const rhhcConfig = React.useMemo(() => {
    const internalHrefOrigins = [
      APP_DOMAIN,
      CMS_API_DOMAIN,
      LINKEDEVENTS_API_EVENT_ENDPOINT,
    ];
    const getIsHrefExternal = (href: string) => {
      if (href.startsWith('/')) return false;
      if (!internalHrefOrigins.some((origin) => href?.includes(origin))) {
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
        return getLocalizedCmsItemUrl(
          ROUTES.ARTICLES,
          { slug: uri.replace(/^\//, '') },
          locale
        );
      }
      if (type === ModuleItemTypeEnum.Page) {
        return getLocalizedCmsItemUrl(
          ROUTES.PAGES,
          { slug: uri.replace(/^\//, '') },
          locale
        );
      }
      if (type === ModuleItemTypeEnum.Event) {
        return getLocalizedCmsItemUrl(
          ROUTES.COURSES,
          { eventId: uri.replace(/^\//, '') },
          locale
        );
      }
      //TODO: test the default case
      return getLocalizedCmsItemUrl(link, {}, locale);
    };
    return {
      ...rhhcDefaultConfig,
      components: {
        ...rhhcDefaultConfig.components,
        Head: (props) => <Head {...props} />,
        Link: ({ href, ...props }) => <Link href={href || ''} {...props} />,
      },
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
  }, [t, cmsApolloClient, eventsApolloClient, locale]);
  return rhhcConfig;
}
