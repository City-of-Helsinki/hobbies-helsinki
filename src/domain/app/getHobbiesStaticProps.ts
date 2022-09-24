import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import {
  isApolloError,
  gql,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { getMenuLocationFromLanguage, CmsLanguage } from 'events-helsinki-components';

import AppConfig from './AppConfig';
import { staticGenerationLogger } from '../logger';
import { createCmsApolloClient } from '../clients/cmsApolloClient';
import { createEventsApolloClient } from '../clients/eventsApolloClient';
import { getLocaleOrError } from '../../utils/routerUtils';

const GLOBAL_QUERY = gql`
  fragment PageFragment on RootQuery {
    pageLanguages: languages {
      id
      name
      slug
      code
      locale
    }
    pageMenus: menus(where: { location: $menuLocation }) {
      nodes {
        id
        menuItems {
          nodes {
            id
            order
            target
            title
            url
            label
          }
        }
      }
    }
  }
  query PageQuery($menuLocation: MenuLocationEnum!) {
    ...PageFragment
    __typename
  }
`;

type HobbiesContext = {
  cmsClient: ApolloClient<NormalizedCacheObject>;
  eventsClient: ApolloClient<NormalizedCacheObject>;
};

export type HobbiesGlobalPageProps = {
  initialApolloState: NormalizedCacheObject;
  initialEventsApolloState: NormalizedCacheObject;
} & unknown; //FIXME: Promise<GetStaticPropsResult<P>> of getHobbiesStaticProps

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function getHobbiesStaticProps<P = Record<string, any>>(
  context: GetStaticPropsContext,
  tryToGetPageProps: (
    hobbiesContext: HobbiesContext
  ) => Promise<GetStaticPropsResult<P>>
) {
  const cmsClient = createCmsApolloClient();
  const eventsClient = createEventsApolloClient();

  try {
    await getGlobalCMSData({ client: cmsClient, context });
    const result = await tryToGetPageProps({ cmsClient, eventsClient });
    const props =
      'props' in result
        ? {
            initialApolloState: cmsClient.cache.extract(),
            initialEventsApolloState: eventsClient.cache.extract(),
            ...result.props,
          }
        : undefined;

    return {
      // Apply revalidate, allow it to be overwritten
      revalidate: AppConfig.defaultRevalidate,
      ...result,
      props,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // Generic error handling
    staticGenerationLogger.error('Error while generating a page:', e);
    if (isApolloError(e)) {
      return {
        props: {
          error: {
            statusCode: 400,
          },
        },
        revalidate: 10,
      };
    }

    throw e;
  }
}

type GetGlobalCMSDataParams = {
  client: ApolloClient<NormalizedCacheObject>;
  context: GetStaticPropsContext;
};

// Get CMS data that's required on every page
async function getGlobalCMSData({ client, context }: GetGlobalCMSDataParams) {
  const menuLocation = getMenuLocationFromLanguage(
    getLocaleOrError(context.locale)
  );
  const queryOptions = {
    query: GLOBAL_QUERY,
    variables: {
      menuLocation,
    },
  };
  const { data } = await client.query(queryOptions);
  client.writeQuery({
    ...queryOptions,
    data: {
      ...data,
      // Only use languages that this project supports
      pageLanguages: getSupportedLanguages(data.pageLanguages, context),
    },
  });
}

function getSupportedLanguages(
  languages: CmsLanguage[],
  context: GetStaticPropsContext
) {
  // NextJS uses locales as is in the slug. The headless CMS has a locale and
  // a slug field. The slug field is meant to be used in urls. To be able to do
  // so, we have to provide the slug field value for NextJS when configuring its
  // i18n module. That's why we are trying to find the slug field from NextJS
  // locales.
  return languages.filter(({ slug }) => context.locales?.includes(slug));
}
