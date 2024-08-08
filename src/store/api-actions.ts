import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { setToken } from '../services/token';
import {
  AppDispatch,
  AuthInfo,
  OfferDetailEntity,
  OfferEntity,
  PostReview,
  ReviewEntity,
  State,
} from '../types/types';
import { clearFavoritesOffers } from './action';

type AsyncThunkPropWithAxios = {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  OfferEntity[],
  undefined,
  AsyncThunkPropWithAxios
>('fetchOffersAction', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferEntity[]>(APIRoute.Offers);

  return data;
});

export const fetchOfferDetailAction = createAsyncThunk<
  OfferDetailEntity,
  { id: string | undefined },
  AsyncThunkPropWithAxios
>('fetchOfferDetailAction', async ({ id }, { extra: api }) => {
  const { data } = await api.get<OfferDetailEntity>(`${APIRoute.Offers}/${id}`);

  return data;
});

export const fetchNearbyOfferAction = createAsyncThunk<
  OfferEntity[],
  { id: string | undefined },
  AsyncThunkPropWithAxios
>('fetchNearbyOfferAction', async ({ id }, { extra: api }) => {
  const { data } = await api.get<OfferEntity[]>(
    `${APIRoute.Offers}/${id}/nearby`
  );
  return data;
});

export const fetchFavoriteOffersAction = createAsyncThunk<
  OfferEntity[],
  undefined,
  AsyncThunkPropWithAxios
>('fetchFavoriteOffersAction', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferEntity[]>(APIRoute.Favorite);

  return data;
});

export const postFavoriteOfferAction = createAsyncThunk<
  OfferEntity,
  { id: string; isFavorite: boolean },
  AsyncThunkPropWithAxios
>('postFavoriteOfferAction', async ({ id, isFavorite }, { extra: api }) => {
  const { data } = await api.post<OfferEntity>(
    `${APIRoute.Favorite}/${id}/${Number(isFavorite)}`
  );
  return data;
});

export const fetchReviewAction = createAsyncThunk<
  ReviewEntity[],
  { id: string | undefined },
  AsyncThunkPropWithAxios
>('fetchReviewAction', async ({ id }, { extra: api }) => {
  const { data } = await api.get<ReviewEntity[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const PostReviewAction = createAsyncThunk<
  ReviewEntity,
  PostReview,
  AsyncThunkPropWithAxios
>('PostReviewAction', async ({ id, comment, rating }, { extra: api }) => {
  const { data } = await api.post<ReviewEntity>(`${APIRoute.Comments}/${id}`, {
    comment: comment,
    rating: rating,
  });
  return data;
});

export const checkLoginAction = createAsyncThunk<
  AuthInfo,
  undefined,
  AsyncThunkPropWithAxios
>('checkLoginAction', async (_arg, { extra: api }) => {
  const { data } = await api.get<AuthInfo>(APIRoute.Login);
  return data;
});

export type LoginAuth = {
  email: string;
  password: string;
};

export const loginAction = createAsyncThunk<
  AuthInfo,
  LoginAuth,
  AsyncThunkPropWithAxios
>('loginAction', async ({ email, password }, { dispatch, extra: api }) => {
  const requestBody: LoginAuth = {
    email: email,
    password: password,
  };

  const { data } = await api.post<AuthInfo>(APIRoute.Login, requestBody);
  setToken(data.token);
  dispatch(fetchOffersAction());
  dispatch(fetchFavoriteOffersAction());

  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkPropWithAxios
>('logoutAction', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dispatch(clearFavoritesOffers());
});
