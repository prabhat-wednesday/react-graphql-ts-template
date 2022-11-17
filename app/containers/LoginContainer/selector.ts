import { createSelector } from 'reselect';
import get from 'lodash-es/get';
import { initialState } from './reducer';

export const selectLoginState = (state: any) => state.loginReducer || initialState;

export const selectIsUserLoggedIn = () => createSelector(selectLoginState, (substate) => get(substate, 'isLogin'));
export const selectUserData = () => createSelector(selectLoginState, (substate) => get(substate, 'userData'));
