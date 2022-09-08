import React from 'react';
import { GetStaticPropsContext } from 'next';
import {
  useCategoriesQuery,
  PageByTemplateDocument,
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
  usePostsQuery,
} from 'react-helsinki-headless-cms/apollo';
import {
  Page as RHHCPage,
  Card,
  LargeCard,
  SearchPageContent,
  ArticleType,
  useConfig,
  LanguageCodeFilterEnum,
  TemplateEnum,
  PageType,
} from 'react-helsinki-headless-cms';
import { NetworkStatus } from '@apollo/client';

import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import Navigation from '../../common-events/components/navigation/Navigation';
import FooterSection from '../../domain/footer/Footer';
import { getLocaleOrError } from '../../utils/routerUtils';
import useDebounce from '../../common/hooks/useDebounce';
import { useCmsApollo } from '../../domain/clients/cmsApolloClient';
import { getArticlePageCardProps } from '../../common-events/utils/headless-cms/headlessCmsUtils';
import { skipFalsyType } from '../../common/utils/typescript.utils';
import { getQlLanguage } from '../../common/apollo/utils';
import getHobbiesStaticProps, {
  HobbiesGlobalPageProps,
} from '../../domain/app/getHobbiesStaticProps';

const CATEGORIES_AMOUNT = 20;
const BLOCK_SIZE = 10;
const SEARCH_DEBOUNCE_TIME = 500;

export default function ArticleArchive({
  initialApolloState,
  page,
}: HobbiesGlobalPageProps & { page: PageType }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchCategories, setSearchCategories] = React.useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME);
  const cmsClient = useCmsApollo(initialApolloState);
  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();
  const {
    data: articlesData,
    fetchMore,
    loading: loadingArticles,
    networkStatus,
  } = usePostsQuery({
    client: cmsClient,
    notifyOnNetworkStatusChange: true,
    variables: {
      first: BLOCK_SIZE,
      search: debouncedSearchTerm ?? '',
      language: currentLanguageCode as unknown as LanguageCodeFilterEnum,
      categories: searchCategories,
    },
  });
  const { data: categoriesData, loading: loadingCategories } =
    useCategoriesQuery({
      client: cmsClient,
      variables: {
        first: CATEGORIES_AMOUNT,
        language: currentLanguageCode as unknown as LanguageCodeFilterEnum,
      },
    });

  const isLoading =
    (loadingArticles && networkStatus !== NetworkStatus.fetchMore) ||
    loadingCategories;
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  const pageInfo = articlesData?.posts?.pageInfo;
  const hasMoreToLoad = pageInfo?.hasNextPage ?? false;

  const fetchMoreArticles = async () => {
    if (hasMoreToLoad) {
      try {
        await fetchMore({
          variables: {
            first: BLOCK_SIZE,
            after: pageInfo?.endCursor,
          },
        });
      } catch (e) {}
    }
  };

  const articles = articlesData?.posts?.edges?.map((edge) => edge?.node).flat();
  const categories = categoriesData?.categories?.nodes ?? [];

  // Show the first item large when the search has not yet done
  const showFirstItemLarge = searchTerm.length === 0;
  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation page={page} />}
      content={
        <SearchPageContent
          // customContent={customContent}
          items={articles}
          tags={categories}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onSearch={(freeSearch, tags) => {
            //TODO: Instead of doing this through yet another state, could the query just be updated?
            setSearchTerm(freeSearch);
            // NOTE: For some reason the CMS needs database ids here instead of ids or slugs.
            setSearchCategories(
              tags
                .filter(skipFalsyType)
                .map((tag) => tag?.databaseId.toString())
            );
          }}
          onLoadMore={() => {
            fetchMoreArticles();
          }}
          largeFirstItem={showFirstItemLarge}
          createLargeCard={(item) => (
            <LargeCard
              key={`lg-card-${item?.id}`}
              {...getArticlePageCardProps(
                item as ArticleType,
                getRoutedInternalHref
              )}
            />
          )}
          createCard={(item) => (
            <Card
              key={`sm-card-${item?.id}`}
              {...{
                ...getArticlePageCardProps(
                  item as ArticleType,
                  getRoutedInternalHref
                ),
                text: '', // A design decision: The text is not wanted in the small cards
              }}
            />
          )}
          hasMore={hasMoreToLoad}
          isLoading={isLoading || isLoadingMore}
        />
      }
      footer={<FooterSection />}
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ cmsClient }) => {
    const locale = getLocaleOrError(context.locale);
    const { data: pageData } = await cmsClient.query<
      PageByTemplateQuery,
      PageByTemplateQueryVariables
    >({
      query: PageByTemplateDocument,
      variables: {
        template: TemplateEnum.PostsPage,
        language: getQlLanguage(locale).toLocaleLowerCase(),
      },
    });

    const page = pageData.pageByTemplate;
    return {
      props: {
        page,
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'home',
          'cms',
        ])),
      },
    };
  });
}
