import { ReviewEntity } from '../../types/types';
import RatingStars from '../rating-stars/rating-stars';

type OfferReviewItemProps = {
  review: ReviewEntity;
};
const reviewsTimeAsText = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(date);
};
function OfferReviewItem(props: OfferReviewItemProps): JSX.Element {
  const { review } = props;
  const date = new Date(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <RatingStars baseClass="reviews" rating={review.rating} />
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {reviewsTimeAsText(date)}
        </time>
      </div>
    </li>
  );
}

export default OfferReviewItem;
