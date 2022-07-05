import * as React from 'react';

import { DATE_TYPES } from '../../../../constants';
import { translations } from '../../../../tests/initI18n';
import {
  act,
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  escKeyPressHelper,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../tests/testUtils';
import DateSelector, { DateSelectorProps } from '../DateSelector';
import { testIds } from '../DateSelectorMenu';

const defaultProps: DateSelectorProps = {
  dateTypes: [],
  endDate: null,
  isCustomDate: false,
  name: 'date',
  onChangeDateTypes: jest.fn(),
  onChangeEndDate: jest.fn(),
  onChangeStartDate: jest.fn(),
  startDate: null,
  toggleIsCustomDate: jest.fn(),
};

const renderComponent = (props?: Partial<DateSelectorProps>) =>
  render(<DateSelector {...defaultProps} {...props} />);

test('should render selected date types when single option is selected', () => {
  renderComponent({ dateTypes: [DATE_TYPES.TODAY] });

  expect(
    screen.queryByText(translations.common.dateSelector.dateTypeToday)
  ).toBeInTheDocument();
});

test('should render selected date types when multiple options are selected', () => {
  renderComponent({ dateTypes: [DATE_TYPES.TOMORROW, DATE_TYPES.TODAY] });

  expect(
    screen.queryByText(`${translations.common.dateSelector.dateTypeToday} + 1`)
  ).toBeInTheDocument();
});

test('should add date type', async () => {
  const onChangeDateTypes = jest.fn();
  renderComponent({
    dateTypes: [],
    onChangeDateTypes,
  });

  const toggleButton = screen.getByRole('button', {
    name: translations.common.dateSelector.title,
  });

  await act(() => userEvent.click(toggleButton));
  expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();

  await act(() =>
    userEvent.click(
      screen.getByRole('checkbox', {
        name: translations.common.dateSelector.dateTypeToday,
      })
    )
  );

  expect(onChangeDateTypes).toBeCalledWith([DATE_TYPES.TODAY]);
});

test('should call toggleIsCustomDate function', async () => {
  const toggleIsCustomDate = jest.fn();
  renderComponent({
    dateTypes: [],
    toggleIsCustomDate,
  });

  const toggleButton = screen.getByRole('button', {
    name: translations.common.dateSelector.title,
  });

  await act(() => userEvent.click(toggleButton));
  expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();

  const customDatesButton = screen.getByRole('button', {
    name: translations.common.dateSelector.menu.buttonCustom,
  });
  await act(() => userEvent.click(customDatesButton));

  expect(toggleIsCustomDate).toHaveBeenCalled();
});

test('should remove date type', async () => {
  const onChangeDateTypes = jest.fn();
  renderComponent({
    dateTypes: [DATE_TYPES.TODAY, DATE_TYPES.TOMORROW],
    onChangeDateTypes,
  });

  const toggleButton = screen.getByRole('button', {
    name: translations.common.dateSelector.title,
  });

  await act(() => userEvent.click(toggleButton));
  expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();

  await act(() =>
    userEvent.click(
      screen.getByRole('checkbox', {
        name: translations.common.dateSelector.dateTypeToday,
      })
    )
  );

  expect(onChangeDateTypes).toBeCalledWith([DATE_TYPES.TOMORROW]);
});

describe('should open menu with', () => {
  const getClosedMenu = async () => {
    renderComponent();

    const toggleButton = screen.getByRole('button', {
      name: translations.common.dateSelector.title,
    });

    await act(() => userEvent.click(toggleButton));
    expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();

    escKeyPressHelper();

    await waitFor(() =>
      expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument()
    );
    expect(toggleButton).toHaveFocus();
  };

  test('ArrowDown', async () => {
    await getClosedMenu();

    arrowDownKeyPressHelper();

    expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();
  });

  test('ArrowUp', async () => {
    await getClosedMenu();

    arrowUpKeyPressHelper();

    expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();
  });
});
