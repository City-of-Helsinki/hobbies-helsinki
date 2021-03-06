import { MockedResponse } from '@apollo/client/testing';

import {
  EventDetails,
  EventsByIdsDocument,
  EventsByIdsQueryVariables,
} from '../../domain/nextApi/graphql/generated/graphql';

export const getEventsByIdsMock = ({
  variables,
  eventsByIds,
}: {
  variables: Partial<EventsByIdsQueryVariables>;
  eventsByIds: EventDetails[];
}): MockedResponse => {
  return {
    request: {
      query: EventsByIdsDocument,
      variables,
    },
    result: {
      data: {
        eventsByIds: {
          data: eventsByIds,
          meta: {
            count: eventsByIds.length,
            previous: 'asdf',
            next: 'qwer',
          },
        },
      },
    },
  };
};
