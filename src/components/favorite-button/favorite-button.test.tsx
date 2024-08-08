import { fireEvent, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../const';
import { OfferEntity, State } from '../../types/types';
import { renderWithStoreAndHistoryComponent } from '../../utils/mock-component';
import { makeFakeState, makeFakeStore } from '../../utils/mocks';
import FavoriteButton from './favorite-button';

describe('Component: FavoriteButton', () => {
  let store: State;
  let testOffer: OfferEntity;

  beforeEach(() => {
    store = makeFakeStore(makeFakeState());
    store.USER.authorizationStatus = AuthorizationStatus.Auth;
    testOffer = store.DATA.offers[0];
  });

  it('should render correctly', () => {
    renderWithStoreAndHistoryComponent(
      <FavoriteButton
        baseClass="place-card"
        isFavorite={testOffer.isFavorite}
        id={testOffer.id}
      >
        <span>test</span>
      </FavoriteButton>,
      store
    );
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('on click should render correctly', () => {
    renderWithStoreAndHistoryComponent(
      <FavoriteButton
        baseClass="place-card"
        isFavorite={testOffer.isFavorite}
        id={testOffer.id}
      >
        <span>test</span>
      </FavoriteButton>,
      store
    );

    const handleClick = vi.fn(() => {
      testOffer.isFavorite = !testOffer.isFavorite;
    });

    const buttonElement = screen.getByRole('button');
    expect(buttonElement.onclick).not.toBeNull();

    buttonElement.onclick = handleClick;

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);

    renderWithStoreAndHistoryComponent(
      <FavoriteButton
        baseClass="place-card"
        isFavorite={testOffer.isFavorite}
        id={testOffer.id}
      >
        <span>test</span>
      </FavoriteButton>,
      store
    );
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });
});
