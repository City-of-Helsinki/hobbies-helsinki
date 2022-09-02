/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NormalizedCacheObject } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import {
  Breadcrumb,
  getCollections,
  CollectionType,
  PageContent as HCRCPageContent,
  Page as HCRCPage,
  PageContentProps,
  useConfig,
  PageType,
} from 'react-helsinki-headless-cms';
import {
  PageDocument,
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';

import Navigation from '../../common-events/components/navigation/Navigation';
import {
  getDefaultCollections,
  getSlugFromUri,
  getUriID,
} from '../../common-events/utils/headless-cms/headlessCmsUtils';
import { getAllPages } from '../../common-events/utils/headless-cms/service';
import { createCmsApolloClient } from '../../domain/clients/cmsApolloClient';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import { Language } from '../../types';
import { getLocaleOrError } from '../../utils/routerUtils';

const NextCmsPage: NextPage<{
  page: PageType;
  breadcrumbs: Breadcrumb[] | null;
  collections: CollectionType[];
}> = ({ page, breadcrumbs, collections }) => {
  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();

  return (
    <HCRCPage
      navigation={<Navigation page={page} />}
      content={
        <HCRCPageContent
          page={page as PageContentProps['page']}
          breadcrumbs={breadcrumbs ?? undefined}
          collections={
            collections
              ? getDefaultCollections(
                  page,
                  getRoutedInternalHref,
                  currentLanguageCode
                )
              : []
          }
        />
      }
      footer={<FooterSection />}
    />
  );
};

export async function getStaticPaths() {
  const pagePageInfos = await getAllPages();
  const paths = pagePageInfos
    .map((pageInfo) => ({
      params: { slug: getSlugFromUri(pageInfo.slug) },
      locale: pageInfo.locale,
    }))
    // Remove the pages without a slug
    .filter((entry) => entry.params.slug && entry.params.slug.length);
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

type ResultProps =
  | {
      initialApolloState: NormalizedCacheObject;
      page: PageQuery['page'];
      breadcrumbs: Breadcrumb[];
      collections: CollectionType[];
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
    const locale = getLocaleOrError(context.locale);

    return {
      props: {
        initialApolloState: cmsClient.cache.extract(),
        ...(await serverSideTranslationsWithCommon(locale, ['cms'])),
        page,
        breadcrumbs,
        collections: getCollections(page.modules ?? []),
      },
      revalidate: 60,
    };
  } catch (e) {
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
  // TODO: Breadcrumbs are unstyled, so left disabled
  // Fetch all parent pages for navigation data.
  // These breadcrumb uris are used to fetch all the parent pages of the current page
  // so that all the childrens of parent page can be figured out and sub page navigations can be formed
  // for rendering
  // const uriSegments = slugsToUriSegments(
  //   (context.params?.slug ?? []) as string[]
  // );
  // const apolloPageResponses = await Promise.all(
  //   uriSegments.map((uri) => {
  //     return cmsClient.query<PageQuery, PageQueryVariables>({
  //       query: PageDocument,
  //       variables: {
  //         id: uri,
  //       },
  //     });
  //   })
  // );
  // const pages = apolloPageResponses.map((res) => res.data.page);
  // const breadcrumbs = pages.map((page) => ({
  //   link: page?.link ?? '',
  //   title: page?.title ?? '',
  // }));

  return { currentPage, breadcrumbs: [], cmsClient };
};

export default NextCmsPage;
