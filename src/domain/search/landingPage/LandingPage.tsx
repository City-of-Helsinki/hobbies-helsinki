import React from 'react';
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

  const collectionNodes = collections as React.ReactNode[];

  const getCollectionByIndex = (index: number) => {
    if (collections && Array.isArray(collections)) {
      try {
        return collectionNodes[index];
      } catch {
        return null;
      }
    }
    return null;
  };

  const firstCollection = getCollectionByIndex(0);
  const restCollections = collectionNodes?.slice(1, collectionNodes.length - 2);
  const lastCollection = getCollectionByIndex(collectionNodes.length - 1);

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
        {firstCollection && (
          <PageSection
            korosTop
            korosTopClassName={styles.korosTopCollectionsFirst}
            className={styles.sectionCollectionsFirst}
          >
            <ContentContainer>{firstCollection}</ContentContainer>
          </PageSection>
        )}
        {restCollections && (
          <PageSection
            korosTop
            korosTopClassName={styles.korosTopCollectionsRest}
            className={styles.sectionCollections}
          >
            <ContentContainer>{restCollections}</ContentContainer>
          </PageSection>
        )}
        {lastCollection && (
          <PageSection
            korosTop
            korosBottom
            korosTopClassName={styles.korosTopCollectionsLast}
            korosBottomClassName={styles.korosBottomCollectionsLast}
            className={styles.sectionCollectionsLast}
          >
            <ContentContainer>{lastCollection}</ContentContainer>
          </PageSection>
        )}
      </main>
    </div>
  );
}
