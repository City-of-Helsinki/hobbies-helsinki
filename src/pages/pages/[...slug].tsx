/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NormalizedCacheObject } from "@apollo/client";
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Breadcrumb,
  getCollections,
  CollectionType,
  PageContent as RHHCPageContent,
  Page as RHHCPage,
  PageContentProps,
} from "react-helsinki-headless-cms";
import {
  PageDocument,
  PageQuery,
  PageQueryVariables,
} from "react-helsinki-headless-cms/apollo";

import Navigation from "../../common-events/components/navigation/Navigation";
import { getUriID } from "../../common-events/utils/headless-cms/headlessCmsUtils";
import { SUPPORT_LANGUAGES } from "../../constants";
import { createCmsApolloClient } from "../../domain/clients/cmsApolloClient";
import FooterSection from "../../domain/footer/Footer";
import { Language } from "../../types";

const NextCmsPage: NextPage<{
  page: PageQuery["page"];
  breadcrumbs: Breadcrumb[];
  collections?: CollectionType[];
}> = ({ page, breadcrumbs, collections }) => (
  <RHHCPage
    navigation={<Navigation />}
    content={
      <RHHCPageContent
        page={page as PageContentProps["page"]}
        breadcrumbs={breadcrumbs}
        // collections={getCmsCollectionList(collections)}
      />
    }
    footer={<FooterSection />}
  />
);

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

type ResultProps =
  | {
      initialApolloState: NormalizedCacheObject;
      page: PageQuery["page"];
      breadcrumbs: Breadcrumb[];
      collections?: CollectionType[];
    }
  | {
      error?: {
        statusCode: number;
      };
    };

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ResultProps>> {
  try {
    const {
      currentPage: page,
      breadcrumbs,
      cmsClient,
    } = await getProps(context);
    if (!page) {
      return {
        notFound: true,
        revalidate: true,
      };
    }

    return {
      props: {
        initialApolloState: cmsClient.cache.extract(),
        ...(await serverSideTranslations(
          context.locale as string,
          Object.values(SUPPORT_LANGUAGES)
        )),
        page,
        breadcrumbs,
        collections: getCollections(page.modules ?? []),
      },
      revalidate: 60,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("Error while generating content page", e);
    return {
      props: {
        error: {
          statusCode: 400,
        },
      },
      revalidate: 10,
    };
  }
}

// const getProps = async (context: GetStaticPropsContext) => {
//   const cmsClient = createCmsApolloClient();

//   // These breadcrumb uris are used to fetch all the parent pages of the current page
//   // so that all the childrens of parent page can be figured out and sub page navigations can be formed
//   // for rendering
//   const uriSegments = slugsToUriSegments(
//     (context.params?.slug ?? []) as string[]
//   );

//   // Fetch menu data to cache for the components so they can be rendered in the server
//   await cmsClient.query<MenuQuery, MenuQueryVariables>({
//     query: MenuDocument,
//     variables: {
//       id: MENU_NAME.Header,
//       idType: MenuNodeIdTypeEnum.Name,
//     },
//   });

//   const { data: pageData } = await cmsClient.query<
//     PageQuery,
//     PageQueryVariables
//   >({
//     query: PageDocument,
//     variables: {
//       id: getUriID(
//         context.params?.slug as string[],
//         context.locale as Language
//       ),
//       idType: PageIdType.Uri,
//     },
//   });

//   // Fetch all parent pages for navigation data
//   const apolloPageResponses = await Promise.all(
//     uriSegments.map((uri) => {
//       return cmsClient.query<PageQuery, PageQueryVariables>({
//         query: PageDocument,
//         variables: {
//           id: uri,
//           idType: PageIdType.Uri,
//         },
//       });
//     })
//   );

//   const pages = apolloPageResponses.map((res) => res.data.page);
//   const currentPage = pageData.page;

//   const breadcrumbs = pages.map((page) => ({
//     link: page?.link ?? "",
//     title: page?.title ?? "",
//   }));

//   return { currentPage, breadcrumbs, cmsClient };
// };

const getProps = async (context: GetStaticPropsContext) => {
  const cmsClient = createCmsApolloClient();

  const { data: pageData } = await cmsClient.query<
    PageQuery,
    PageQueryVariables
  >({
    query: PageDocument,
    variables: {
      id: getUriID(
        context.params?.slug as string[],
        context.locale as Language
      ),
      // idType: PageIdType.Uri,
    },
  });

  const currentPage = pageData.page;

  return { currentPage, breadcrumbs: [], cmsClient };
};

export default NextCmsPage;
