import userEvent from '@testing-library/user-event';
import { utcToZonedTime } from 'date-fns-tz';
import { advanceTo } from 'jest-date-mock';
import React from 'react';

import {
  actWait,
  act,
  configure,
  render,
  screen,
} from '../../../../tests/testUtils';
import DateRangePicker, { DateRangePickerProps } from '../DateRangePicker';

configure({ defaultHidden: true });
const defaultProps: DateRangePickerProps = {
  endDate: null,
  onChangeEndDate: jest.fn(),
  onChangeStartDate: jest.fn(),
  startDate: null,
};

beforeEach(() => {
  jest.resetAllMocks();
  advanceTo('2020-10-10');
});
const renderComponent = (props?: Partial<DateRangePickerProps>) => {
  render(<DateRangePicker {...defaultProps} {...props} />);
};

describe('date range input', () => {
  test('should call onChangeEndDate', async () => {
    const endDate = new Date('2020-10-10');
    const onChangeEndDate = jest.fn();
    renderComponent({ endDate, onChangeEndDate });

    const endDateInput = screen.getByRole('textbox', {
      name: /loppumispäivä/i,
    });

    const endDateStr = '12.10.2020';
    userEvent.click(endDateInput);
    userEvent.clear(endDateInput);
    await act(async () => userEvent.type(endDateInput, endDateStr));

    const startDateInput = screen.getByRole('textbox', {
      name: /alkamispäivä/i,
    });
    await act(async () => userEvent.click(startDateInput));

    expect(onChangeEndDate).toBeCalledWith(
      utcToZonedTime(new Date('2020-10-12'), 'UTC')
    );
  });

  test('should call onChangeEndDate with clicking date', async () => {
    const endDate = new Date('2020-10-10');
    const onChangeEndDate = jest.fn();
    renderComponent({ endDate, onChangeEndDate });

    const endDateInput = screen.getByRole('textbox', {
      name: /loppumispäivä/i,
    });

    await act(async () => userEvent.click(endDateInput));
    await act(async () =>
      userEvent.click(
        screen.getAllByRole('button', { name: /valitse päivämäärä/i })[1]
      )
    );
    await act(async () =>
      userEvent.click(
        screen.getByRole('button', {
          name: /lokakuu 15/i,
        })
      )
    );
    // need to wait one useEffect cycle for date go take effect
    await actWait();

    const startDateInput = screen.getByRole('textbox', {
      name: /alkamispäivä/i,
    });
    await act(async () => userEvent.click(startDateInput));

    expect(onChangeEndDate).toBeCalledWith(
      utcToZonedTime(new Date('2020-10-15'), 'UTC')
    );
  });

  test('should call onChangeStartDate', async () => {
    const startDate = new Date('2020-10-10');
    const onChangeStartDate = jest.fn();
    renderComponent({ startDate, onChangeStartDate });

    const startDateInput = screen.getByRole('textbox', {
      name: /alkamispäivä/i,
    });

    const startDateStr = '12.10.2020';

    userEvent.click(startDateInput);
    userEvent.clear(startDateInput);
    await act(async () => userEvent.type(startDateInput, startDateStr));

    const endDateInput = screen.getByRole('textbox', {
      name: /loppumispäivä/i,
    });
    await act(async () => userEvent.click(endDateInput));

    expect(onChangeStartDate).toBeCalledWith(
      utcToZonedTime(new Date('2020-10-12'), 'UTC')
    );
  });

  test('should call onChangeStartDate with clicking date', async () => {
    const startDate = new Date('2020-10-10');
    const onChangeStartDate = jest.fn();
    renderComponent({ startDate, onChangeStartDate });

    const startDateInput = screen.getByRole('textbox', {
      name: /alkamispäivä/i,
    });
    userEvent.click(startDateInput);

    await act(async () =>
      userEvent.click(
        screen.getAllByRole('button', { name: /valitse päivämäärä/i })[0]
      )
    );
    await act(async () =>
      userEvent.click(
        screen.getByRole('button', {
          name: /lokakuu 15/i,
        })
      )
    );

    const endDateInput = screen.getByRole('textbox', {
      name: /loppumispäivä/i,
    });
    await act(async () => userEvent.click(endDateInput));

    expect(onChangeStartDate).toBeCalledWith(
      utcToZonedTime(new Date('2020-10-15'), 'UTC')
    );
  });

  test('should show error start date must be before end date', async () => {
    renderComponent();

    const startDateInput = screen.getByRole('textbox', {
      name: /alkamispäivä/i,
    });
    await act(async () => userEvent.type(startDateInput, '23.6.2021'));

    const endDateInput = screen.getByRole('textbox', {
      name: /loppumispäivä/i,
    });
    await act(async () => userEvent.type(endDateInput, '22.6.2021'));

    await screen.findByText(/Alkamispäivän on oltava ennen loppumispäivää/i);

    userEvent.clear(endDateInput);
    await act(async () => userEvent.type(endDateInput, '24.6.2021'));

    expect(
      screen.queryByText(/Alkamispäivän on oltava ennen loppumispäivää/i)
    ).not.toBeInTheDocument();
  });

  /**
   * FIXME: Some reason why the HDS dateinput does not trigger handleStartDateValidation.
   * const startDateInput = screen.getByRole("textbox", {
   *  name: /alkamispäivä/i,
   * });
   * const endDateInput = screen.getByRole("textbox", {
   *  name: /loppumispäivä/i,
   * });
   * startDateInput.focus();
   * userEvent.clear(startDateInput);
   * userEvent.type(startDateInput, "23..2021");
   * userEvent.tab();
   * fireEvent.mouseUp(startDateInput);
   * endDateInput.focus();
   */
  test.todo('should show formatting error');
  // test.skip("should show formatting error", async () => {
  //   renderComponent();

  //   const startDateInput = screen.getByRole("textbox", {
  //     name: /alkamispäivä/i,
  //   });

  //   // Set invalid date as the input value
  //   await act(async () => {
  //     userEvent.type(startDateInput, "23..2021");
  //   });

  //   expect(
  //     screen.queryByText(/Päivämäärän on oltava muotoa pp\.kk\.vvvv/i)
  //   ).not.toBeInTheDocument();

  //   // should show error when focusing out of the element
  //   await act(async () => userEvent.tab());

  //   await screen.findByText(/Päivämäärän on oltava muotoa pp\.kk\.vvvv/i);

  //   // Error should disappear
  //   userEvent.clear(startDateInput);
  //   await act(async () => {
  //     userEvent.type(startDateInput, "23.6.2021");
  //   });
  //   // should show the possible error when focusing out of the element
  //   await act(async () => userEvent.tab());
  //   expect(
  //     screen.queryByText(/Päivämäärän on oltava muotoa pp\.kk\.vvvv/i)
  //   ).not.toBeInTheDocument();
  // });
});
