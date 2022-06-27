import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import * as Sentry from "@sentry/browser";
import get from "lodash/get";
import { useMemo } from "react";

import isClient from "../../common/utils/isClient";
import AppConfig from "../app/AppConfig";

export const createEventsApolloClient = (
  initialState: NormalizedCacheObject = {}
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: AppConfig.eventsGraphqlEndpoint,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        const errorMessage = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
        Sentry.captureMessage(errorMessage);
      });
    }

    if (networkError) {
      Sentry.captureMessage("Network error");
    }
  });

  const cache = createEventsApolloCache().restore(initialState || {});

  return new ApolloClient({
    ssrMode: !isClient, // Disables forceFetch on the server (so queries are only run once)
    // TODO: Add error link after adding Sentry to the project
    link: ApolloLink.from([errorLink, httpLink]),
    cache,
  });
};

const excludeArgs =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (excludedArgs: string[]) => (args: Record<string, any> | null) =>
    args
      ? Object.keys(args).filter((key: string) => !excludedArgs.includes(key))
      : false;

export const createEventsApolloCache = () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          event(_, { args, toReference }) {
            return toReference({
              __typename: "Keyword",
              id: args?.id,
            });
          },
          image(_, { args, toReference }) {
            return toReference({
              __typename: "Place",
              id: args?.id,
            });
          },
          eventList: {
            // Only ignore page argument in caching to get fetchMore pagination working correctly
            // Other args are needed to separate different serch queries to separate caches
            // Docs: https://www.apollographql.com/docs/react/pagination/key-args/
            keyArgs: excludeArgs(["page"]),
            merge(existing, incoming) {
              return {
                data: [...(existing?.data ?? []), ...incoming.data],
                meta: incoming.meta,
              };
            },
          },
          // See eventList keyArgs for explanation why page is filtered.
          eventsByIds: {
            keyArgs: excludeArgs(["page"]),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            merge(existing, incoming, options) {
              return {
                data: [...(existing?.data ?? []), ...incoming.data],
                meta: incoming.meta,
              };
            },
          },
        },
      },
    },
  });
  if (typeof window !== "undefined") {
    const state = get(window, "__APOLLO_STATE__");
    if (state) {
      // If you have multiple clients, use `state.<client_id>`
      cache.restore(state.defaultClient);
    }
  }
  return cache;
};

const apolloClient = createEventsApolloClient();

export function useEventsApolloClient(initialState: NormalizedCacheObject) {
  const store = useMemo(
    () => createEventsApolloClient(initialState),
    [initialState]
  );

  return store;
}

export default apolloClient;
