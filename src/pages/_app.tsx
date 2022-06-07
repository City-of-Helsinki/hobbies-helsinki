import React from "react";
import "nprogress/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "hds-react";
import Error from "next/error";
import { appWithTranslation, useTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import {
  ConfigProvider as RHHCConfigProvider,
  defaultConfig as rhhcDefaultConfig,
  ModuleItemTypeEnum,
} from "react-helsinki-headless-cms";

import { useCmsApollo } from "../domain/clients/cmsApolloClient";
import useRouter from "../domain/i18n/router/useRouter";

import "../styles/globals.scss";

const CMS_API_DOMAIN = process.env.NEXT_PUBLIC_CMS_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_CMS_BASE_URL).origin
  : null;

const TopProgressBar = dynamic(
  () => {
    return import("../common/components/topProgressBar/TopProgressBar");
  },
  { ssr: false }
);

function Center({ children }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const cmsApolloClient = useCmsApollo(pageProps.initialApolloState);

  // Unset hidden visibility that was applied to hide the first server render
  // that does not include styles from HDS. HDS applies styling by injecting
  // style tags into the head. This requires the existence of a document object.
  // The document object does not exist during server side renders.
  // TODO: Remove this hackfix to ensure that pre-rendered pages'
  //       SEO performance is not impacted.
  useEffect(() => {
    setTimeout(() => {
      const body = document?.body;

      if (body) {
        body.style.visibility = "unset";
      }
    }, 10);
  }, []);

  const rhhcConfig = React.useMemo(
    () => ({
      ...rhhcDefaultConfig,
      siteName: t("common:appName"),
      currentLanguageCode: "fi",
      apolloClient: cmsApolloClient,
      copy: {
        breadcrumbNavigationLabel: t(
          "common:breadcrumb.breadcrumbNavigationLabel"
        ),
        breadcrumbListLabel: t("common:breadcrumb.breadcrumbListLabel"),
        menuToggleAriaLabel: t("common:menu.toggle"),
        skipToContentLabel: t("common:linkSkipToContent"),
        openInExternalDomainAriaLabel: t("common:srOnly.opensInAnExternalSite"),
        openInNewTabAriaLabel: t("common:srOnly.opensInANewTab"),
        closeButtonLabelText: t("common:button.close"),
        archiveSearch: {
          searchTextPlaceholder: t("cms:archiveSearch.searchTextPlaceholder"),
          searchButtonLabelText: t("cms:archiveSearch.searchButtonLabelText"),
          loadMoreButtonLabelText: t(
            "cms:archiveSearch.loadMoreButtonLabelText"
          ),
          noResultsText: t("cms:archiveSearch.noResultsText"),
        },
      },
      utils: {
        ...rhhcDefaultConfig.utils,
        getIsHrefExternal: (href: string) => {
          if (
            !href?.includes(router.basePath) ||
            (CMS_API_DOMAIN && !href?.includes(CMS_API_DOMAIN))
          ) {
            return true;
          }
          return false;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRoutedInternalHref: (link: string, type: ModuleItemTypeEnum) => link,
      },
      internalHrefOrigins: CMS_API_DOMAIN ? [CMS_API_DOMAIN] : [],
    }),
    [router.basePath, t, cmsApolloClient]
  );

  return (
    <>
      <TopProgressBar />
      <RHHCConfigProvider config={rhhcConfig}>
        <ApolloProvider client={cmsApolloClient}>
          {router.isFallback ? (
            <Center>
              <LoadingSpinner />
            </Center>
          ) : pageProps.error ? (
            <Error
              statusCode={pageProps.error.networkError?.statusCode ?? 400}
              title={pageProps.error.title}
            />
          ) : (
            <Component {...pageProps} />
          )}
        </ApolloProvider>
      </RHHCConfigProvider>
      <ToastContainer />
    </>
  );
}

export default appWithTranslation(MyApp);
