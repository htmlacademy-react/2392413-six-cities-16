import { AuthorizationStatus, NameSpace } from '../../const';
import { getToken } from '../../services/token';
import { UserProcess } from '../../types/types';
import { makeFakeState, mockAuthInfo, mockLoginAuth } from '../../utils/mocks';
import { checkLoginAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('Users slice', () => {
  const state: UserProcess = makeFakeState()[NameSpace.User];

  it('should set token, profile and authorizationStatus=Auth with checkLoginAction.fulfilled action', () => {
    const result = userProcess.reducer(
      state,
      checkLoginAction.fulfilled(mockAuthInfo, '', undefined)
    );
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userProfile).not.toBeNull();
    expect(getToken()).toEqual(mockAuthInfo.token);
  });

  it('should set profile=null and authorizationStatus=NoAuth with checkLoginAction.rejected action', () => {
    const result = userProcess.reducer(state, checkLoginAction.rejected);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userProfile).toBeNull();
  });

  it('should set profile=null and authorizationStatus=NoAuth with checkLoginAction.rejected action', () => {
    const result = userProcess.reducer(state, checkLoginAction.rejected);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userProfile).toBeNull();
  });

  it('should set token, profile and authorizationStatus=Auth with loginAction.fulfilled action', () => {
    const result = userProcess.reducer(
      state,
      loginAction.fulfilled(mockAuthInfo, '', mockLoginAuth)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userProfile).not.toBeNull();
    expect(getToken()).toEqual(mockAuthInfo.token);
  });

  it('should set profile=null and authorizationStatus=NoAuth with loginAction.rejected action', () => {
    const result = userProcess.reducer(state, loginAction.rejected);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userProfile).toBeNull();
  });

  it('should reset token and profile and set authorizationStatus=NoAuth with logoutAction.fulfilled action', () => {
    const result = userProcess.reducer(state, logoutAction.fulfilled);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userProfile).toBeNull();
    expect(getToken()).toEqual('');
  });
});
