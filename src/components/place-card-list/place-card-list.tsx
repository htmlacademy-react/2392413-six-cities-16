import { useAppSelector } from '../../hooks';
import { getOrderedCityOffers } from '../../store/offer-process/selectors';
import { OfferEntity } from '../../types/types';
import PlaceCard from '../place-card/place-card';

type PlaceCardListProps = {
  onActiveOfferChange: (offer: OfferEntity | null) => void;
};

function PlaceCardList(props: PlaceCardListProps): JSX.Element {
  const { onActiveOfferChange } = props;
  const offers = useAppSelector(getOrderedCityOffers);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer: OfferEntity) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onActiveOfferChange={onActiveOfferChange}
          baseClass="cities"
        />
      ))}
    </div>
  );
}
export default PlaceCardList;
