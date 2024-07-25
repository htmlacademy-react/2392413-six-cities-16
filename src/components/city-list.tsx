import { Link } from 'react-router-dom';
import { Cities, CityName } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks/store';

import classNames from 'classnames';
import { setCurrentCity } from '../store/action';
import { getCurrentCity } from '../store/offer-process/selectors';
type CityListProps = {
  cities: typeof CityName;
};

function CityList(props: CityListProps): JSX.Element {
  const { cities } = props;
  const currentCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  const onCityClick = (cityName: string): void => {
    Cities.some((city) => {
      if (city.name === cityName) {
        dispatch(setCurrentCity(city));
      }
    });
  };
  return (
    <ul
      className="locations__list tabs__list"
      onClick={(evt) => {
        const targetElement = evt.target as HTMLFormElement;
        if (targetElement.children.length === 0) {
          onCityClick(targetElement.innerText);
        }
      }}
    >
      {Object.values(cities).map((city, index) => {
        const keyValue = `${index}-${city}`;
        const isCurrentCity = city.toString() === currentCity.name;
        return (
          <li className="locations__item" key={keyValue}>
            <Link
              className={classNames('locations__item-link', 'tabs__item', {
                'tabs__item--active': isCurrentCity,
              })}
              to="#"
            >
              <span>{city}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CityList;
