import React from 'react';

import { render, screen } from '../../../../../tests/testUtils';
import SearchResultsContainer from '../SearchResultsContainer';

it.each<[number, string]>([
  [0, 'Valitsemillasi hakuehdoilla ei löytynyt yhtään harrastusta'],
  [1, 'Valitsemillasi hakuehdoilla löytyi vain vähän hakutuloksia.'],
  [4, 'Valitsemillasi hakuehdoilla löytyi vain vähän hakutuloksia.'],
])(
  'should return the proper results info text if %i %s results are found',
  (eventsCount, infoText) => {
    render(
      <SearchResultsContainer
        eventList={<div />}
        eventsCount={eventsCount}
        loading={false}
      />
    );
    expect(screen.getByText(`${eventsCount} hakutulosta`)).toBeInTheDocument();
    expect(screen.getByText(infoText)).toBeInTheDocument();
  }
);

it('should not return any results info if more than 5 or more results are found', async () => {
  render(
    <SearchResultsContainer
      eventList={<div />}
      eventsCount={5}
      loading={false}
    />
  );

  expect(screen.getByText('5 hakutulosta')).toBeInTheDocument();

  ['Siirry hakemaan tapahtumia'].forEach((actionButtonText) => {
    expect(
      screen.queryByRole('button', { name: actionButtonText })
    ).not.toBeInTheDocument();
  });
});
