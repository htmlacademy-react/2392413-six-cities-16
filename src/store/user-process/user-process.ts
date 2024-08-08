import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { dropToken, setToken } from '../../services/token';
import { UserProcess } from '../../types/types';
import { checkLoginAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userProfile: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkLoginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userProfile = action.payload;
        setToken(action.payload.token);
      })
      .addCase(checkLoginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userProfile = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userProfile = action.payload;
        setToken(action.payload.token);
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userProfile = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        dropToken();
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userProfile = null;
      });
  },
});
