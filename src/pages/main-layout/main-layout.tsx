import classNames from 'classnames';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SignUser from '../../components/sign-user/sign-user';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavoriteOffersCount } from '../../store/offer-process/selectors';
import { getIsAuthUser } from '../../store/user-process/selectors';

function MainLayout(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthUser = useAppSelector(getIsAuthUser);
  useEffect(() => {
    if (isAuthUser) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [dispatch, isAuthUser]);

  const { pathname } = useLocation();
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);
  const isLoginForm = pathname === String(AppRoute.Login);
  const isFavoritePage = pathname === String(AppRoute.Favorites);
  const isOfferPage = pathname.startsWith(
    String(AppRoute.Offer).replace('/:id', '')
  );
  const isEmptyFavoritePage = !favoriteOffersCount && isFavoritePage;
  const isGrayPage =
    pathname === String(AppRoute.Main) || pathname === String(AppRoute.Login);
  const isMainPage = pathname === String(AppRoute.Main);

  return (
    <div
      className={classNames('page', {
        'page--main': isMainPage,
        'page--favorites-empty': isEmptyFavoritePage,
        'page--gray': isGrayPage,
        'page--login': isLoginForm,
        'page__main--offer': isOfferPage,
      })}
    >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to={AppRoute.Main}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            {!isLoginForm && <SignUser />}
          </div>
        </div>
      </header>
      <Outlet />
      {isFavoritePage && (
        <footer className="footer">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </a>
        </footer>
      )}
    </div>
  );
}

export default MainLayout;
