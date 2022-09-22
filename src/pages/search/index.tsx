import React, { useRef } from 'react';
import { GetStaticPropsContext } from 'next';
import { useEffect } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import { ROUTES } from 'events-helsinki-core';
import { useEventsApolloClientFromConfig } from 'events-helsinki-components';

import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import Navigation from '../../common-events/components/navigation/Navigation';
import SearchPage from '../../domain/search/eventSearch/SearchPage';
import FooterSection from '../../domain/footer/Footer';
import { getLocaleOrError } from '../../utils/routerUtils';

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
    <HCRCApolloPage
      uri={ROUTES.SEARCH}
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
    const locale = getLocaleOrError(context.locale);

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'home',
          'event',
          'search',
        ])),
      },
    };
  });
}
