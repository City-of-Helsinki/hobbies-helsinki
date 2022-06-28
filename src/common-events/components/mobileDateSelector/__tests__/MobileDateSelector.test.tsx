import userEvent from '@testing-library/user-event';
import React from 'react';

import { DATE_TYPES } from '../../../../constants';
import {
  act,
  actWait,
  arrowDownKeyPressHelper,
  arrowUpKeyPressHelper,
  escKeyPressHelper,
  render,
  screen,
  waitFor,
} from '../../../../tests/testUtils';
import MobileDateSelector from '../MobileDateSelector';
import { testIds } from '../MobileDateSelectorMenu';

const dateTypeOptions = [
  'Tänään',
  'Huomenna',
  'Viikonloppuna',
  'Tällä viikolla',
  'Valitse päivät',
];

const defaultProps = {
  dateTypes: [DATE_TYPES.TODAY, DATE_TYPES.WEEKEND],
  endDate: null,
  onChangeDateTypes: jest.fn(),
  onChangeEndDate: jest.fn(),
  onChangeStartDate: jest.fn(),
  startDate: null,
};

const renderComponent = (props?: any) =>
  render(<MobileDateSelector {...defaultProps} {...props} />);

test('should have correct date types selected', async () => {
  renderComponent();

  expect(screen.getByRole('button', { name: dateTypeOptions[0] })).toHaveClass(
    'isSelected'
  );
  expect(
    screen.getByRole('button', { name: dateTypeOptions[1] })
  ).not.toHaveClass('isSelected');
  expect(screen.getByRole('button', { name: dateTypeOptions[2] })).toHaveClass(
    'isSelected'
  );
  expect(
    screen.getByRole('button', { name: dateTypeOptions[3] })
  ).not.toHaveClass('isSelected');
  expect(
    screen.getByRole('button', { name: dateTypeOptions[4] })
  ).not.toHaveClass('isSelected');
});

test('should call onChangeDateTypes and unselect option', async () => {
  const onChangeDateTypes = jest.fn();
  renderComponent({ onChangeDateTypes });
  await act(() =>
    userEvent.click(screen.getByRole("button", { name: dateTypeOptions[0] }))
  );
  expect(onChangeDateTypes).toBeCalledWith([DATE_TYPES.WEEKEND]);
});

test('should call onChangeDateTypes and select option', async () => {
  const onChangeDateTypes = jest.fn();
  renderComponent({ onChangeDateTypes, dateTypes: [] });

  await act(() =>
    userEvent.click(screen.getByRole("button", { name: dateTypeOptions[0] }))
  );
  expect(onChangeDateTypes).toBeCalledWith([DATE_TYPES.TODAY]);
});

test('custom date type should be selected when startDate is selected', async () => {
  renderComponent({ startDate: new Date('2018-12-12') });

  expect(screen.getByRole('button', { name: dateTypeOptions[4] })).toHaveClass(
    'isSelected'
  );
});

test('custom date type should be selected when endDate is selected', async () => {
  renderComponent({ startDate: new Date('2018-12-12') });

  expect(screen.getByRole('button', { name: dateTypeOptions[4] })).toHaveClass(
    'isSelected'
  );
});

test("should close date selector menu with escape", async () => {
  renderComponent();
  await act(() =>
    userEvent.click(screen.getByRole("button", { name: /valitse päivät/i }))
  );

  // Check that menu is open
  await waitFor(() => {
    expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();
  });
  escKeyPressHelper();
  // Check that menu is closed
  expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument();
});

test("should close date selector menu with close button", async () => {
  renderComponent();
  await act(() =>
    userEvent.click(screen.getByRole("button", { name: /valitse päivät/i }))
  );
  // Check that menu is open
  await waitFor(() => {
    expect(screen.queryByTestId(testIds.menu)).toBeInTheDocument();
  });
  userEvent.click(screen.getByRole("button", { name: /sulje/i }));
  await actWait();
  // Check that menu is closed
  expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument();
});

describe("when menu has been closed, it should reopen with", () => {
  const renderClosedMenu = async () => {
    renderComponent();

    await act(() =>
      userEvent.click(screen.getByRole("button", { name: /valitse päivät/i }))
    );

    await waitFor(() => {
      expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
    });

    escKeyPressHelper();

    expect(screen.queryByTestId(testIds.menu)).not.toBeInTheDocument();

    arrowDownKeyPressHelper();

    expect(screen.getByTestId(testIds.menu)).toBeInTheDocument();
  };

  test("ArrowDown", async () => {
    await renderClosedMenu();

    arrowDownKeyPressHelper();

    await waitFor(() =>
      expect(screen.getByTestId(testIds.menu)).toBeInTheDocument()
    );
  });

  test('ArrowUp', async () => {
    renderClosedMenu();

    arrowUpKeyPressHelper();

    await waitFor(() =>
      expect(screen.getByTestId(testIds.menu)).toBeInTheDocument()
    );
  });
});
