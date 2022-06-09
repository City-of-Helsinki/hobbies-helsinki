import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import * as Sentry from "@sentry/browser";
import get from "lodash/get";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_NEXT_API_GRAPHQL_ENDPOINT;

const excludeArgs =
  (excludedArgs: string[]) => (args: Record<string, any> | null) =>
    args
      ? Object.keys(args).filter((key: string) => !excludedArgs.includes(key))
      : false;

export const createApolloCache = () => {
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

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
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

const apolloClient = new ApolloClient({
  cache: createApolloCache(),
  link: ApolloLink.from([errorLink, httpLink]),
});

export default apolloClient;
