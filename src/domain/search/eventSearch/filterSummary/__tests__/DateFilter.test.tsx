import userEvent from "@testing-library/user-event";
import React from "react";

import { screen, act, render } from "../../../../../tests/testUtils";
import DateFilter, { DateFilterProps } from "../DateFilter";

const props: DateFilterProps = {
  onRemove: jest.fn(),
  text: "text",
  type: "date",
  value: "value",
};

it("matches snapshot", () => {
  const { container, rerender } = render(<DateFilter {...props} />);

  expect(container.firstChild).toMatchSnapshot();

  rerender(<DateFilter {...props} text="" />);

  expect(container.firstChild).toMatchSnapshot();
});

it("calls onRemove callback when remove button is clicked", async () => {
  const onClickMock = jest.fn();
  render(<DateFilter {...props} onRemove={onClickMock} />);

  expect(screen.queryByText(props.text as string)).toBeInTheDocument();

  await act(() => userEvent.click(screen.getByRole("button")));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(props.value, props.type);
});
