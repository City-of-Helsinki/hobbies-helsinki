import { PageContentLayoutProps } from 'react-helsinki-headless-cms/';
import { LandingPageQuery } from 'react-helsinki-headless-cms/apollo';
import { PageSection } from 'react-helsinki-headless-cms';
import { ContentContainer } from 'react-helsinki-headless-cms';

import Hero from '../../../common/components/hero/Hero';
import LandingPageSearch from '../landingPageSearch/LandingPageSearch';
import styles from './landingPage.module.scss';

export type LandingPageProps = {
  landingPage?: LandingPageQuery['landingPage'];
};

export function LandingPageContentLayout({
  landingPage,
  collections,
}: LandingPageProps & PageContentLayoutProps) {
  const { title, description, heroLink } = landingPage?.translation || {};
  const heroImage =
    landingPage?.desktopImage?.edges?.[0]?.node?.mediaItemUrl ?? undefined;
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <div className={styles.highlight}>
          {landingPage?.translation && (
            <PageSection
              className={styles.sectionHero}
              korosBottom
              korosBottomClassName={styles.korosBottomHero}
              backgroundImageUrl={heroImage}
            >
              <ContentContainer>
                {heroLink && heroLink.length > 0 && (
                  <Hero
                    title={title ?? ''}
                    description={description ?? ''}
                    cta={{
                      label: heroLink[0] ?? '',
                      href: heroLink[1] ?? '',
                    }}
                  />
                )}
              </ContentContainer>
            </PageSection>
          )}
          <PageSection className={styles.sectionSearch}>
            <ContentContainer>
              <div className={styles.sectionSearchContent}>
                <LandingPageSearch />
              </div>
            </ContentContainer>
          </PageSection>
        </div>
        <PageSection
          korosTop
          korosTopClassName={styles.korosTopCollections}
          className={styles.sectionCollections}
        >
          <ContentContainer>{collections}</ContentContainer>
        </PageSection>
      </main>
    </div>
  );
}
