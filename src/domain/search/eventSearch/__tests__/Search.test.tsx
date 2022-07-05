import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';
import mockRouter from 'next-router-mock';

import {
  KeywordListDocument,
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../nextApi/graphql/generated/graphql';
import {
  fakeKeywords,
  fakeNeighborhoods,
  fakePlaces,
} from '../../../../tests/mockDataUtils';
import {
  act,
  actWait,
  configure,
  render,
  screen,
  userEvent,
} from '../../../../tests/testUtils';
import { additionalDivisions } from '../../../neighborhood/additionalDivisions';
import Search from '../AdvancedSearch';

configure({ defaultHidden: true });

const searchValue = 'jaz';
const keywords = fakeKeywords(2, [
  { name: { fi: 'Jazz' } },
  { name: { fi: 'musiikkiklubit' } },
]);
const keywordsResponse = { data: { keywordList: keywords } };

const neighborhoodsResponse = {
  data: { neighborhoodList: fakeNeighborhoods(10) },
};
const placesResponse = { data: { placeList: fakePlaces(10) } };

const mocks = [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 5,
        text: searchValue,
      },
    },
    result: keywordsResponse,
  },
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

const pathname = '/haku';
const search = '?text=jazz';
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = () =>
  render(<Search scrollToResultList={jest.fn()} />, {
    mocks,
    routes,
  });

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

afterAll(() => {
  clear();
});

test('for accessibility violations', async () => {
  const { container } = renderComponent();

  await actWait();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
}, 50000); // FIXME: Why does this take so long?

test('should clear all filters and search field', async () => {
  const { router } = renderComponent();

  expect(router).toMatchObject({ pathname, query: { text: 'jazz' } });

  const searchInput = screen.getByRole('textbox', { name: /mitä etsit\?/i });

  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /tyhjennä hakuehdot/i }))
  );

  expect(searchInput).toHaveValue('');
  expect(router).toMatchObject({ pathname, query: {} });
});

// TODO: There is a problem with the auto suggest menu options
test.todo('should change search query after clicking autosuggest menu item');
// test("should change search query after clicking autosuggest menu item", async () => {
//   const { router } = renderComponent();

//   const searchInput = screen.getByRole("textbox", { name: /mitä etsit\?/i });
//   await act(async () => userEvent.type(searchInput, searchValue));

//   const option = await screen.findByRole("option", {
//     name: /musiikkiklubit/i,
//   });

//   await act(async () => userEvent.click(option));

//   expect(router).toMatchObject({
//     pathname,
//     query: { text: "jazz,musiikkiklubit" },
//   });

//   //  Should add menu item only once
//   await act(async () => userEvent.type(searchInput, searchValue));
//   act(async () =>
//     userEvent.click(screen.getByRole("option", { name: /musiikkiklubit/i }))
//   );

//   expect(router).toMatchObject({
//     pathname,
//     query: { text: "jazz,musiikkiklubit" },
//   });
// });

test('should change search query after checking is free checkbox', async () => {
  const { router } = renderComponent();

  const isFreeCheckbox = screen.getByRole('checkbox', {
    name: /näytä vain maksuttomat/i,
  });

  await act(async () => userEvent.click(isFreeCheckbox));

  expect(router).toMatchObject({
    pathname,
    query: { isFree: 'true', text: 'jazz' },
  });
});

test('should change search query after selecting today date type and pressing submit button', async () => {
  const { router } = renderComponent();

  const chooseDateButton = screen.getByRole('button', {
    name: /valitse ajankohta/i,
  });

  await act(async () => userEvent.click(chooseDateButton));
  await act(async () =>
    userEvent.click(screen.getByRole('checkbox', { name: /tänään/i }))
  );
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /hae/i }))
  );
  expect(router).toMatchObject({
    pathname,
    query: { dateTypes: 'today', text: 'jazz' },
  });
});

test('should change search query after selecting start date and pressing submit button', async () => {
  advanceTo('2020-10-04');
  const { router } = renderComponent();

  const chooseDateButton = screen.getByRole('button', {
    name: /valitse ajankohta/i,
  });
  await act(async () => userEvent.click(chooseDateButton));
  await act(async () =>
    userEvent.click(
      // The reason to use getAllByRole is that there is also mobile date selector with same text,
      // which is hidden using css
      screen.getAllByRole('button', { name: /valitse päivät/i })[0]
    )
  );
  await act(async () =>
    userEvent.click(
      screen.getAllByRole('button', { name: /valitse päivämäärä/i })[0]
    )
  );
  await act(async () =>
    userEvent.click(
      screen.getByRole('button', {
        name: /lokakuu 6/i,
      })
    )
  );
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /hae/i }))
  );
  expect(router).toMatchObject({
    pathname,
    query: { start: '2020-10-06', text: 'jazz' },
  });
}, 50000); // FIXME: Why does this take so long to test?

test('should change search query after clicking category menu item', async () => {
  const { router } = renderComponent();

  const chooseCategoryButton = screen.getByRole('button', {
    name: /valitse kategoria/i,
  });

  await act(async () => userEvent.click(chooseCategoryButton));
  await act(async () =>
    userEvent.click(screen.getByRole('checkbox', { name: /elokuva ja media/i }))
  );
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /hae/i }))
  );

  expect(router).toMatchObject({
    pathname,
    asPath: `${pathname}?categories=movie_and_media&text=jazz`,
    query: { categories: 'movie_and_media', text: 'jazz' },
  });

  //multiple selection
  await act(async () => userEvent.click(chooseCategoryButton));
  userEvent.click(screen.getByRole('checkbox', { name: /pelit/i }));
  await act(async () =>
    userEvent.click(screen.getByRole('checkbox', { name: /musiikki/i }))
  );
  await act(() =>
    userEvent.click(screen.getByRole('button', { name: /hae/i }))
  );

  expect(router).toMatchObject({
    pathname,
    asPath: `${pathname}?categories=movie_and_media%2Cgames%2Cmusic&text=jazz`,
    query: { categories: 'movie_and_media,games,music', text: 'jazz' },
  });
});

// TODO: SKipped since there is no divisions input at the moment, but I've heard it should be there
test.skip('disivions dropdown has additional divisions', async () => {
  renderComponent();

  const chooseCategoryButton = screen.getByRole('button', {
    name: /etsi alue/i,
  });
  await act(() => userEvent.click(chooseCategoryButton));

  additionalDivisions.forEach((divisionName) => {
    expect(
      screen.getByRole('checkbox', {
        name: divisionName.name.fi,
      })
    ).toBeInTheDocument();
  });
});
