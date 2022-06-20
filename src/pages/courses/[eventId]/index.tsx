import { GetStaticPropsContext, NextPage } from "next";
import React from "react";
import { Page as RHHCPage } from "react-helsinki-headless-cms";

import Navigation from "../../../common-events/components/navigation/Navigation";
import { getLocaleOrError } from "../../../common-events/i18n/router/utils";
import { DEFAULT_LANGUAGE } from "../../../constants";
import getHobbiesStaticProps from "../../../domain/app/getHobbiesStaticProps";
// import eventsWithApollo from "../../../domain/clients/eventsWithApollo";
import EventPageContainer from "../../../domain/event/EventPageContainer";
import FooterSection from "../../../domain/footer/Footer";
import serverSideTranslationsWithCommon from "../../../domain/i18n/serverSideTranslationsWithCommon";

const Event: NextPage = () => {
  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={<EventPageContainer showSimilarEvents={false} />}
      footer={<FooterSection />}
    />
  );
};
export default Event;

// export default eventsWithApollo(Event);
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async () => {
    const locale = context.locale ?? context.defaultLocale ?? DEFAULT_LANGUAGE;

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(getLocaleOrError(locale), [
          "common",
          "home",
          "search",
          "event",
        ])),
      },
    };
  });
}
