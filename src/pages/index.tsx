import React from "react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Navigation, Page } from "react-helsinki-headless-cms/apollo";

import getHobbiesStaticProps from "../domain/app/getHobbiesStaticProps";
import serverSideTranslationsWithCommon from "../domain/i18n/serverSideTranslationsWithCommon";
import { getLocaleOrError } from "../domain/i18n/router/utils";
import { getQlLanguage } from "../common/apollo/utils";
import {
  LandingPageMainContent,
  LANDING_PAGE_QUERY,
} from "../domain/landingPage/LandingPage";
import styles from "./pageLayout.module.scss";

export default function HomePage() {
  const router = useRouter();
  const currentPage = router.pathname;

  const language = getQlLanguage(router.locale ?? router.defaultLocale);
  const { data } = useQuery(LANDING_PAGE_QUERY, {
    variables: {
      languageCode: language,
    },
  });

  return (
    <Page
      uri="/"
      className={styles.pageLayout}
      navigation={
        <Navigation
          menuName="Hobbies Helsinki Header"
          onTitleClick={() => {
            // eslint-disable-next-line no-console
          }}
          getIsItemActive={({ path }) => path === currentPage}
          getPathnameForLanguage={() => currentPage}
        />
      }
      content={<LandingPageMainContent page={data?.landingPage} />}
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
