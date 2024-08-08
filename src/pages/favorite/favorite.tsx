import classNames from 'classnames';
import { useEffect } from 'react';
import FavoriteEmpty from '../../components/favorite-empty/favorite-empty';
import PlaceCard from '../../components/place-card/place-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import {
  getFavoriteOffersByGroup,
  getFavoriteOffersCount,
} from '../../store/offer-process/selectors';

function Favorite(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);
  const favoriteOffersByGroup = useAppSelector(getFavoriteOffersByGroup);

  return (
    <main
      className={classNames('page__main', 'page__main--favorites', {
        'page__main--favorites-empty': !favoriteOffersCount,
      })}
    >
      <div className="page__favorites-container container">
        {favoriteOffersCount && favoriteOffersByGroup ? (
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(favoriteOffersByGroup).map((city) => (
                <li className="favorites__locations-items" key={`fav-${city}`}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffersByGroup[city].map((offer) => (
                      <PlaceCard
                        offer={offer}
                        key={offer.id}
                        baseClass="favorites"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <FavoriteEmpty />
        )}
      </div>
    </main>
  );
}

export default Favorite;
