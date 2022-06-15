import { NextPage } from "next";
import React from "react";
import { Page as RHHCPage } from "react-helsinki-headless-cms";

import Navigation from "../../../common-events/components/navigation/Navigation";
import eventsWithApollo from "../../../domain/clients/eventsWithApollo";
import EventPageContainer from "../../../domain/event/EventPageContainer";
import FooterSection from "../../../domain/footer/Footer";

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

export default eventsWithApollo(Event);
