import * as React from 'react';

import { render } from '../../../../tests/testUtils';
import FilterButton from '../FilterButton';

test('matches snapshot', () => {
  const { container } = render(
    <FilterButton
      onRemove={jest.fn()}
      text="text"
      type="publisher"
      value="value"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
