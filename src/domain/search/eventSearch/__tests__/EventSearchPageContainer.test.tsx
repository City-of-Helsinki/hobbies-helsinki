/* eslint-disable no-console */
import { MockedResponse } from '@apollo/client/testing';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import { toast } from 'react-toastify';

import { translations } from '../../../../tests/initI18n';
import {
  fakeEvents,
  fakeLocalizedObject,
  fakeNeighborhoods,
  fakePlaces,
} from '../../../../tests/mockDataUtils';
import {
  createEventListRequestAndResultMocks,
  createEventListRequestThrowsErrorMocks,
} from '../../../../tests/mocks/eventListMocks';
import {
  act,
  render,
  userEvent,
  waitFor,
  screen,
  actWait,
} from '../../../../tests/testUtils';
import {
  Meta,
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../nextApi/graphql/generated/graphql';
import EventSearchPageContainer from '../EventSearchPageContainer';

const meta: Meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page=2&page_size=10&sort=start_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
  previous: null,
  __typename: 'Meta',
};
const meta2: Meta = {
  count: 1,
  next: null,
  previous: null,
  __typename: 'Meta',
};

const testEventName = 'Testituloskortti 1';

const eventsResponse = { ...fakeEvents(10), meta };

const eventsLoadMoreResponse = {
  ...fakeEvents(10),
  meta: { ...meta, next: null },
};

const neighborhoodsResponse = {
  data: {
    neighborhoodList: fakeNeighborhoods(10),
  },
};

const placesResponse = {
  data: {
    placeList: fakePlaces(10),
  },
};

const searchJazzMocks = [
  createEventListRequestAndResultMocks({
    variables: { allOngoingAnd: ['jazz'] },
    response: eventsResponse,
  }),
  createEventListRequestAndResultMocks({
    variables: { internetBased: true, allOngoingAnd: ['jazz'] },
    response: {
      ...fakeEvents(1, [{ name: fakeLocalizedObject(testEventName) }]),
      meta: meta2,
    },
  }),
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
  },
  {
    request: {
      query: PlaceListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 10,
        text: '',
      },
    },
    result: placesResponse,
  },
];

const searchJazzThenClickLoadMoreMocks = [
  ...searchJazzMocks,
  createEventListRequestAndResultMocks({
    variables: { allOngoingAnd: ['jazz'], page: 2 },
    response: eventsLoadMoreResponse,
  }),
];
const searchJazzThenClickLoadMoreThrowsErrorMock = [
  ...searchJazzMocks,
  createEventListRequestThrowsErrorMocks(),
];

afterAll(() => {
  clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

const pathname = '/haku';
const search = '?text=jazz';
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = (
  mocks: MockedResponse[] = searchJazzThenClickLoadMoreMocks
) =>
  render(<EventSearchPageContainer />, {
    mocks,
    routes,
  });

it('all the event cards should be visible and load more button should load more events', async () => {
  advanceTo(new Date(2020, 7, 12));
  renderComponent();

  await waitFor(() => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      screen.getByText(eventsResponse.data[0].name.fi!)
    ).toBeInTheDocument();
  });

  eventsResponse.data.forEach((event) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(screen.getByText(event.name.fi!)).toBeInTheDocument();
  });

  await act(async () =>
    userEvent.click(
      screen.getByRole('button', {
        name: translations.search.buttonLoadMore.replace(
          '{{count}}',
          (eventsResponse.meta.count - eventsResponse.data.length).toString()
        ),
      })
    )
  );

  await waitFor(() => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      screen.getByText(eventsLoadMoreResponse.data[0].name.fi!)
    ).toBeInTheDocument();
  });

  eventsLoadMoreResponse.data.forEach((event) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(screen.getByText(event.name.fi!)).toBeInTheDocument();
  });
});

it('should show toastr message when loading next event page fails', async () => {
  toast.error = jest.fn();

  renderComponent(searchJazzThenClickLoadMoreThrowsErrorMock);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  const name = translations.search.buttonLoadMore.replace(
    '{{count}}',
    (eventsResponse.meta.count - eventsResponse.data.length).toString()
  );

  await waitFor(() => {
    expect(
      screen.getByRole('button', {
        name,
      })
    ).toBeInTheDocument();
  });

  await act(async () =>
    userEvent.click(
      screen.getByRole('button', {
        name,
      })
    )
  );

  await waitFor(() => {
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

  expect(toast.error).toBeCalledWith(translations.search.errorLoadMode);
});

it.todo('should scroll to event defined in react-router location state');
// it('should scroll to event defined in react-router location state', async () => {
//   scroller.scrollTo = jest.fn();
//   const mockLocation = {
//     pathname,
//     hash: '',
//     search,
//     state: { eventId: eventsResponse.data[0].id },
//   };
//   jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

//   renderComponent();

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   expect(scroller.scrollTo).toBeCalled();
// });

it.todo('should not scroll to result list on large screen');
// it('should not scroll to result list on large screen', async () => {
//   scroller.scrollTo = jest.fn();
//   const mockLocation = {
//     pathname,
//     hash: '',
//     search,
//     state: { scrollToResults: true },
//   };
//   jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

//   renderComponent();

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   expect(scroller.scrollTo).not.toBeCalled();
// });

it.todo('should scroll to result list on mobile screen');
// it('should scroll to result list on mobile screen', async () => {
//   global.innerWidth = 500;
//   scroller.scrollTo = jest.fn();

//   const mockLocation = {
//     pathname,
//     hash: '',
//     search,
//     state: { scrollToResults: true },
//   };
//   jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

//   renderComponent();

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   expect(scroller.scrollTo).toBeCalled();
// });
