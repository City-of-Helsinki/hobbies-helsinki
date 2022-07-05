import React, { useRef } from 'react';
import { GetStaticPropsContext } from 'next';
import { useEffect } from 'react';
import { Page as RHHCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ApolloProvider } from '@apollo/client';

import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import useRouter from '../../common-events/i18n/router/useRouter';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import { getLocaleOrError } from '../../common-events/i18n/router/utils';
import { DEFAULT_LANGUAGE } from '../../constants';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import Navigation from '../../common-events/components/navigation/Navigation';
import SearchPage from '../../domain/search/eventSearch/SearchPage';
import FooterSection from '../../domain/footer/Footer';
import useEventsApolloClientFromConfig from '../../common-events/hooks/useEventsApolloClientFromConfig';

export default function Search() {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  const eventsApolloClient = useEventsApolloClientFromConfig();

  useEffect(() => {
    const listElement = listRef.current;

    if (scrollTo) {
      const listItemElement = listElement?.querySelector(
        decodeURIComponent(scrollTo.toString())
      );

      if (listItemElement) {
        listItemElement.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [scrollTo]);

  return (
    <RHHCApolloPage
      uri="/search"
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <ApolloProvider client={eventsApolloClient}>
          <SearchPage
            SearchComponent={AdvancedSearch}
            pageTitle={'eventSearch.title'}
          />
        </ApolloProvider>
      }
      footer={<FooterSection />}
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async () => {
    const locale = context.locale ?? context.defaultLocale ?? DEFAULT_LANGUAGE;

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(getLocaleOrError(locale), [
          'common',
          'home',
          'event',
          'search',
        ])),
      },
    };
  });
}
