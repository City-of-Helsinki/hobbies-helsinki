import React from "react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Page as RHHCApolloPage } from "react-helsinki-headless-cms/apollo";

import getHobbiesStaticProps from "../domain/app/getHobbiesStaticProps";
import serverSideTranslationsWithCommon from "../domain/i18n/serverSideTranslationsWithCommon";
import { getLocaleOrError } from "../domain/i18n/router/utils";
import { getQlLanguage } from "../common/apollo/utils";
import {
  LandingPageMainContent,
  LANDING_PAGE_QUERY,
} from "../domain/search/landingPage/LandingPage";
import { DEFAULT_LANGUAGE } from "../constants";
import Navigation from "../common-events/components/navigation/Navigation";

export default function HomePage() {
  const router = useRouter();

  const language = getQlLanguage(
    router.locale ?? router.defaultLocale ?? DEFAULT_LANGUAGE
  );
  const { data } = useQuery(LANDING_PAGE_QUERY, {
    variables: {
      languageCode: language,
    },
  });

  return (
    <RHHCApolloPage
      uri="/"
      className="pageLayout"
      navigation={<Navigation />}
      content={<LandingPageMainContent page={data?.landingPage} />}
      footer={<footer>TODO: footer</footer>}
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ cmsClient }) => {
    const locale = context.locale ?? context.defaultLocale ?? DEFAULT_LANGUAGE;
    await cmsClient.query({
      query: LANDING_PAGE_QUERY,
      variables: {
        languageCode: getQlLanguage(locale),
      },
    });

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(getLocaleOrError(locale), [
          "home_page",
          "landing_page_search_form",
          "collection_count_label",
          "hardcoded_shortcuts",
        ])),
      },
    };
  });
}
