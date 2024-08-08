import { useAppSelector } from '../../hooks';
import { getCurrentCity } from '../../store/offer-process/selectors';

function NoPlaces(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  return (
    <div className="cities__places-container container cities__places-container--empty">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in{' '}
            {currentCity.name}
          </p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
}

export default NoPlaces;
