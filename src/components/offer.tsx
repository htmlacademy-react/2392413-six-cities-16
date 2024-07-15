import { offers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { OfferEntity } from '../types';
import { getRatingPercent } from '../utils';
import Map from './map';
import OfferReviewForm from './offer-review-form';
import OfferReviewList from './offer-review-list';

type OfferProps = {
  offer: OfferEntity;
};

function Offer(props: OfferProps): JSX.Element {
  const { offer } = props;
  const ratingPercent = getRatingPercent(offer.rating);

  const nearbyOffers = offers
    .filter(
      (nearbyOffer) =>
        nearbyOffer.city.name === offer.city.name && nearbyOffer.id !== offer.id
    )
    .slice(1, 4);

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/room.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/apartment-01.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/apartment-02.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/apartment-03.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/studio-01.jpg"
              alt="Photo studio"
            />
          </div>
          <div className="offer__image-wrapper">
            <img
              className="offer__image"
              src="img/apartment-01.jpg"
              alt="Photo studio"
            />
          </div>
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
            <button
              className={'offer__bookmark-button button'.concat(
                offer.isFavorite ? ' offer__bookmark-button--active' : ' '
              )}
              type="button"
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">
                {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
              </span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${ratingPercent}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">
              {offer.rating}
            </span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {offer.type}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              3 Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max 4 adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">€{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&amp;s inside</h2>
            <ul className="offer__inside-list">
              <li className="offer__inside-item">Wi-Fi</li>
              <li className="offer__inside-item">Washing machine</li>
              <li className="offer__inside-item">Towels</li>
              <li className="offer__inside-item">Heating</li>
              <li className="offer__inside-item">Coffee machine</li>
              <li className="offer__inside-item">Baby seat</li>
              <li className="offer__inside-item">Kitchen</li>
              <li className="offer__inside-item">Dishwasher</li>
              <li className="offer__inside-item">Cabel TV</li>
              <li className="offer__inside-item">Fridge</li>
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img
                  className="offer__avatar user__avatar"
                  src="img/avatar-angelina.jpg"
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name">Angelina</span>
              <span className="offer__user-status">Pro</span>
            </div>
            <div className="offer__description">
              <p className="offer__text">
                A quiet cozy and picturesque that hides behind a a river by the
                unique lightness of Amsterdam. The building is green and from
                18th century.
              </p>
              <p className="offer__text">
                An independent House, strategically located between Rembrand
                Square and National Opera, but where the bustle of the city
                comes to rest in this alley flowery and colorful.
              </p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">
              Reviews ·{' '}
              <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <OfferReviewList reviews={reviews} />
            <OfferReviewForm />
          </section>
        </div>
      </div>
      <Map
        offers={nearbyOffers}
        city={offer.city}
        currentOffer={null}
        mapClass="offer__map"
      />
    </section>
  );
}

export default Offer;
