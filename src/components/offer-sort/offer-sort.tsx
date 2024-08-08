import classNames from 'classnames';
import { useState } from 'react';
import { SortList } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentSort } from '../../store/action';
import { getCurrentSort } from '../../store/offer-process/selectors';

function OfferSort(): JSX.Element {
  const [isSortListDropdown, setIsSortListDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(getCurrentSort);

  const handleSortChange = (
    evt: React.MouseEvent<HTMLUListElement, MouseEvent>
  ): void => {
    const targetElement = evt.target as HTMLFormElement;

    dispatch(setCurrentSort(targetElement.innerText));
    setIsSortListDropdown(false);
  };

  const handleSortClick = () => {
    setIsSortListDropdown(!isSortListDropdown);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortClick}
      >
        &nbsp;{currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options', 'places__options--custom', {
          'places__options--opened': isSortListDropdown,
        })}
        onClick={handleSortChange}
      >
        {Object.values(SortList).map((sort, index) => {
          const keyValue = `${index}-${sort}`;
          const activeClassName =
            currentSort === sort ? 'places__option--active' : '';
          return (
            <li
              key={keyValue}
              className={`places__option ${activeClassName}`}
              tabIndex={0}
            >
              {sort}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default OfferSort;
