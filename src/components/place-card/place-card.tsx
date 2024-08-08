import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { OfferEntity } from '../../types/types';
import { capitalizeFirsLetter } from '../../utils/utils';
import FavoriteButton from '../favorite-button/favorite-button';
import RatingStars from '../rating-stars/rating-stars';

type PlaceCardProps = {
  offer: OfferEntity;
  onActiveOfferChange?: (offer: OfferEntity | null) => void;
  baseClass: string;
};
function PlaceCard(props: PlaceCardProps): JSX.Element {
  const { offer, onActiveOfferChange, baseClass } = props;

  return (
    <article
      className={`${baseClass}__card place-card`}
      onMouseEnter={() => onActiveOfferChange && onActiveOfferChange(offer)}
      onMouseLeave={() => onActiveOfferChange && onActiveOfferChange(null)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${baseClass}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${baseClass}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            baseClass="place-card"
            isFavorite={offer.isFavorite}
            id={offer.id}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
          </FavoriteButton>
        </div>
        <RatingStars baseClass="place-card" rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', offer.id)}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeFirsLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
