import { axe } from 'jest-axe';
import React from 'react';
import wait from 'waait';

import { translations } from '../../../../tests/initI18n';
import {
  actWait,
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  enterKeyPressHelper,
  escKeyPressHelper,
  render,
  userEvent,
  waitFor,
  screen,
  fireEvent,
  act,
} from '../../../../tests/testUtils';
import MultiSelectDropdown, {
  MultiselectDropdownProps,
} from '../MultiSelectDropdown';

const onChange = jest.fn();
const options = [
  {
    text: 'Squirrel',
    value: 'value1',
  },
  {
    text: 'Elephant',
    value: 'value2',
  },
  {
    text: 'Dog',
    value: 'value3',
  },
];
const title = 'test title';
const inputPlaceholder = 'Kirjoita hakusana';

const defaultProps: MultiselectDropdownProps = {
  checkboxName: 'multiselect-dropdown',
  icon: <div />,
  inputPlaceholder,
  name: 'test MultiSelectDropdown',
  onChange,
  options,
  showSearch: true,
  title,
  value: [],
};
const renderComponent = (props?: Partial<MultiselectDropdownProps>) =>
  render(<MultiSelectDropdown {...defaultProps} {...props} />);

test('for accessibility violations', async () => {
  const { container } = renderComponent();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// FIXME: Skipped as trivial, but failing test
test.skip('should set focus to input after clicking toggle button', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  await act(async () => userEvent.click(toggleButton));

  await waitFor(() => {
    expect(screen.getByPlaceholderText(inputPlaceholder)).toHaveFocus();
  });
});

test('should filter results based on user search and options[].text field', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  await act(async () => userEvent.click(toggleButton));

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);
  await act(() => userEvent.type(searchInput, 'Ele'));

  expect(
    screen.queryByRole('checkbox', { name: 'Elephant' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('checkbox', { name: 'Dox' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('checkbox', { name: 'Squirrel' })
  ).not.toBeInTheDocument();
});

test('should reset keyboard navigation position after a new search', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });

  fireEvent.click(toggleButton);

  const searchInput = screen.getByPlaceholderText(inputPlaceholder);
  await act(async () => searchInput.focus());

  arrowDownKeyPressHelper();

  expect(
    screen.getByRole('checkbox', { name: options[0].text }).parentElement
      ?.parentElement
  ).toHaveClass('dropdownItem--isFocused');

  // Find something, then reset the search to ensure that all results are listed
  fireEvent.change(searchInput, { target: { value: 'Ele' } });
  fireEvent.change(searchInput, { target: { value: '' } });

  const allOptions = options.map(({ text }) => text);

  // No element should have focus
  allOptions.forEach((text) => {
    expect(
      screen.getByRole('checkbox', { name: text }).parentElement?.parentElement
    ).not.toHaveClass('dropdownItem--isFocused');
  });
});

describe('ArrowUp, ArrowDown', () => {
  test('should allow navigation with up and down arrows', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await act(async () => userEvent.click(toggleButton));

    arrowDownKeyPressHelper();
    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[1].text })?.parentElement
        ?.parentElement
    ).toHaveClass('dropdownItem--isFocused');

    arrowUpKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })?.parentElement
        ?.parentElement
    ).toHaveClass('dropdownItem--isFocused');
  });

  test('should select last item if the first keyboard navigation is button up', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await act(async () => userEvent.click(toggleButton));

    arrowUpKeyPressHelper();

    expect(
      screen.getByRole('checkbox', { name: options[options.length - 1].text })
        ?.parentElement?.parentElement
    ).toHaveClass('dropdownItem--isFocused');
  });

  test('should reset to start position when user goes up in the first member of the list', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await act(async () => userEvent.click(toggleButton));

    arrowDownKeyPressHelper();
    arrowUpKeyPressHelper();

    // No element should have focus
    options.forEach((option) => {
      expect(
        screen.getByRole('checkbox', { name: option.text }).parentElement
      ).not.toHaveClass('dropdownItem--isFocused');
    });
  });

  test('should reset to start position when user goes down from the last member of the list', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await act(async () => userEvent.click(toggleButton));

    // After async we have selected the last item, press down once more to reset the
    // selection.
    await actWait();

    // No element should have focus
    options.forEach((option) => {
      expect(
        screen.getByRole('checkbox', { name: option.text }).parentElement
      ).not.toHaveClass('dropdownItem--isFocused');
    });
  });
});

describe('Escape', () => {
  test('should close suggestions with escape', async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await act(async () => userEvent.click(toggleButton));

    // Check that we can find some of the content of the MultiSelectDropdown: this suggests
    // that it is open.
    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();

    escKeyPressHelper();

    // Assert that we can no longer find the menu content after we have pressed
    // Escape.
    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).not.toBeInTheDocument();
  });
});

test('should not open dropdown when user focuses toggle button', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  toggleButton.focus();

  expect(
    screen.queryByRole('checkbox', { name: options[0].text })
  ).not.toBeInTheDocument();
});

test('should open dropdown when user clicks on toggle button', async () => {
  renderComponent();

  const toggleButton = screen.getByRole('button', { name: title });
  await act(async () => userEvent.click(toggleButton));

  expect(
    screen.queryByRole('checkbox', { name: options[0].text })
  ).toBeInTheDocument();
});

test('should call onChange when clicking checkbox', async () => {
  const onChange = jest.fn();
  renderComponent({ onChange });

  const toggleButton = screen.getByRole('button', { name: title });
  await act(async () => userEvent.click(toggleButton));

  await act(async () =>
    userEvent.click(screen.getByRole('checkbox', { name: options[0].text }))
  );
  expect(onChange).toBeCalledWith([options[0].value]);
});

test('should uncheck option', async () => {
  const onChange = jest.fn();
  renderComponent({ onChange, value: [options[0].value] });

  const toggleButton = screen.getByRole('button', { name: title });
  await act(async () => userEvent.click(toggleButton));

  await act(async () =>
    userEvent.click(screen.getByRole('checkbox', { name: options[0].text }))
  );
  expect(onChange).toBeCalledWith([]);
});

test('should call onChange with empty array when clicking select all checkbox', async () => {
  const onChange = jest.fn();
  renderComponent({
    onChange,
    selectAllText: '',
    showSelectAll: true,
    value: [options[0].value],
  });

  const toggleButton = screen.getByRole('button', { name: title });
  await act(async () => userEvent.click(toggleButton));

  await act(async () =>
    userEvent.click(
      screen.getByRole('checkbox', {
        name: translations.common.multiSelectDropdown.selectAll,
      })
    )
  );
  expect(onChange).toBeCalledWith([]);
});

test('should show selected text for single value', async () => {
  renderComponent({ value: [options[0].value] });

  expect(await screen.findByText(options[0].text)).toBeInTheDocument();
});

test('should show selected text for single value 2', async () => {
  renderComponent({ value: [options[0].value, options[1].value] });

  expect(await screen.findByText(`${options[1].text} + 1`)).toBeInTheDocument();
});

describe('when dropdown has been closed, it should reopen with', () => {
  const getClosedInput = async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', { name: title });
    await act(async () => userEvent.click(toggleButton));

    escKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).not.toBeInTheDocument();

    expect(toggleButton).toHaveFocus();
  };

  test('Enter', async () => {
    await getClosedInput();

    enterKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });

  test('ArrowDown', async () => {
    await getClosedInput();

    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });

  test('ArrowUp', async () => {
    await getClosedInput();

    arrowDownKeyPressHelper();

    expect(
      screen.queryByRole('checkbox', { name: options[0].text })
    ).toBeInTheDocument();
  });
});
