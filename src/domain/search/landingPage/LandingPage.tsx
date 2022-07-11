import { ApolloProvider } from '@apollo/client';
import { Koros } from 'hds-react';
import { PageContentLayoutProps } from 'react-helsinki-headless-cms/';
import { LandingPageQuery } from 'react-helsinki-headless-cms/apollo';

import Hero from '../../../common/components/hero/Hero';
import HeroImage from '../../../common/components/hero/HeroImage';
import Section from '../../../common-events/components/section/Section';
import LandingPageSearch from '../landingPageSearch/LandingPageSearch';
import styles from './landingPage.module.scss';
import useEventsApolloClientFromConfig from '../../../common-events/hooks/useEventsApolloClientFromConfig';

export type LandingPageProps = {
  landingPage?: LandingPageQuery['landingPage'];
};

export function LandingPageContentLayout({
  landingPage,
  collections,
}: LandingPageProps & PageContentLayoutProps) {
  const { title, description, heroLink } = landingPage?.translation || {};
  const heroImage =
    landingPage?.desktopImage?.edges &&
    landingPage?.desktopImage?.edges[0]?.node?.mediaItemUrl;
  const eventsApolloClient = useEventsApolloClientFromConfig();

  return (
    <ApolloProvider client={eventsApolloClient}>
      <div className={styles.layout}>
        <main className={styles.main}>
          <div className={styles.highlight}>
            {landingPage?.translation && (
              <>
                <HeroImage desktopImageUri={heroImage ?? ''} />
                <Section variant="contained" color="transparent">
                  <Hero
                    title={title ?? ''}
                    description={description ?? ''}
                    cta={{
                      label: (heroLink && heroLink[0]) ?? '',
                      href: (heroLink && heroLink[1]) ?? '',
                    }}
                  />
                </Section>
              </>
            )}
            <Section color="transparent">
              <LandingPageSearch />
            </Section>
          </div>
          <Koros className={styles.koros} flipHorizontal />
          <Section color="transparent">{collections}</Section>
        </main>
      </div>
    </ApolloProvider>
  );
}
