import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import FavoriteList from './favorite-list';
import Login from './login';
import Main from './main';
import MainLayout from './main-layout';
import Offer from './offer';
import Page404 from './page404';
import PrivateRoute from './private-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoriteList />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<Offer />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
