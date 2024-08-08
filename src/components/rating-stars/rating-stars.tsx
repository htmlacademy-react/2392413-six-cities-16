import { getRatingPercent } from '../../utils/utils';
type RatingStarsProps = {
  rating: number;
  baseClass: string;
  children?: JSX.Element;
};
function RatingStars(props: RatingStarsProps): JSX.Element {
  const { rating, baseClass, children } = props;
  const ratingPercent = getRatingPercent(rating);

  return (
    <div className={`${baseClass}__rating rating`}>
      <div className={`${baseClass}__stars rating__stars`}>
        <span style={{ width: `${ratingPercent}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}

export default RatingStars;
