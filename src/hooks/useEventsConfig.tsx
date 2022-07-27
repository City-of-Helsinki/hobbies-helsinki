import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import { Config } from '../common-events/configProvider/configContext';
import eventsDefaultConfig from '../common-events/configProvider/defaultConfig';

export default function useEventsConfig(
  eventsApolloClient: ApolloClient<NormalizedCacheObject>
): Config {
  const router = useRouter();
  const { t } = useTranslation('common');

  const eventsConfig = React.useMemo(() => {
    return {
      ...eventsDefaultConfig,
      t: t,
      apolloClient: eventsApolloClient,
      router,
    } as Config;
  }, [router, eventsApolloClient, t]);
  return eventsConfig;
}
