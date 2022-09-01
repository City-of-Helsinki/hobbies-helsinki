import { IconStar } from 'hds-react';
import React from 'react';

import { fakePlaces } from '../../../../tests/mockDataUtils';
import {
  waitFor,
  actWait,
  render,
  screen,
  userEvent,
  act,
} from '../../../../tests/testUtils';
import apolloClient from '../../../clients/eventsApolloClient';
import {
  PlaceDetailsDocument,
  PlaceListDocument,
} from '../../../nextApi/graphql/generated/graphql';
import PlaceSelector from '../PlaceSelector';

const variables = {
  divisions: ['kunta:helsinki'],
  hasUpcomingEvents: true,
  pageSize: 10,
  text: '',
};

const placeNames = [
  'Annantalo',
  'Kallion kirjasto',
  'Kanneltalo',
  'Keskustakirjasto Oodi',
  'Vuosaaren kirjasto',
  'Stoa',
  'Suomen Kansallisteatteri',
  'Töölön kirjasto',
];

const places = fakePlaces(
  placeNames.length,
  placeNames.map((place) => ({
    id: place,
    name: {
      fi: place,
    },
  }))
);

const placesResponse = { data: { placeList: places } };

const searchWord = 'malmi';

const filteredPlaceNames = [
  'Malmin kirjasto',
  'Malmin toimintakeskus',
  'Malminkartanon kirjasto',
  'Malmitalo',
];

const filteredPlaces = fakePlaces(
  filteredPlaceNames.length,
  filteredPlaceNames.map((place) => ({
    id: place,
    name: {
      fi: place,
    },
  }))
);

const filteredPlacesResponse = { data: { placeList: filteredPlaces } };

const placeId = places.data[0].id as string;
const placeName = places.data[0].name?.fi as string;
const placeDetailsResponse = { data: { placeDetails: places.data[0] } };

const mocks = [
  {
    request: {
      query: PlaceListDocument,
      variables,
    },
    result: placesResponse,
  },
  {
    request: {
      query: PlaceListDocument,
      variables: { ...variables, text: searchWord },
    },
    result: filteredPlacesResponse,
  },
  {
    request: {
      query: PlaceDetailsDocument,
      variables: { id: placeId },
    },
    result: placeDetailsResponse,
  },
];

const defaultProps = {
  checkboxName: 'places_checkbox',
  icon: <IconStar />,
  name: 'place',
  onChange: jest.fn(),
  showSearch: true,
  title: 'Tapahtumapaikka',
  value: [],
};

test('should filter place options', async () => {
  render(<PlaceSelector {...defaultProps} />, {
    mocks,
  });
  await actWait();
  await act(() =>
    userEvent.click(screen.getByRole('button', { name: /tapahtumapaikka/i }))
  );

  userEvent.type(
    screen.getByRole('textbox', {
      name: /tapahtumapaikka kirjoita hakusana/i,
    }),
    // uppercase to test case insesitivity
    searchWord.toUpperCase()
  );

  await waitFor(() => {
    expect(
      screen.getByRole('checkbox', { name: filteredPlaceNames[0] })
    ).toBeInTheDocument();
  });

  filteredPlaceNames.forEach((place) => {
    expect(screen.getByRole('checkbox', { name: place })).toBeInTheDocument();
  });
});

test('should render selected value correctly', async () => {
  jest.spyOn(apolloClient, 'readQuery').mockReturnValue(placeDetailsResponse);
  render(<PlaceSelector {...defaultProps} value={[placeId]} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.getByText(placeName)).toBeInTheDocument();
  });
});

test('should render selected value correctly when getPlaceDetailsFromCache fails', async () => {
  render(<PlaceSelector {...defaultProps} value={[placeId]} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.getByText(placeName)).toBeInTheDocument();
  });
});
