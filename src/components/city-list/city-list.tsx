import { Link } from 'react-router-dom';
import { Cities, CityName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';

import classNames from 'classnames';
import { setCurrentCity } from '../../store/action';
import { getCurrentCity } from '../../store/offer-process/selectors';
type CityListProps = {
  cities: typeof CityName;
};

function CityList(props: CityListProps): JSX.Element {
  const { cities } = props;
  const currentCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  const handleCityClick = (
    evt: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    const targetElement = evt.target as HTMLFormElement;
    if (!targetElement.children.length) {
      const selectCityName = targetElement.innerText;

      Cities.some((city) => {
        if (city.name === selectCityName) {
          dispatch(setCurrentCity(city));
        }
      });
    }
  };
  return (
    <ul className="locations__list tabs__list" onClick={handleCityClick}>
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
