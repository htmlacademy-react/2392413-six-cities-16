import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getFavoriteOffersCount } from '../../store/offer-process/selectors';
import {
  getIsAuthUser,
  getUserProfile,
} from '../../store/user-process/selectors';

function SignOut(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleLogoutClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to="" onClick={handleLogoutClick}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}

function SignIn(): JSX.Element {
  const userProfile = useAppSelector(getUserProfile);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);
  const isAuthUser = useAppSelector(getIsAuthUser);
  return (
    <li className="header__nav-item user">
      <Link
        className="header__nav-link header__nav-link--profile"
        to={AppRoute.Favorites}
      >
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        {isAuthUser && userProfile ? (
          <>
            <span className="header__user-name user__name">
              {userProfile.email}
            </span>
            <span className="header__favorite-count">
              {favoriteOffersCount}
            </span>
          </>
        ) : (
          <span className="header__login">Sign in</span>
        )}
      </Link>
    </li>
  );
}
function SignUser(): JSX.Element {
  const isAuthUser = useAppSelector(getIsAuthUser);
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <SignIn />
        {isAuthUser && <SignOut />}
      </ul>
    </nav>
  );
}

export default SignUser;
