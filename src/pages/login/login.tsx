import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../../components/login-form/login-form';
import { AppRoute, Cities } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentCity } from '../../store/action';
import { getIsAuthUser } from '../../store/user-process/selectors';
import { getRandomArrayElement } from '../../utils/utils';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthUser = useAppSelector(getIsAuthUser);
  if (isAuthUser) {
    return <Navigate to={AppRoute.Main} />;
  }
  const city = getRandomArrayElement(Cities);

  const handleCityClick = () => {
    dispatch(setCurrentCity(city));
  };

  return (
    <main
      className="page__main page__main--login"
      data-testid="loginPageElement"
    >
      <div className="page__login-container container">
        <LoginForm />
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={AppRoute.Main}
              onClick={handleCityClick}
            >
              <span>{city.name}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
