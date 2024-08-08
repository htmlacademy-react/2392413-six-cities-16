import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory, MemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../components/history-route/history-route';
import { createAPI } from '../services/api';
import { State } from '../types/types';
import { AppThunkDispatch } from './mocks';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>{component}</HelmetProvider>
    </HistoryRouter>
  );
}
type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

export function withStoreAndHistory(
  component: JSX.Element,
  initialState: Partial<State> = {},
  history?: MemoryHistory
): ComponentWithMockStore {
  const componentWithMockStore: ComponentWithMockStore = withStore(
    component,
    initialState
  );

  const componentWithMockStoreHistory = withHistory(
    componentWithMockStore.withStoreComponent,
    history
  );

  return {
    withStoreComponent: componentWithMockStoreHistory,
    mockStore: componentWithMockStore.mockStore,
    mockAxiosAdapter: componentWithMockStore.mockAxiosAdapter,
  };
}

export function renderWithStoreAndHistoryComponent(
  component: JSX.Element,
  initialState: Partial<State> = {},
  history?: MemoryHistory
): ComponentWithMockStore & RenderResult {
  const componentWithMockStore = withStoreAndHistory(
    component,
    initialState,
    history
  );
  const renderResult = render(componentWithMockStore.withStoreComponent);
  return { ...componentWithMockStore, ...renderResult };
}
