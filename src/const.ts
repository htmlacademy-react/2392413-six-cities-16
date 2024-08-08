import { CityEntity } from './types/types';

export enum AppRoute {
  Main = '/',
  'Login' = '/login',
  'Favorites' = '/favorites',
  'Offer' = '/offer/:id',
  'Unknown' = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type RatingGrade = {
  title: string;
  mark: number;
};

export const RatingTitle: [
  RatingGrade,
  RatingGrade,
  RatingGrade,
  RatingGrade,
  RatingGrade
] = [
  {
    title: 'perfect',
    mark: 5,
  },
  {
    title: 'good',
    mark: 4,
  },
  {
    title: 'not bad',
    mark: 3,
  },
  {
    title: 'badly',
    mark: 2,
  },
  {
    title: 'terribly',
    mark: 1,
  },
];

export enum SortType {
  popular = 'Popular',
  priceLow2High = 'Price: low to high',
  priceHigh2Low = 'Price: high to low',
  topRatedFirst = 'Top rated first',
}

export const SortList: [SortType, SortType, SortType, SortType] = [
  SortType.popular,
  SortType.priceLow2High,
  SortType.priceHigh2Low,
  SortType.topRatedFirst,
];

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const Cities: [
  CityEntity,
  CityEntity,
  CityEntity,
  CityEntity,
  CityEntity,
  CityEntity
] = [
  {
    name: CityName.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  {
    name: CityName.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: CityName.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    name: CityName.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: CityName.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
];

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const Setting = {
  review: {
    minCommentLength: 50,
    maxCommentLength: 300,
    maxOutputComments: 10,
  },
  maxOutputNearbyOffers: 3,
  maxOutputOfferDetailImages: 6,
};

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}
export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export enum PostReviewState {
  Sending = 'Sending',
  Send = 'Send',
  Error = 'Error',
}
