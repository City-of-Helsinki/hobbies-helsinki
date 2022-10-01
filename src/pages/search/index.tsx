import React, { useRef } from 'react';
import { GetStaticPropsContext } from 'next';
import { useEffect } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';

import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import { ROUTES } from '../../constants';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import Navigation from '../../common-events/components/navigation/Navigation';
import SearchPage from '../../domain/search/eventSearch/SearchPage';
import FooterSection from '../../domain/footer/Footer';
import useEventsApolloClientFromConfig from '../../common-events/hooks/useEventsApolloClientFromConfig';
import { getLocaleOrError } from '../../utils/routerUtils';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';

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
    <MatomoWrapper>
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
    </MatomoWrapper>
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
