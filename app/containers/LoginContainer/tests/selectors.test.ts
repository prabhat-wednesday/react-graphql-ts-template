import { selectLoginState, selectIsUserLoggedIn, selectUserData } from '../selector';
import { initialState } from '@app/containers/LoginContainer/reducer';
import { RootState } from '@app/configureStore';

describe('Selector test', () => {
  let mockedState: RootState;
  let userData: {};
  let isLogin: boolean;

  beforeEach(() => {
    userData = {};
    isLogin = false;
    mockedState = {
      loginReducer: {
        userData,
        isLogin
      }
    };
  });

  it('should select the global state', () => {
    const selector = selectLoginState(mockedState);
    expect(selector).toEqual(mockedState.loginReducer);
  });

  it('should select the global state from initial state if state.loginReducer is not defined', () => {
    const selector = selectLoginState(initialState);
    expect(selector).toEqual(initialState);
  });

  it('should select the isLogin', () => {
    const songLoadingSelector = selectIsUserLoggedIn();
    expect(songLoadingSelector(mockedState)).toEqual(isLogin);
  });

  it('should select the userData', () => {
    const songDataSelector = selectUserData();
    expect(songDataSelector(mockedState)).toEqual(userData);
  });
});
