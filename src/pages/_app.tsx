import React from 'react';
import {
  MatomoProvider,
  createInstance as createMatomoInstance,
} from '@jonkoops/matomo-tracker-react';
import 'nprogress/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from 'hds-react';
import Error from 'next/error';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import { NextRouter } from 'next/router';

import '../styles/globals.scss';
import { useCmsApollo } from '../domain/clients/cmsApolloClient';
import useRHHCConfig from '../hooks/useRHHCConfig';
import EventsConfigProvider from '../common-events/configProvider/ConfigProvider';
import { useEventsApolloClient } from '../domain/clients/eventsApolloClient';
import useEventsConfig from '../hooks/useEventsConfig';
import AppConfig from '../domain/app/AppConfig';

const matomoInstance = createMatomoInstance(AppConfig.matomoConfiguration);

const TopProgressBar = dynamic(
  () => {
    return import('../common-events/components/topProgressBar/TopProgressBar');
  },
  { ssr: false }
);

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const cmsApolloClient = useCmsApollo(pageProps.initialApolloState);
  const eventsApolloClient = useEventsApolloClient(
    pageProps.initialEventsApolloState
  );
  const eventsConfig = useEventsConfig(eventsApolloClient);
  const router = eventsConfig.router as NextRouter;
  const rhhcConfig = useRHHCConfig(cmsApolloClient, eventsApolloClient);

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
        body.style.visibility = 'unset';
      }
    }, 10);
  }, []);

  return (
    <EventsConfigProvider config={eventsConfig}>
      <RHHCConfigProvider config={rhhcConfig}>
        <TopProgressBar />
        <ApolloProvider client={cmsApolloClient}>
          <ApolloProvider client={eventsApolloClient}>
            <MatomoProvider value={matomoInstance}>
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
            </MatomoProvider>
          </ApolloProvider>
        </ApolloProvider>
        <ToastContainer />
      </RHHCConfigProvider>
    </EventsConfigProvider>
  );
}

export default appWithTranslation(MyApp);
