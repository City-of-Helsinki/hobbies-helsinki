import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import React from "react";

import { Config } from "../common-events/configProvider/configContext";
import eventsDefaultConfig from "../common-events/configProvider/defaultConfig";
import { DEFAULT_HEADER_MENU_NAME } from "../constants";
import useRouter from "../domain/i18n/router/useRouter";

export default function useEventsConfig(
  eventsApolloClient: ApolloClient<NormalizedCacheObject>
): Config {
  const router = useRouter();

  const eventsConfig = React.useMemo(() => {
    return {
      ...eventsDefaultConfig,
      navigationMenuName: DEFAULT_HEADER_MENU_NAME,
      apolloClient: eventsApolloClient,
      router,
    };
  }, [router, eventsApolloClient]);
  return eventsConfig;
}
