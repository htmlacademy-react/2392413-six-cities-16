import { useState } from 'react';
import { cities } from '../const';
import { AppProps, CityEntity } from '../types';
import CityList from './city-list';
import Map from './map';
import PlaceCardList from './place-card-list';

function Main({ offersCount, offers }: AppProps): JSX.Element {
  const [currentCity, setCurrentCity] = useState(cities[0]);

  const handleCityClick = (city: CityEntity): void => {
    setCurrentCity(city);
  };

  const cityOffers = offers
    .filter((offer) => offer.city.name === currentCity.name)
    .slice(0, offersCount);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityList
            cities={cities}
            currentCity={currentCity}
            onCityClick={handleCityClick}
          />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {cityOffers.length} places to stay in {currentCity.name}
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <PlaceCardList offers={cityOffers} />
          </section>
          <div className="cities__right-section">
            <Map
              offers={cityOffers}
              city={currentCity}
              selectedOffer={undefined}
            />
            {/* <section className="cities__map map"></section>  */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
