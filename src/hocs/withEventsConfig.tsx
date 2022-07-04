import React from 'react';

import { createEventsApolloClient } from '../domain/clients/eventsApolloClient';
import useEventsConfig from '../hooks/useEventsConfig';
import EventsConfigProvider from '../common-events/configProvider/ConfigProvider';

const withEvents = (WrappedComponent: any) => {
  return function WithEvents(props: any) {
    const eventsApolloClient = createEventsApolloClient();
    const eventsConfig = useEventsConfig(eventsApolloClient);
    return (
      <EventsConfigProvider config={eventsConfig}>
        <WrappedComponent {...props} />
      </EventsConfigProvider>
    );
  };
};

export default withEvents;
