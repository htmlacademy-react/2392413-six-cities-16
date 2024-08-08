import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postFavoriteOfferAction } from '../../store/api-actions';
import { getIsAuthUser } from '../../store/user-process/selectors';

type FavoriteButtonProps = {
  baseClass: string;
  id: string;
  isFavorite: boolean;
  children: JSX.Element;
};

function FavoriteButton(props: FavoriteButtonProps): JSX.Element {
  const { id, baseClass, children, isFavorite } = props;
  const dispatch = useAppDispatch();
  const isAuthUser = useAppSelector(getIsAuthUser);
  const navigate = useNavigate();

  const handleFavoriteButtonClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (!isAuthUser) {
      navigate(AppRoute.Login);
      return;
    }
    evt.stopPropagation();

    dispatch(
      postFavoriteOfferAction({
        id,
        isFavorite: !isFavorite,
      })
    );
  };

  return (
    <button
      className={classNames(`${baseClass}__bookmark-button`, 'button', {
        [`${baseClass}__bookmark-button--active`]: isFavorite,
      })}
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      {children}
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}
export default FavoriteButton;
