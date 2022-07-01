import {
  InMemoryCache,
  NormalizedCacheObject,
  ApolloClient,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { useMemo } from "react";
import fetch from "cross-fetch";

import AppConfig from '../../domain/app/AppConfig';
import {
  initializeApolloClient,
  MutableReference,
} from "../../common/apollo/utils";
import { sortMenuItems } from "../../common/apollo/utils";
import isClient from "../../common/utils/isClient";

const cmsApolloClient = new MutableReference<
  ApolloClient<NormalizedCacheObject>
>(createCmsApolloClient());

export function createCmsApolloClient() {
  const httpLink = new HttpLink({
    uri: AppConfig.cmsGraphqlEndpoint,
    fetch,
  });
  return new ApolloClient({
    ssrMode: isClient,
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        MenuItems: {
          fields: {
            nodes: {
              read(nodes) {
                return sortMenuItems(nodes);
              },
            },
          },
        },
      },
    }),
  });
}

export default function initializeCmsApollo(initialState = {}) {
  return initializeApolloClient<
    NormalizedCacheObject,
    ApolloClient<NormalizedCacheObject>
  >({
    initialState,
    mutableCachedClient: cmsApolloClient,
    createClient: createCmsApolloClient,
  });
}

export function useCmsApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(
    () => initializeCmsApollo(initialState),
    [initialState]
  );

  return store;
}
