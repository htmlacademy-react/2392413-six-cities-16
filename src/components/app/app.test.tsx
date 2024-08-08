import { screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/types';
import { renderWithStoreAndHistoryComponent } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import App from './app';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  let store: State;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    store = makeFakeStore();
  });

  it('should render "App" when user navigate to "/"', () => {
    store.USER.authorizationStatus = AuthorizationStatus.Auth;
    mockHistory.push(AppRoute.Main);
    renderWithStoreAndHistoryComponent(<App />, store, mockHistory);
    expect(screen.getByTestId('mainPageElement')).toBeInTheDocument();
  });

  it('should render "App" when user navigate to "/Login"', () => {
    store.USER.authorizationStatus = AuthorizationStatus.NoAuth;
    mockHistory.push(AppRoute.Login);
    renderWithStoreAndHistoryComponent(<App />, store, mockHistory);
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId('loginPageElement')).toBeInTheDocument();
  });

  it('should render "App" when user navigate to "/Favorites"', () => {
    store.USER.authorizationStatus = AuthorizationStatus.Auth;
    mockHistory.push(AppRoute.Favorites);
    renderWithStoreAndHistoryComponent(<App />, store, mockHistory);
    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
  });

  it('should render "App" when user navigate to "/404"', () => {
    store.USER.authorizationStatus = AuthorizationStatus.NoAuth;
    mockHistory.push('/notExistsRoute');
    renderWithStoreAndHistoryComponent(<App />, store, mockHistory);
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
