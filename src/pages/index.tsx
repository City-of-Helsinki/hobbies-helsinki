import React from "react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";
import { Navigation, Page } from "react-helsinki-headless-cms/apollo";

import getHobbiesStaticProps from "../domain/app/getHobbiesStaticProps";
import serverSideTranslationsWithCommon from "../domain/i18n/serverSideTranslationsWithCommon";
import { getLocaleOrError } from "../domain/i18n/router/utils";
import { getQlLanguage } from "../common/apollo/utils";
import Section from "../common/components/section/Section";
import Hero from "../common/components/hero/Hero";
import HeroImage from "../common/components/hero/HeroImage";
import SearchShortcuts from "../common/components/searchShortcuts/SearchShortcuts";
import getCurrentSeason from "../domain/season/getCurrentSeason";
import shortcuts from "../domain/shortcuts/shortcutsData";
import LandingPageSearch from "../domain/landingPageSearch/LandingPageSearch";

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

export default function HomePage() {
  const { t } = useTranslation("home_page");
  const { t: tShortcuts } = useTranslation("hardcoded_shortcuts");
  const router = useRouter();
  const currentPage = router.pathname;
  const currentSeason = getCurrentSeason();
  const language = getQlLanguage(router.locale ?? router.defaultLocale);
  const { data } = useQuery(LANDING_PAGE_QUERY, {
    variables: {
      languageCode: language,
    },
  });

  const landingPage = data?.landingPage?.translation;

  const heroImage =
    data?.landingPage?.desktopImage?.edges[0]?.node?.mediaItemUrl;

  const content = (
    <main>
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
            .filter((shortcut) => shortcut.seasons.includes(currentSeason))
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
  );

  return (
    <Page
      uri="/"
      navigation={
        <header>
          <Navigation
            menuName="Hobbies Helsinki Header"
            onTitleClick={() => {
              // eslint-disable-next-line no-console
            }}
            getIsItemActive={({ path }) => path === currentPage}
            getPathnameForLanguage={() => currentPage}
          />
        </header>
      }
      content={content}
      footer={<footer>TODO: footer</footer>}
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ cmsClient }) => {
    await cmsClient.query({
      query: LANDING_PAGE_QUERY,
      variables: {
        languageCode: getQlLanguage(context.locale ?? context.defaultLocale),
      },
    });

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(
          getLocaleOrError(context.locale),
          [
            "home_page",
            "landing_page_search_form",
            "collection_count_label",
            "hardcoded_shortcuts",
          ]
        )),
      },
    };
  });
}
