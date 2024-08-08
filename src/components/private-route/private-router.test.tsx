import { screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { renderWithStoreAndHistoryComponent } from '../../utils/mock-component';
import { makeFakeState } from '../../utils/mocks';
import PrivateRoute from './private-route';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;
  const state = makeFakeState();

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  const getComponent = (
    publicText: string,
    privateText: string
  ): JSX.Element => (
    <Routes>
      <Route path={AppRoute.Login} element={<span>{publicText}</span>} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <span>{privateText}</span>
          </PrivateRoute>
        }
      />
    </Routes>
  );

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    state.USER.authorizationStatus = AuthorizationStatus.NoAuth;

    renderWithStoreAndHistoryComponent(
      getComponent(expectedText, notExpectedText),
      state,
      mockHistory
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    state.USER.authorizationStatus = AuthorizationStatus.Auth;

    renderWithStoreAndHistoryComponent(
      getComponent(notExpectedText, expectedText),
      state,
      mockHistory
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
