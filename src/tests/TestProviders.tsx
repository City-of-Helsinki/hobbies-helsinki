import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { I18nextProvider } from 'react-i18next';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  Config as RHHCConfig,
  ConfigProvider as RHHCConfigProvider,
  defaultConfig as rhhcDefaultConfig,
  getUri,
  ModuleItemTypeEnum,
} from 'react-helsinki-headless-cms';
import {
  ApolloCache,
  ApolloClient,
  InMemoryCache,
  useApolloClient,
} from '@apollo/client';
import { DEFAULT_LANGUAGE, ROUTES } from 'events-helsinki-core';
import { Config as EventsConfig } from 'events-helsinki-components';

import i18n from './initI18n';
import eventsDefaultConfig from '../common-events/configProvider/defaultConfig';
import { createEventsApolloClient } from '../domain/clients/eventsApolloClient';
import EventsConfigProvider from '../common-events/configProvider/ConfigProvider';
import { createCmsApolloClient } from '../domain/clients/cmsApolloClient';
import { getLocalizedCmsItemUrl } from '../utils/routerUtils';

const CMS_API_DOMAIN = 'harrastukset.cms.test.domain.com';

const mockRouter: Partial<NextRouter> = {
  locale: 'fi',
  defaultLocale: 'fi',
  prefetch: () => Promise.resolve()
};

type Props = {
  mocks?: ReadonlyArray<MockedResponse>;
  children: React.ReactNode;
  router: NextRouter;
  cache?: ApolloCache<Record<string, unknown>> | InMemoryCache;
};

function TestProviders({ mocks, children, router, cache }: Props) {
  const eventsApolloClient = useApolloClient(createEventsApolloClient());
  return (
    <I18nextProvider i18n={i18n}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <EventsConfigProvider
          config={getEventsConfig(router, eventsApolloClient)}
        >
          <RHHCConfigProvider config={getRHHCConfig(router)}>
            <RouterContext.Provider value={{ ...router, ...mockRouter }}>
              {children}
            </RouterContext.Provider>
          </RHHCConfigProvider>
        </EventsConfigProvider>
      </MockedProvider>
    </I18nextProvider>
  );
}

function getEventsConfig(
  router: NextRouter,
  eventsApolloClient: ApolloClient<object>
) {
  return {
    ...eventsDefaultConfig,
    t: i18n.t,
    apolloClient: eventsApolloClient,
    router,
  } as EventsConfig;
}

function getRHHCConfig(router: NextRouter) {
  const locale = DEFAULT_LANGUAGE;

  const getIsHrefExternal = (href: string) => {
    if (href.startsWith('/')) return false;
    if (
      !href?.includes(router.basePath) ||
      (CMS_API_DOMAIN && !href?.includes(CMS_API_DOMAIN))
    ) {
      return true;
    }
    return false;
  };
  const internalHrefOrigins = CMS_API_DOMAIN ? [CMS_API_DOMAIN] : [];
  const getRoutedInternalHref: RHHCConfig['utils']['getRoutedInternalHref'] = (
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
    return getLocalizedCmsItemUrl(
      link,
      {},
      locale
    );
  };

  return {
    ...rhhcDefaultConfig,
    siteName: 'appName',
    currentLanguageCode: locale.toUpperCase(),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    apolloClient: useApolloClient(createCmsApolloClient()),
    components: {
      ...rhhcDefaultConfig.components,
      Head: (props) => <Head {...props} />,
      Link: ({ href, ...props }) => <Link href={href || ''} {...props} />,
    },
    copy: {
      breadcrumbNavigationLabel: i18n.t('common:breadcrumb.breadcrumbNavigationLabel'),
      breadcrumbListLabel: i18n.t('common:breadcrumb.breadcrumbListLabel'),
      menuToggleAriaLabel: i18n.t('common:menu.menuToggleAriaLabel'),
      skipToContentLabel: i18n.t('common:linkSkipToContent'),
      openInExternalDomainAriaLabel: i18n.t('common:srOnly.opensInAnExternalSite'),
      openInNewTabAriaLabel: i18n.t('common:srOnly.opensInANewTab'),
      closeButtonLabelText: i18n.t('common:button.close'),
      archiveSearch: {
        searchTextPlaceholder: i18n.t('cms:archiveSearch.searchTextPlaceholder'),
        searchButtonLabelText: i18n.t('cms:archiveSearch.searchButtonLabelText'),
        loadMoreButtonLabelText: i18n.t('cms:archiveSearch.loadMoreButtonLabelText'),
        noResultsText: i18n.t('cms:archiveSearch.noResultsText'),
      },
    },
    utils: {
      ...rhhcDefaultConfig.utils,
      getIsHrefExternal,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getRoutedInternalHref,
    },
    internalHrefOrigins,
  } as RHHCConfig;
}

export default TestProviders;
