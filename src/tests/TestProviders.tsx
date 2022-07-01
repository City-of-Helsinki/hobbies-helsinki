import React from "react";
import { I18nextProvider } from "react-i18next";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter } from "next/router";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  Config as RHHCConfig,
  ConfigProvider as RHHCConfigProvider,
  defaultConfig as rhhcDefaultConfig,
  getUri,
  ModuleItemTypeEnum,
} from "react-helsinki-headless-cms";
import { ApolloCache, InMemoryCache, useApolloClient } from "@apollo/client";

import i18n from "./initI18n";
import eventsDefaultConfig from "../common-events/configProvider/defaultConfig";
import { createEventsApolloClient } from "../domain/clients/eventsApolloClient";
import { Config as EventsConfig } from "../common-events/configProvider/configContext";
import { DEFAULT_HEADER_MENU_NAME, DEFAULT_LANGUAGE } from "../constants";
import EventsConfigProvider from "../common-events/configProvider/ConfigProvider";
import { getI18nPath } from "../common-events/i18n/router/utils";
import { createCmsApolloClient } from "../domain/clients/cmsApolloClient";

const CMS_API_DOMAIN = 'harrastukset.cms.test.domain.com';

const mockRouter: Partial<NextRouter> = {
  locale: "fi",
  defaultLocale: "fi",
};

type Props = {
  mocks?: ReadonlyArray<MockedResponse>;
  children: React.ReactNode;
  router: NextRouter;
  cache?: ApolloCache<{}> | InMemoryCache;
};

function TestProviders({ mocks, children, router, cache }: Props) {
  return (
    <I18nextProvider i18n={i18n}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <EventsConfigProvider config={getEventsConfig(router)}>
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

function getEventsConfig(router: NextRouter) {
  return {
    ...eventsDefaultConfig,
    t: i18n.t,
    getNavigationMenuName: (locale) => DEFAULT_HEADER_MENU_NAME[locale],
    apolloClient: useApolloClient(createEventsApolloClient()),
    router,
  } as EventsConfig;
}

function getRHHCConfig(router: NextRouter) {
  const locale = DEFAULT_LANGUAGE;
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
  const getRoutedInternalHref: RHHCConfig['utils']['getRoutedInternalHref'] = (
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
    siteName: 'appName',
    currentLanguageCode: locale.toUpperCase(),
    apolloClient: useApolloClient(createCmsApolloClient()),
    copy: {
      breadcrumbNavigationLabel: 'common:breadcrumb.breadcrumbNavigationLabel',
      breadcrumbListLabel: 'common:breadcrumb.breadcrumbListLabel',
      menuToggleAriaLabel: 'common:menu.menuToggleAriaLabel',
      skipToContentLabel: 'common:linkSkipToContent',
      openInExternalDomainAriaLabel: 'common:srOnly.opensInAnExternalSite',
      openInNewTabAriaLabel: 'common:srOnly.opensInANewTab',
      closeButtonLabelText: 'common:button.close',
      archiveSearch: {
        searchTextPlaceholder: 'cms:archiveSearch.searchTextPlaceholder',
        searchButtonLabelText: 'cms:archiveSearch.searchButtonLabelText',
        loadMoreButtonLabelText: 'cms:archiveSearch.loadMoreButtonLabelText',
        noResultsText: 'cms:archiveSearch.noResultsText',
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
