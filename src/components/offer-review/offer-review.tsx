import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Setting } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewAction } from '../../store/api-actions';
import { getReviews } from '../../store/offer-process/selectors';
import { getIsAuthUser } from '../../store/user-process/selectors';
import OfferReviewForm from '../offer-review-form/offer-review-form';
import OfferReviewItem from '../offer-review-item/offer-review-item';

function OfferReview(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthUser = useAppSelector(getIsAuthUser);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchReviewAction({ id }));
  }, [dispatch, id]);
  const reviews = useAppSelector(getReviews);

  const outputReviews = [...reviews]
    .sort(
      (nextReview, currentReview) =>
        Date.parse(currentReview.date) - Date.parse(nextReview.date)
    )
    .slice(0, Setting.review.maxOutputComments);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {outputReviews.map((review) => (
          <OfferReviewItem review={review} key={review.id} />
        ))}
      </ul>
      {isAuthUser && <OfferReviewForm />}
    </section>
  );
}

export default OfferReview;
