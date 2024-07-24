import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../components/login-form';
import { AppRoute, AuthorizationStatus, Cities } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setCurrentCity } from '../store/action';
import { getRandomArrayElement } from '../utils';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }
  const city = getRandomArrayElement(Cities);
  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <LoginForm />
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={AppRoute.Main}
              onClick={() => {
                dispatch(setCurrentCity(city));
              }}
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
