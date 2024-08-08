import classNames from 'classnames';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Setting } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchNearbyOfferAction,
  fetchOfferDetailAction,
} from '../../store/api-actions';
import { getNearbyOffers, getOffer } from '../../store/offer-process/selectors';
import { capitalizeFirsLetter } from '../../utils/utils';
import FavoriteButton from '../favorite-button/favorite-button';
import Loader from '../loader/loader';
import Map from '../map/map';
import NearbyOffers from '../nearby-offers/nearby-offers';
import OfferReview from '../offer-review/offer-review';
import Page404 from '../page404/page404';
import RatingStars from '../rating-stars/rating-stars';

function Offer(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferDetailAction({ id }));
    dispatch(fetchNearbyOfferAction({ id }));
  }, [dispatch, id]);

  const nearbyOffers = useAppSelector(getNearbyOffers).slice(
    0,
    Setting.maxOutputNearbyOffers
  );
  const offer = useAppSelector(getOffer);

  if (!id) {
    return <Page404 />;
  }

  return offer ? (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images
            .slice(0, Setting.maxOutputOfferDetailImages)
            .map((image, index) => {
              const keyValue = `${index}-image`;
              return (
                <div className="offer__image-wrapper" key={keyValue}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {offer.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{offer.title}</h1>
            <FavoriteButton
              baseClass="offer"
              isFavorite={offer.isFavorite}
              id={offer.id}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
            </FavoriteButton>
          </div>
          <div className="offer__rating rating">
            <RatingStars baseClass="offer" rating={offer.rating}>
              <span className="offer__rating-value rating__value">
                {offer.rating}
              </span>
            </RatingStars>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {capitalizeFirsLetter(offer.type)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {offer.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {offer.maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">€{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&amp;s inside</h2>
            <ul className="offer__inside-list">
              {offer.goods.map((good) => (
                <li className="offer__inside-item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">{offer.title}</h2>
            <div className="offer__host-user user">
              <div
                className={classNames(
                  'offer__avatar-wrapper',
                  'user__avatar-wrapper',
                  {
                    'offer__avatar-wrapper--pro': offer.host.isPro,
                  }
                )}
              >
                <img
                  className="offer__avatar user__avatar"
                  src={offer.host.avatarUrl}
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name">{offer.host.name}</span>
              {offer.host.isPro && (
                <span className="offer__user-status">Pro</span>
              )}
            </div>
            <div className="offer__description">
              <p className="offer__text">{offer.description}</p>
            </div>
          </div>
          <OfferReview />
        </div>
      </div>

      {nearbyOffers && (
        <>
          <Map
            currentOffer={offer}
            offers={[offer, ...nearbyOffers]}
            city={offer.city}
            baseClass="offer"
          />
          <div className="container">
            <NearbyOffers offers={nearbyOffers} />
          </div>
        </>
      )}
    </section>
  ) : (
    <Loader />
  );
}

export default Offer;
