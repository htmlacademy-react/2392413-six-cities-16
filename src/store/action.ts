import { createAction, PrepareAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortType } from '../const';
import { CityEntity, OfferEntity, UserLoginStatus } from '../types';

export const setCurrentCity = createAction<PrepareAction<CityEntity>>(
  'setCurrentCity',
  (city: CityEntity) => ({ payload: city })
);

export const setOffers = createAction<PrepareAction<OfferEntity[]>>(
  'setOffers',
  (offers: OfferEntity[]) => ({ payload: offers })
);

export const setCurrentSort = createAction<PrepareAction<SortType>>(
  'setCurrentSort',
  (sort: SortType) => ({ payload: sort })
);

export const setAuthorizationStatus = createAction<
  PrepareAction<AuthorizationStatus>
>('setAuthorizationStatus', (status: AuthorizationStatus) => ({
  payload: status,
}));

export const setOffersLoading = createAction<PrepareAction<boolean>>(
  'setOffersLoading',
  (isOffersLoading: boolean) => ({ payload: isOffersLoading })
);

export const setUserProfile = createAction<PrepareAction<UserLoginStatus>>(
  'setUserProfile',
  (user: UserLoginStatus) => ({ payload: user })
);
