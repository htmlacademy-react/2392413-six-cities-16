import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostReviewState, RatingTitle, Setting } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PostReviewAction } from '../../store/api-actions';
import { getPostReviewState } from '../../store/offer-process/selectors';
import { PostReview } from '../../types/types';
import Rating from '../rating/rating';

function OfferReviewForm(): JSX.Element {
  const { id } = useParams();
  const postReviewState = useAppSelector(getPostReviewState);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const dispatch = useAppDispatch();
  const isPostReviewSending = postReviewState === PostReviewState.Sending;

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!id) {
      return;
    }
    const data: PostReview = {
      id,
      comment: review,
      rating: rating,
    };

    dispatch(PostReviewAction(data));
  };

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(+evt.target.value);
  };

  const handleReviewTextChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(evt.target.value);
  };

  useEffect(() => {
    if (postReviewState === PostReviewState.Send) {
      setRating(0);
      setReview('');
    }
  }, [postReviewState]);

  const { minCommentLength, maxCommentLength } = Setting.review;
  const isSubmitButtonDisabled =
    !rating ||
    review.length < minCommentLength ||
    review.length > maxCommentLength ||
    isPostReviewSending;
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RatingTitle.map((ratingItem) => {
          const keyValue = `${ratingItem.mark}-rating`;
          return (
            <Rating
              rating={ratingItem}
              isDisabled={isPostReviewSending}
              key={keyValue}
              selectedRating={rating}
              onRatingChange={handleRatingChange}
            />
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        disabled={isPostReviewSending}
        onInput={handleReviewTextChange}
        data-testid="reviewElement"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{`${minCommentLength} characters`}</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewForm;
