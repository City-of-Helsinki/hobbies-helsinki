import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';
import mockRouter from 'next-router-mock';

import { translations } from '../../../../tests/initI18n';
import { EventFieldsFragment } from '../../../../domain/nextApi/graphql/generated/graphql';
import { fakeEvent, fakeKeywords } from '../../../../tests/mockDataUtils';
import { act, render, screen } from '../../../../tests/testUtils';
import EventCard from '../EventCard';

const keywordNames = ['Keyword 1', 'Keyword 2'];
const keywords = fakeKeywords(
  keywordNames.length,
  keywordNames.map((keyword) => ({ name: { fi: keyword } }))
);
const id = '123';
const name = 'Keyword name';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-15T10:00:00.000000Z';
const addressLocality = 'Helsinki';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const event = fakeEvent({
  id,
  startTime,
  endTime,
  keywords: keywords.data,
  name: { fi: name },
  location: {
    internalId: 'tprek:8740',
    addressLocality: { fi: addressLocality },
    name: { fi: locationName },
    streetAddress: { fi: streetAddress },
  },
}) as EventFieldsFragment;

afterAll(() => {
  clear();
});

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

const renderComponent = () => render(<EventCard event={event} />);
describe('event card', () => {
  test('for accessibility violations', async () => {
    const { container } = renderComponent();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Skipped, because this is not available after the Link-component is changed from react-router Link.
  test.skip('should go to event page by clicking event card', async () => {
    advanceTo('2020-10-05');
    const { router } = renderComponent();
    expect(router.pathname).toEqual('/');
    await act(() =>
      userEvent.click(
        screen.getByRole('link', {
          name: translations.event.eventCard.ariaLabelLink.replace(
            '{{name}}',
            event.name.fi as string
          ),
        })
      )
    );
    expect(router.pathname).toEqual('/kurssit/123');
  });

  test('should go to event page by clicking button', async () => {
    const { router } = renderComponent();
    expect(router.pathname).toEqual('/');
    await act(() =>
      userEvent.click(
        screen.getByRole('button', {
          name: translations.event.eventCard.ariaLabelLink.replace(
            '{{name}}',
            event.name.fi as string
          ),
        })
      )
    );
    expect(router.pathname).toEqual('/kurssit/123');
  });
});
