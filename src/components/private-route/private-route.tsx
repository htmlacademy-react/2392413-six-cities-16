import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getIsAuthUser } from '../../store/user-process/selectors';

export type PrivateRouteProps = {
  children: JSX.Element;
};
function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const isAuthUser = useAppSelector(getIsAuthUser);
  return isAuthUser ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
