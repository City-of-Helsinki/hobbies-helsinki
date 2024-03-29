import userEvent from '@testing-library/user-event';
import React from 'react';

import { act, render, screen } from '../../../../../tests/testUtils';
import TextFilter from '../TextFilter';

const props = {
  onRemove: jest.fn(),
  text: 'text',
};

it('matches snapshot', () => {
  const { container } = render(<TextFilter {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', async () => {
  const onClickMock = jest.fn();
  render(<TextFilter {...props} onRemove={onClickMock} />);

  expect(screen.queryByText(`${props.text}`)).toBeInTheDocument();

  await act(() => userEvent.click(screen.getByRole('button')));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(props.text, 'text');
});
