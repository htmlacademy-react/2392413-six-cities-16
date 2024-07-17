import { OfferEntity } from '../types';
import PlaceCard from './place-card';

type NearbyOffersProps = {
  offers: OfferEntity[];
  onActiveOfferChange: React.Dispatch<React.SetStateAction<OfferEntity | null>>;
};

function NearbyOffers(props: NearbyOffersProps): JSX.Element {
  const { offers, onActiveOfferChange } = props;

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer: OfferEntity) => (
          <PlaceCard
            offer={offer}
            key={offer.id}
            onActiveOfferChange={onActiveOfferChange}
            baseClass="near-places"
          />
        ))}
      </div>
    </section>
  );
}

export default NearbyOffers;
