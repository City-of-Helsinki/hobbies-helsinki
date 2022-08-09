import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';
import mockRouter from 'next-router-mock';

import { EventFieldsFragment } from '../../../../domain/nextApi/graphql/generated/graphql';
import { translations } from '../../../../tests/initI18n';
import { fakeEvent } from '../../../../tests/mockDataUtils';
import { act, render, screen } from '../../../../tests/testUtils';
import LargeEventCard from '../LargeEventCard';

const renderComponent = (event: EventFieldsFragment) =>
  render(<LargeEventCard event={event} />);

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

describe('large event card', () => {
  test('for accessibility violations', async () => {
    const event = fakeEvent() as EventFieldsFragment;
    const { container } = renderComponent(event);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should show buy button when event has an offer', async () => {
    const infoUrl = 'https://example.domain';
    global.open = jest.fn();
    const event = fakeEvent({
      offers: [
        {
          infoUrl: {
            fi: infoUrl,
          },
        },
      ],
    }) as EventFieldsFragment;
    renderComponent(event);

    const button = screen.getByRole('button', {
      name: /osta liput - linkki avautuu uudessa ikkunassa/i,
    });

    await act(() => userEvent.click(button));
    expect(global.open).toBeCalledWith(infoUrl);
  });

  test('should hide buy button when event is free', () => {
    const event = fakeEvent({
      offers: [
        {
          infoUrl: {
            fi: 'https://example.domain',
          },
          isFree: true,
        },
      ],
    }) as EventFieldsFragment;
    renderComponent(event);

    expect(
      screen.queryByRole('button', {
        name: /osta liput - linkki avautuu uudessa ikkunassa/i,
      })
    ).not.toBeInTheDocument();
  });

  test('should hide buy button when event is closed', () => {
    const event = fakeEvent({
      endTime: '2017-01-01',
      offers: [
        {
          infoUrl: {
            fi: 'https://example.domain',
          },
        },
      ],
      startTime: '2017-01-01',
    }) as EventFieldsFragment;

    renderComponent(event);

    expect(
      screen.queryByRole('button', {
        name: /osta liput - linkki avautuu uudessa ikkunassa/i,
      })
    ).not.toBeInTheDocument();
  });

  //TODO: fix, conditional only if Buy link is available
  test.skip('should go to event page by click Read more button', async () => {
    const event = fakeEvent({
      id: '123',
    }) as EventFieldsFragment;

    const { router } = renderComponent(event);

    expect(router.pathname).toEqual('/');

    await act(() =>
      userEvent.click(
        screen.getByRole('button', {
          name: translations.event.eventCard.ariaLabelReadMore.replace(
            '{{name}}',
            event.name.fi as string
          ),
        })
      )
    );

    expect(router.pathname).toEqual('/kurssit/123');
  });

  // Skipped, because this is not available after the Link-component is changed from react-router Link.
  test.skip('should go to event page by clicking event card', async () => {
    const event = fakeEvent({
      id: '123',
    }) as EventFieldsFragment;

    const { router } = renderComponent(event);

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
});
