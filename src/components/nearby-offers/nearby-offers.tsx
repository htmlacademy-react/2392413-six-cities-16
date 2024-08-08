import { OfferEntity } from '../../types/types';
import PlaceCard from '../place-card/place-card';

type NearbyOffersProps = {
  offers: OfferEntity[];
};

function NearbyOffers(props: NearbyOffersProps): JSX.Element {
  const { offers } = props;

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer: OfferEntity) => (
          <PlaceCard offer={offer} key={offer.id} baseClass="near-places" />
        ))}
      </div>
    </section>
  );
}

export default NearbyOffers;
