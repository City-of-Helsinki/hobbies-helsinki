import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  Config,
  defaultConfig as rhhcDefaultConfig,
} from 'react-helsinki-headless-cms';

import AppConfig from '../domain/app/AppConfig';
import useLocale from './useLocale';
import EventDetails, {
  EventDetailsProps,
} from '../domain/event/eventDetails/EventDetails';
import ArticleDetails, {
  ArticleDetailsProps,
} from '../domain/article/articleDetails/ArticleDetails';

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
      if (href?.startsWith('/')) return false;
      if (!internalHrefOrigins.some((origin) => href?.includes(origin))) {
        return true;
      }
      return false;
    };
    return {
      ...rhhcDefaultConfig,
      components: {
        ...rhhcDefaultConfig.components,
        Head: (props) => <Head {...props} />,
        Link: ({ href, ...props }) => <Link href={href || ''} {...props} />,
        EventCardContent: (props: EventDetailsProps) => (
          <EventDetails {...props} />
        ),
        ArticleCardContent: (props: ArticleDetailsProps) => (
          <ArticleDetails {...props} />
        ),
      },
      fallbackImageUrls: [
        '/static/images/event_placeholder_A.jpg',
        '/static/images/event_placeholder_B.jpg',
        '/static/images/event_placeholder_C.jpg',
        '/static/images/event_placeholder_D.jpg',
      ],
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
        showAllText: t('common:button.showAll'),
        archiveSearch: {
          searchTextPlaceholder: t('cms:archiveSearch.searchTextPlaceholder'),
          searchButtonLabelText: t('cms:archiveSearch.searchButtonLabelText'),
          loadMoreButtonLabelText: t(
            'cms:archiveSearch.loadMoreButtonLabelText'
          ),
          noResultsTitle: t('cms:archiveSearch.noResultsTitle'),
          noResultsText: t('cms:archiveSearch.noResultsText'),
          clearAll: t('cms:archiveSearch.buttonClearFilters'),
        },
      },
      utils: {
        ...rhhcDefaultConfig.utils,
        getIsHrefExternal,
      },
      internalHrefOrigins,
    } as Config;
  }, [t, cmsApolloClient, eventsApolloClient, locale]);
  return rhhcConfig;
}
