import { StatusCodes } from 'http-status-codes';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import {
  AuthInfo,
  OfferDetailEntity,
  OfferProcess,
  State,
  UserProcess,
} from '../types/types';

import { LoginAuth } from '../store/api-actions';
import {
  AuthorizationStatus,
  Cities,
  NameSpace,
  PostReviewState,
  SortType,
} from './../const';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.Data]: <OfferProcess>{
    offers: [],
    offer: null,
    nearbyOffers: [],
    reviews: [],
    postReviewState: PostReviewState.Send,
    currentCity: Cities[0],
    favoriteOffers: [],
    currentSort: SortType.popular,
    isOffersLoading: false,
    isOfferLoading: false,
    isFavoriteOffersLoading: false,
    responseStatusCode: StatusCodes.PROCESSING,
  },
  [NameSpace.User]: <UserProcess>{
    authorizationStatus: AuthorizationStatus.Unknown,
    userProfile: null,
  },
  ...(initialState ?? {}),
});

export const mockOffer: OfferDetailEntity = {
  id: '7cf159bf-b59e-44ba-aca3-8598dd7fb2ec',
  title: 'Penthouse, 4-5 rooms + 5 balconies',
  description:
    'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  type: 'room',
  price: 234,
  images: [
    'https://16.design.htmlacademy.pro/static/hotel/14.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/18.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/5.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/6.jpg',
    'https://16.design.htmlacademy.pro/static/hotel/17.jpg',
  ],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16,
  },
  goods: [
    'Washing machine',
    'Fridge',
    'Kitchen',
    'Baby seat',
    'Heating',
    'Towels',
  ],
  host: {
    isPro: true,
    name: 'Angelina',
    avatarUrl:
      'https://16.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
  },
  isPremium: true,
  isFavorite: false,
  rating: 2.5,
  bedrooms: 1,
  maxAdults: 1,
};

export const mockLoginAuth: LoginAuth = {
  email: 'test@test.ru',
  password: 't1',
};

export const mockAuthInfo: AuthInfo = {
  avatarUrl: '/dev/null.img',
  email: 'test@test.ru',
  isPro: false,
  name: 'Test Test',
  token: 'TestToken#1',
};

export const makeFakeState = () => {
  const state = {
    [NameSpace.Data]: <OfferProcess>{
      offers: [],
      offer: null,
      nearbyOffers: [],
      reviews: [],
      postReviewState: PostReviewState.Send,
      currentCity: Cities[0],
      favoriteOffers: [],
      currentSort: SortType.popular,
      isOffersLoading: false,
      isOfferLoading: false,
      isFavoriteOffersLoading: false,
      responseStatusCode: StatusCodes.PROCESSING,
    },
    [NameSpace.User]: <UserProcess>{
      authorizationStatus: AuthorizationStatus.Unknown,
      userProfile: null,
    },
  };

  state[NameSpace.Data].offers = [
    {
      id: '7f0229b6-7339-46c2-9133-5626adba3759',
      title: 'Tile House',
      type: 'hotel',
      price: 340,
      previewImage: 'https://16.design.htmlacademy.pro/static/hotel/4.jpg',
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        },
      },
      location: {
        latitude: 48.868610000000004,
        longitude: 2.342499,
        zoom: 16,
      },
      isFavorite: false,
      isPremium: true,
      rating: 2.3,
    },
    {
      id: '8819b81e-bf95-4f03-a34e-e27006c5a77b',
      title: 'Waterfront with extraordinary view',
      type: 'room',
      price: 102,
      previewImage: 'https://16.design.htmlacademy.pro/static/hotel/13.jpg',
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        },
      },
      location: {
        latitude: 48.858610000000006,
        longitude: 2.330499,
        zoom: 16,
      },
      isFavorite: false,
      isPremium: false,
      rating: 1.8,
    },
    {
      id: '64f4401f-662c-4f50-b512-9ec83e2d163f',
      title: 'Beautiful & luxurious apartment at great location',
      type: 'room',
      price: 300,
      previewImage: 'https://16.design.htmlacademy.pro/static/hotel/6.jpg',
      city: {
        name: 'Dusseldorf',
        location: {
          latitude: 51.225402,
          longitude: 6.776314,
          zoom: 13,
        },
      },
      location: {
        latitude: 51.225402,
        longitude: 6.784314,
        zoom: 16,
      },
      isFavorite: true,
      isPremium: true,
      rating: 3.9,
    },
  ];

  state[NameSpace.Data].offer = mockOffer;
  state[NameSpace.Data].currentCity = Cities[0];
  state[NameSpace.Data].favoriteOffers = [state[NameSpace.Data].offers[2]];
  state[NameSpace.Data].nearbyOffers = [
    state[NameSpace.Data].offers[0],
    state[NameSpace.Data].offers[1],
  ];
  return state;
};
