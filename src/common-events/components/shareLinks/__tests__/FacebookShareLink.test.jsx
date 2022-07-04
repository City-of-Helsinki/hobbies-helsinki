import { render } from '@testing-library/react';
import React from 'react';

import FacebookShareLink from '../FacebookShareLink';

const renderComponent = (props) => render(<FacebookShareLink {...props} />);

test('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  const { getByLabelText } = renderComponent({ sharedLink });

  expect(getByLabelText(/Jaa Facebookissa/)).toBeInTheDocument();
});
