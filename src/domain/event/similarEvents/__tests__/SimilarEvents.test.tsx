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
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../tests/testUtils';
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

const mocks = [
  createEventListRequestAndResultMocks({
    variables: {
      allOngoing: true,
      keywordOrSet1: ['keyword1', 'keyword2', 'keyword3'],
    },
    response: expectedSimilarEvents,
  }),
];

afterAll(() => {
  clear();
});

const waitForComponentToBeLoaded = async () => {
  await waitFor(() => {
    expect(
      screen.queryByRole('heading', {
        name: translations.event.similarEvents.title,
      })
    ).toBeInTheDocument();
  });
};

describe.skip('similar events', () => {
  test('should render similar event cards', async () => {
    advanceTo(new Date('2020-08-11'));
    render(<SimilarEvents event={event as EventFieldsFragment} />, {
      mocks,
    });
    await waitForComponentToBeLoaded();

    expectedSimilarEvents.data.forEach((event) => {
      expect(
        screen.queryByRole('link', {
          name: translations.event.eventCard.ariaLabelLink.replace(
            '{{name}}',
            event.name.fi as string
          ),
        })
      ).toBeInTheDocument();
    });
  });

  it('has return path on similar event link', async () => {
    const path = '/courses/:id';
    const route = path.replace(':id', 'rootEventId');
    const { router } = render(
      <SimilarEvents event={event as EventFieldsFragment} />,
      {
        mocks,
        routes: [route],
      }
    );
    for (const similarEvent of expectedSimilarEvents.data) {
      await waitForComponentToBeLoaded();
      userEvent.click(
        screen.getByRole('button', {
          name: translations.event.eventCard.ariaLabelLink.replace(
            '{{name}}',
            similarEvent.name.fi as string
          ),
        })
      );
      expect(router).toMatchObject({
        pathname: `/fi${'/courses/:id'.replace(
          ':id',
          similarEvent.id
        )}?returnPath=${encodeURIComponent(route)}`,
      });
      router.back();
    }
  });
});
