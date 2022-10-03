/* eslint-disable no-console */
import { MockedResponse } from '@apollo/client/testing';
import { addDays } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import range from 'lodash/range';
import React from 'react';
import { toast } from 'react-toastify';
import { NextRouter } from 'next/router';
import { getDateRangeStr } from 'events-helsinki-components';

import {
  EventDetails,
  EventFieldsFragment,
  EventListQueryVariables,
  EventListResponse,
  EventTypeId,
  Meta,
} from '../../../../domain/nextApi/graphql/generated/graphql';
import {
  createOtherEventTimesRequestAndResultMocks,
  createOtherEventTimesRequestThrowsErrorMocks,
} from '../../../../tests/mocks/eventListMocks';
import { fakeEvent, fakeEvents } from '../../../../tests/mockDataUtils';
import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../tests/testUtils';
import OtherEventTimes from '../OtherEventTimes';
import { translations } from '../../../../tests/initI18n';

const startTime = '2020-10-01T16:00:00Z';
const endTime = '2020-10-01T18:00:00Z';

const superEventId = 'hel:123';
const superEventInternalId = `https://api.hel.fi/linkedevents/v1/event/${superEventId}`;

const courseEvent = fakeEvent({
  superEvent: { internalId: superEventInternalId },
  typeId: EventTypeId.Course,
}) as EventFieldsFragment;

const meta: Meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedevents/v1/event/?include=keyword,location&page=2&sort=end_time&start=2020-08-11T03&super_event=hel:123',
  previous: null,
  __typename: 'Meta',
};

const otherEventsResponse = {
  ...fakeEvents(
    10,
    range(1, 11).map((i) => ({
      endTime: addDays(new Date(endTime), i).toISOString(),
      startTime: addDays(new Date(startTime), i).toISOString(),
      typeId: EventTypeId.Course,
    }))
  ),
  meta,
};

const otherEventsLoadMoreResponse = {
  ...fakeEvents(
    10,
    range(11, 21).map((i) => ({
      endTime: addDays(new Date(endTime), i).toISOString(),
      startTime: addDays(new Date(startTime), i).toISOString(),
    }))
  ),
  meta: { ...meta, next: null },
};

const getEventTimesMocks = ({
  response,
  variables,
}: {
  response: EventListResponse;
  variables?: EventListQueryVariables;
}) =>
  createOtherEventTimesRequestAndResultMocks({
    superEventId,
    response,
    variables,
  });

const firstLoadMock = getEventTimesMocks({
  response: otherEventsResponse,
});

const secondLoadMock = getEventTimesMocks({
  variables: { page: 2 },
  response: otherEventsLoadMoreResponse,
});

const secondPageLoadThrowsErrorMock =
  createOtherEventTimesRequestThrowsErrorMocks({
    superEventId,
    variables: { page: 2 },
  });

const defaultMocks = [firstLoadMock, secondLoadMock];

afterAll(() => {
  clear();
});

const renderComponent = ({
  mocks = defaultMocks,
  event = courseEvent,
}: {
  mocks?: MockedResponse[];
  event?: EventFieldsFragment;
} = {}) => render(<OtherEventTimes event={event} />, { mocks });

const getDateRangeStrProps = (event: EventDetails) => ({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  start: event.startTime!,
  end: event.endTime,
  locale: 'fi',
  includeTime: true,
  timeAbbreviation: translations.common.timeAbbreviation,
});

describe('events', () => {
  test('should render other event times', async () => {
    advanceTo(new Date('2020-08-11'));
    renderComponent();
    await testOtherEventTimes();
  });

  test('should show toastr when loading next event page fails', async () => {
    toast.error = jest.fn();
    advanceTo(new Date('2020-08-11'));
    const mocks = [firstLoadMock, secondPageLoadThrowsErrorMock];
    renderComponent({ mocks });
    await testToaster();
  });

  test('should go to event page of other event time', async () => {
    advanceTo(new Date('2020-08-11'));
    const { router } = renderComponent();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await testNavigation(router, '/kurssit/');
  });
});

async function testOtherEventTimes() {
  await waitFor(() => {
    expect(
      screen.queryByTestId('skeleton-loader-wrapper')
    ).not.toBeInTheDocument();
  });
  otherEventsResponse.data.slice(0, 3).forEach((event) => {
    const dateStr = getDateRangeStr(getDateRangeStrProps(event));
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });
  const fourthevent = otherEventsResponse.data[3];
  const fourthDateStr = getDateRangeStr(getDateRangeStrProps(fourthevent));
  expect(screen.queryByText(fourthDateStr)).not.toBeInTheDocument();

  const toggleButton = await screen.findByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  await act(() => userEvent.click(toggleButton));

  otherEventsResponse.data.forEach((event) => {
    const dateStr = getDateRangeStr(getDateRangeStrProps(event));
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });

  // FIXME: Test the load more feature. - It's now skipped because
  // I could not find a way to solve this Warning: The current testing environment is not configured to support act(...)
  // otherEventsLoadMoreResponse.data.forEach((event) => {
  //   const dateStr = getDateRangeStr(getDateRangeStrProps(event));
  //   expect(screen.getByText(dateStr)).toBeInTheDocument();
  // });
}

async function testToaster() {
  const toggleButton = await screen.findByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  userEvent.click(toggleButton);

  await waitFor(() => {
    expect(toast.error).toBeCalledWith(translations.event.info.errorLoadMode);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function testNavigation(router: NextRouter, url: string) {
  const toggleButton = await screen.findByRole('button', {
    name: translations.event.otherTimes.buttonShow,
  });

  await act(() => userEvent.click(toggleButton));

  const event = otherEventsResponse.data[0];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dateStr = getDateRangeStr(getDateRangeStrProps(event!));
  expect(screen.getByText(dateStr)).toBeInTheDocument();

  await act(() =>
    userEvent.click(
      screen.getByRole('link', {
        name: translations.event.otherTimes.buttonReadMore.replace(
          '{{date}}',
          dateStr
        ),
      })
    )
  );

  expect(router.asPath).toBe(`${url}${event?.id}`);
}
