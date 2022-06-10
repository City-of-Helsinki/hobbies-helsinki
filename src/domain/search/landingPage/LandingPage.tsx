import { gql } from "@apollo/client";
import { Koros } from "hds-react";
import { useTranslation } from "next-i18next";
import { PageContentLayoutProps } from "react-helsinki-headless-cms/";

import Hero from "../../../common/components/hero/Hero";
import HeroImage from "../../../common/components/hero/HeroImage";
import SearchShortcuts from "../../../common/components/searchShortcuts/SearchShortcuts";
import Section from "../../../common/components/section/Section";
import LandingPageSearch from "../../landingPageSearch/LandingPageSearch";
import getCurrentSeason from "../../season/getCurrentSeason";
import shortcuts from "../../shortcuts/shortcutsData";
import styles from "./landingPage.module.scss";

export const LANDING_PAGE_QUERY = gql`
  query LandingPageQuery($languageCode: LanguageCodeEnum!) {
    landingPage(id: "root", idType: SLUG) {
      id
      desktopImage {
        edges {
          node {
            mediaItemUrl
          }
        }
      }
      translation(language: $languageCode) {
        title
        description
        heroLink
      }
    }
  }
`;

export type LandingPageProps = {
  // TODO: Fix any type by adding the landing page query to HCRC-lib
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  landingPage?: any;
};

export function LandingPageContentLayout({
  landingPage,
  collections,
}: LandingPageProps & PageContentLayoutProps) {
  const { title, description, heroLink } = landingPage?.translation;
  const heroImage = landingPage?.desktopImage?.edges[0]?.node?.mediaItemUrl;
  const currentSeason = getCurrentSeason();
  const { t } = useTranslation();
  const { t: tShortcuts } = useTranslation("hardcoded_shortcuts");
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <div className={styles.highlight}>
          {landingPage?.translation && (
            <>
              <HeroImage desktopImageUri={heroImage} />
              <Section variant="contained" color="transparent">
                <Hero
                  title={title}
                  description={description}
                  cta={{
                    label: heroLink[0],
                    href: heroLink[1],
                  }}
                />
              </Section>
            </>
          )}
          <Section color="transparent">
            <LandingPageSearch />
            <SearchShortcuts
              shortcuts={shortcuts
                .filter((shortcut) =>
                  currentSeason !== null
                    ? shortcut.seasons.includes(currentSeason)
                    : true
                )
                .map((shortcut) => ({
                  id: shortcut.id,
                  label: tShortcuts(shortcut.id),
                  icon: shortcut.icon,
                  ontologyTreeIds: shortcut.ontologyTreeIds,
                }))}
            />
          </Section>
        </div>
        <Koros className={styles.koros} flipHorizontal />
        <Section color="transparent" title={t("recommended_collections_title")}>
          {collections}
        </Section>
      </main>
    </div>
  );
}
