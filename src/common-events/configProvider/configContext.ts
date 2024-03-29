import React, { createContext } from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NextRouter } from 'next/router';

import { UnionTFunction } from '../types';

export type Config = {
  router?: NextRouter; // TODO: Support the react-router
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  t: UnionTFunction;
  components: {
    A: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => JSX.Element;
    Link?: (
      props: React.AnchorHTMLAttributes<HTMLAnchorElement>
    ) => JSX.Element;
  };
};

const configContext = createContext<Config>({} as Config);

export default configContext;
