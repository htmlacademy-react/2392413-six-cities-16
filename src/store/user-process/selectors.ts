import { NameSpace } from '../../const';
import { AuthInfo, State } from '../../types/types';
import { AuthorizationStatus } from './../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUserProfile = (state: State): AuthInfo | null =>
  state[NameSpace.User].userProfile;

export const getIsAuthUser = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
