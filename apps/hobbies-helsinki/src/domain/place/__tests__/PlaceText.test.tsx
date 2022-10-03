import * as React from 'react';

import { fakePlace } from '../../../tests/mockDataUtils';
import { render, screen, waitFor } from '../../../tests/testUtils';
import { PlaceDetailsDocument } from '../../nextApi/graphql/generated/graphql';
import PlaceText from '../PlaceText';

const placeId = 'helsinki:123';
const name = 'Gräsan taitojen talo';

const place = fakePlace({ id: placeId, name: { fi: name } });
const placeResponse = {
  data: {
    placeDetails: place,
  },
};

const mocks = [
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: placeId,
      },
    },
    result: placeResponse,
  },
];

test('matches snapshot', async () => {
  const { container } = render(<PlaceText id={placeId} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  expect(container.firstChild).toMatchSnapshot();
});
