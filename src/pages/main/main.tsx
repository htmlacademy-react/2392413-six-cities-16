import classNames from 'classnames';
import { useState } from 'react';
import CityList from '../../components/city-list/city-list';
import Map from '../../components/map/map';
import NoPlaces from '../../components/no-places/no-places';
import OfferSort from '../../components/offer-sort/offer-sort';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { CityName } from '../../const';
import { useAppSelector } from '../../hooks';
import {
  getCurrentCity,
  getCurrentCityOffers,
  getOffersCount,
} from '../../store/offer-process/selectors';
import { OfferEntity } from '../../types/types';

function Main(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  const cityOffers = useAppSelector(getCurrentCityOffers);
  const cityOffersCount = cityOffers.length;
  const offersCount = useAppSelector(getOffersCount);
  const [currentOffer, setCurrentOffer] = useState<OfferEntity | null>(null);

  return (
    <main
      className={classNames('page__main', 'page__main--index', {
        'page__main--index-empty': !offersCount,
      })}
      data-testid="mainPageElement"
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityList cities={CityName} />
        </section>
      </div>
      <div className="cities">
        {cityOffersCount ? (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentCity &&
                  `${cityOffersCount} ${
                    cityOffersCount > 1 ? 'places' : 'place'
                  } to stay in ${currentCity.name}`}
              </b>
              <OfferSort />
              <PlaceCardList onActiveOfferChange={setCurrentOffer} />
            </section>
            <div className="cities__right-section">
              <Map
                offers={cityOffers}
                city={currentCity}
                currentOffer={currentOffer}
                baseClass="cities"
              />
            </div>
          </div>
        ) : (
          <NoPlaces />
        )}
      </div>
    </main>
  );
}

export default Main;
