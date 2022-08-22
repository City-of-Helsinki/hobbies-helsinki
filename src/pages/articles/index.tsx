import React from 'react';
import { GetStaticPropsContext } from 'next';
import {
  Page as HCRCApolloPage,
  usePostsQuery,
} from 'react-helsinki-headless-cms/apollo';
import {
  Card,
  getArticlePageCardProps,
  LargeCard,
  SearchPageContent,
  ArticleType,
} from 'react-helsinki-headless-cms';
import { NetworkStatus } from '@apollo/client';

import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import { ROUTES } from '../../constants';
import Navigation from '../../common-events/components/navigation/Navigation';
import FooterSection from '../../domain/footer/Footer';
import { getLocaleOrError } from '../../utils/routerUtils';
import useDebounce from '../../common/hooks/useDebounce';
import { useCmsApollo } from '../../domain/clients/cmsApolloClient';

const BLOCK_SIZE = 10;
const SEARCH_DEBOUNCE_TIME = 500;

export default function ArticleArchive() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME);
  const cmsClient = useCmsApollo({});

  const {
    data: articlesData,
    fetchMore,
    loading,
    networkStatus,
  } = usePostsQuery({
    client: cmsClient,
    notifyOnNetworkStatusChange: true,
    variables: {
      first: BLOCK_SIZE,
      search: debouncedSearchTerm ?? '',
    },
  });

  const isLoading = loading && networkStatus !== NetworkStatus.fetchMore;
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

  return (
    <HCRCApolloPage
      uri={ROUTES.ARTICLEARCHIVE}
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <SearchPageContent
          // customContent={customContent}
          items={articles}
          onSearch={(freeSearch, tags) => {
            setSearchTerm(freeSearch);
          }}
          onLoadMore={() => {
            fetchMoreArticles();
          }}
          largeFirstItem
          createLargeCard={(item) => (
            <LargeCard
              key={`lg-card-${item?.id}`}
              {...getArticlePageCardProps(item as ArticleType)}
            />
          )}
          createCard={(item) => (
            <Card
              key={`sm-card-${item?.id}`}
              {...getArticlePageCardProps(item as ArticleType)}
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
  return getHobbiesStaticProps(context, async () => {
    const locale = getLocaleOrError(context.locale);

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'home',
          'cms',
        ])),
      },
    };
  });
}
