import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import {
  isApolloError,
  gql,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
// import { PageDocument } from "react-helsinki-headless-cms/apollo";

import AppConfig from "./AppConfig";
import { Language } from "../../types";
import { getMenuLocationFromLanguage } from "../../common/apollo/utils";
import { staticGenerationLogger } from "../logger";
import { createCmsApolloClient } from "../clients/cmsApolloClient";

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
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function getHobbiesStaticProps<P = Record<string, any>>(
  context: GetStaticPropsContext,
  tryToGetPageProps: (
    hobbiesContext: HobbiesContext
  ) => Promise<GetStaticPropsResult<P>>
) {
  const cmsClient = createCmsApolloClient();

  try {
    await getGlobalCMSData({ client: cmsClient, context });
    const result = await tryToGetPageProps({ cmsClient });
    const props =
      "props" in result
        ? {
            initialApolloState: cmsClient.cache.extract(),
            ...result.props,
          }
        : undefined;

    return {
      // Apply revalidate, allow it to be overwritten
      revalidate: AppConfig.defaultRevalidate,
      ...result,
      props,
    };
  } catch (e) {
    // Generic error handling
    staticGenerationLogger.error("Error while generating a page:", e);

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
    context.locale ?? context.defaultLocale
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
  languages: Language[],
  context: GetStaticPropsContext
) {
  // NextJS uses locales as is in the slug. The headless CMS has a locale and
  // a slug field. The slug field is meant to be used in urls. To be able to do
  // so, we have to provide the slug field value for NextJS when configuring its
  // i18n module. That's why we are trying to find the slug field from NextJS
  // locales.
  return languages.filter(({ slug }) => context.locales.includes(slug));
}
