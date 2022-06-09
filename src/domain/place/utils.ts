import eventsApolloClient from "../clients/eventsApolloClient";
import {
  Maybe,
  PlaceDetailsDocument,
  PlaceDetailsQuery,
} from "../nextApi/graphql/generated/graphql";

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  const data = eventsApolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });

  return data;
};
