import { clear } from 'console';

import { advanceTo } from 'jest-date-mock';
import * as React from 'react';

import { translations } from '../../../../tests/initI18n';
import {
  fakeEvent,
  fakeEvents,
  fakeKeyword,
  fakeLocalizedObject,
  fakeTargetGroup,
} from '../../../../tests/mockDataUtils';
import { createEventListRequestAndResultMocks } from '../../../../tests/mocks/eventListMocks';
import { render, screen, waitFor } from '../../../../tests/testUtils';
import { EventFieldsFragment } from '../../../nextApi/graphql/generated/graphql';
import SimilarEvents from '../SimilarEvents';

const id = '1';
const name = 'Event title';
const description = 'Event description';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-05T10:00:00.000000Z';
const audience = ['Aikuiset', 'Lapset'];
const keywords = [
  { name: 'Avouinti', id: 'keyword1' },
  { name: 'Eläimet', id: 'keyword2' },
  { name: 'Grillaus', id: 'keyword3' },
];

const expectedSimilarEvents = fakeEvents(3);

const event = fakeEvent({
  id,
  startTime,
  endTime,
  name: fakeLocalizedObject(name),
  description: fakeLocalizedObject(description),
  keywords: keywords.map((k) =>
    fakeKeyword({ name: fakeLocalizedObject(k.name), id: k.id })
  ),
  audience: audience.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
});

const similarEventQueryVariables = {
  pageSize: 100,
  allOngoing: true,
  keywordOrSet2: [''],
  keywordOrSet3: [''],
  language: undefined,
  audienceMinAgeLt: event.audienceMinAge, // LT - Really?
  audienceMaxAgeGt: event.audienceMaxAge, // GT - Really?
};

const mocks = [
  createEventListRequestAndResultMocks({
    variables: similarEventQueryVariables,
    response: expectedSimilarEvents,
  }),
];

afterAll(() => {
  clear();
});

const waitForComponentToBeLoaded = async () => {
  await waitFor(() => {
    expect(screen.queryByText('Page is loading')).not.toBeInTheDocument();
  });
};

describe('similar events', () => {
  test('should render similar event cards', async () => {
    advanceTo(new Date('2020-08-11'));
    render(<SimilarEvents event={event as EventFieldsFragment} />, {
      mocks,
    });
    await waitForComponentToBeLoaded();
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', {
          name: translations.event.similarEvents.title,
        })
      ).toBeInTheDocument();
    });
    expectedSimilarEvents.data.forEach((event) => {
      expect(
        // FIXME: Should the card's area be visible?
        // screen.queryByRole('link', {
        //   name: event.name.fi as string,
        // })
        screen.queryByText(event.name.fi as string)
      ).toBeInTheDocument();
    });
  });
  test('should hide the whole page section when there are no cards', async () => {
    advanceTo(new Date('2020-08-11'));
    render(<SimilarEvents event={event as EventFieldsFragment} />, {
      mocks: [
        createEventListRequestAndResultMocks({
          variables: similarEventQueryVariables,
          response: { ...expectedSimilarEvents, data: [] },
        }),
      ],
    });
    await waitForComponentToBeLoaded();
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', {
          name: translations.event.similarEvents.title,
        })
      ).not.toBeInTheDocument();
    });
  });
});
