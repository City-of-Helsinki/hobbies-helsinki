import { ApolloProvider } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "next-with-apollo";

import { createEventsApolloClient } from "./eventsApolloClient";

export default withApollo(
  ({ initialState }) => createEventsApolloClient(initialState),
  {
    getDataFromTree,
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
