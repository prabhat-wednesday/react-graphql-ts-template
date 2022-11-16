import { createSlice } from '@reduxjs/toolkit';

export interface loginProviderState {
  userData: {};
  isLogin: boolean;
}

export const initialState: loginProviderState = {
  userData: {},
  isLogin: false
};

const LoginProviderSlice = createSlice({
  name: 'LoginProviderSlice',
  initialState,
  reducers: {
    requestGetUserData: (state, action) => {
      state.userData = action.payload;
      state.isLogin = true;
    },
    logoutUser: (state) => {
      state.userData = {};
      state.isLogin = false;
    }
  }
});

export const { requestGetUserData, logoutUser } = LoginProviderSlice.actions;

export default LoginProviderSlice.reducer;
