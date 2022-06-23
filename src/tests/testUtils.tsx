import { ApolloCache, InMemoryCache } from "@apollo/client/cache";
import { MockedResponse } from "@apollo/client/testing";
import { act, fireEvent, render, RenderResult } from "@testing-library/react";
import { createMemoryHistory, History } from "history";
import React, { ReactElement } from "react";

import wait from "waait";
import { createEventsApolloCache } from "../domain/clients/eventsApolloClient";
import router, { NextRouter } from "next/router";
import TestProviders from "./TestProviders";

type CustomRender = {
  (
    ui: React.ReactElement,
    options?: {
      mocks?: MockedResponse[];
      router?: Partial<NextRouter>;
      cache?: ApolloCache<{}> | InMemoryCache;
      routes?: string[];
      path?: string;
      history?: History;
    }
  ): CustomRenderResult;
};

export type CustomRenderResult = RenderResult & { history: History };

export const arrowUpKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 38, key: "ArrowUp" });

export const arrowDownKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 40, key: "ArrowDown" });

export const enterKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 13, key: "Enter" });

export const escKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 27, key: "Escape" });

export const tabKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 9, key: "Tab" });

const customRender: CustomRender = (
  ui: ReactElement,
  {
    mocks = [],
    router,
    routes = ["/"],
    history = createMemoryHistory({ initialEntries: routes }),
    cache = createEventsApolloCache(),
  } = {}
) => {
  const renderResult = render(ui, {
    wrapper: ({ children }) => (
      <TestProviders mocks={mocks} router={router} cache={cache}>
        {children}
      </TestProviders>
    ),
  });
  return { ...renderResult, history };
};

const renderWithRoute: CustomRender = (
  ui,
  {
    routes = ["/"],
    path = "/",
    history = createMemoryHistory({ initialEntries: routes }),
    mocks = [],
    cache = createEventsApolloCache(),
  } = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TestProviders mocks={mocks} router={router} cache={cache}>
      {children}
    </TestProviders>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  return { ...renderResult, history };
};

const actWait = (amount?: number): Promise<void> => act(() => wait(amount));

export { actWait, customRender as render, renderWithRoute };

// re-export everything
export * from "@testing-library/react";
export { render as defaultRender } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
