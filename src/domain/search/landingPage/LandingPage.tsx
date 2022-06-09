import { gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

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
  page: any;
};

export function LandingPageMainContent({ page }: LandingPageProps) {
  const landingPage = page?.translation;
  const heroImage = page?.desktopImage?.edges[0]?.node?.mediaItemUrl;
  const currentSeason = getCurrentSeason();
  const { t } = useTranslation();
  const { t: tShortcuts } = useTranslation("hardcoded_shortcuts");
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        {landingPage && (
          <>
            <HeroImage desktopImageUri={heroImage} />
            <Section variant="contained" color="transparent">
              <Hero
                title={landingPage.title}
                description={landingPage.description}
                cta={{
                  label: landingPage.heroLink[0],
                  href: landingPage.heroLink[1],
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
        <Section title={t("recommended_collections_title")}>
          TODO: Collection grid
        </Section>
      </main>
    </div>
  );
}
