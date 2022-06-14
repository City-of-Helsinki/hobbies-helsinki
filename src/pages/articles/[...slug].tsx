/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NormalizedCacheObject } from "@apollo/client";
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Breadcrumb,
  CollectionType,
  getCollections,
  PageContentProps,
  PageContent as RHHCPageContent,
  Page as RHHCPage,
} from "react-helsinki-headless-cms";
import {
  ArticleDocument,
  ArticleQuery,
  ArticleQueryVariables,
} from "react-helsinki-headless-cms/apollo";

import Navigation from "../../common-events/components/navigation/Navigation";
import { getUriID } from "../../common-events/domain/headless-cms/utils";
import { SUPPORT_LANGUAGES } from "../../constants";
import { createCmsApolloClient } from "../../domain/clients/cmsApolloClient";
import FooterSection from "../../domain/footer/Footer";
import { Language } from "../../types";

const NextCmsArticle: NextPage<{
  article: ArticleQuery["post"];
  breadcrumbs: Breadcrumb[];
  collections?: CollectionType[];
}> = ({ article, breadcrumbs, collections }) => (
  <RHHCPage
    navigation={<Navigation />}
    content={
      <RHHCPageContent
        page={article as PageContentProps["page"]}
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
      article: ArticleQuery["post"];
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
      currentArticle: article,
      breadcrumbs,
      cmsClient,
    } = await getProps(context);

    if (!article) {
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
        article,
        breadcrumbs,
        collections: getCollections(article.modules ?? []),
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

const getProps = async (context: GetStaticPropsContext) => {
  const cmsClient = createCmsApolloClient();

  const { data: articleData } = await cmsClient.query<
    ArticleQuery,
    ArticleQueryVariables
  >({
    query: ArticleDocument,
    variables: {
      id: getUriID(
        context.params?.slug as string[],
        context.locale as Language
      ),
      //   idType: PageIdType.Uri,
    },
  });

  const currentArticle = articleData.post;

  return { currentArticle, breadcrumbs: [], cmsClient };
};

export default NextCmsArticle;
