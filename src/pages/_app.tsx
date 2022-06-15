import React from "react";
import "nprogress/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "hds-react";
import Error from "next/error";
import { appWithTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import { ConfigProvider as RHHCConfigProvider } from "react-helsinki-headless-cms";

import useRouter from "../domain/i18n/router/useRouter";
import "../styles/globals.scss";
import { useCmsApollo } from "../domain/clients/cmsApolloClient";
import useRHHCConfig from "../hooks/useRHHCConfig";

const TopProgressBar = dynamic(
  () => {
    return import("../common/components/topProgressBar/TopProgressBar");
  },
  { ssr: false }
);

function Center({ children }: { children: React.ReactNode }) {
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
  const cmsApolloClient = useCmsApollo(pageProps.initialApolloState);
  const rhhcConfig = useRHHCConfig(cmsApolloClient);

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
