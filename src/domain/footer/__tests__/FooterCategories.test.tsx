import i18n from 'i18next';
import { axe } from 'jest-axe';
import React from 'react';

import { screen, render, userEvent, act } from '../../../tests/testUtils';
import FooterCategories from '../FooterCategories';

beforeEach(() => {
  i18n.changeLanguage('fi');
});

test('component should be accessible', async () => {
  const { container } = render(<FooterCategories />);

  expect(await axe(container)).toHaveNoViolations();
}, 7000);

test('should route to event search page by clicking category', async () => {
  const { router } = render(<FooterCategories />);

  await act(() =>
    userEvent.click(screen.getByRole('link', { name: /musiikki/i }))
  );

  expect(router.pathname).toMatchSnapshot();
});

//  TODO: It seems that hds Footer does not support logoLanguage yet
test.todo('should show Swedish logo');
// test("should show Swedish logo", async () => {
//   i18n.changeLanguage("sv");
//   render(<FooterCategories />);

//   await act(() =>
//     userEvent.click(screen.getByRole("link", { name: /musik/i }))
//   );

//   expect(screen.queryByRole("img")).toHaveClass("sv");
// });
