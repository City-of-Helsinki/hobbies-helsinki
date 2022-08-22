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
  useConfig,
} from 'react-helsinki-headless-cms';
import { NetworkStatus } from '@apollo/client';
import { ModuleItemTypeEnum } from 'react-helsinki-headless-cms';

import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import { ROUTES } from '../../constants';
import Navigation from '../../common-events/components/navigation/Navigation';
import FooterSection from '../../domain/footer/Footer';
import { getLocaleOrError } from '../../utils/routerUtils';
import useDebounce from '../../common/hooks/useDebounce';
import { useCmsApollo } from '../../domain/clients/cmsApolloClient';
import {
  getEventPlaceholderImage,
  _getArticlePageCardProps,
} from '../../common-events/utils/headless-cms/headlessCmsUtils';
import useLocale from '../../common-events/hooks/useLocale';

const BLOCK_SIZE = 10;
const SEARCH_DEBOUNCE_TIME = 500;

export default function ArticleArchive() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME);
  const cmsClient = useCmsApollo({});
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
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
  const locale = useLocale();

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
  const defaultImageUrl = getEventPlaceholderImage('');
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
          largeFirstItem={searchTerm.length == 0 ? true : false}
          createLargeCard={(item) => (
            <LargeCard
              key={`lg-card-${item?.id}`}
              {..._getArticlePageCardProps(
                item as ArticleType,
                getRoutedInternalHref,
                defaultImageUrl
              )}
            />
          )}
          createCard={(item) => (
            <Card
              key={`sm-card-${item?.id}`}
              {...{
                ..._getArticlePageCardProps(
                  item as ArticleType,
                  getRoutedInternalHref,
                  defaultImageUrl
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
