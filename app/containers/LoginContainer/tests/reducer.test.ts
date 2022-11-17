import LoginReducer, { requestGetUserData, logoutUser, loginProviderState, initialState } from '../reducer';

describe('<LoginContainer test', () => {
  let state: loginProviderState;
  beforeEach(() => {
    state = initialState;
  });

  it('should render the initial state', () => {
    expect(
      LoginReducer(undefined, {
        type: undefined
      })
    ).toEqual(state);
  });

  it('should return the initial state when an actual action of type REQUEST_GET_USER_DATA action is dispatch', () => {
    const payload = {
      username: 'Prabhat Singh',
      emailId: 'singhprabhat@gmail.com',
      password: 'qwerty1234'
    };
    const expectedState = { ...state, isLogin: true, userData: payload };
    expect(LoginReducer(state, requestGetUserData(payload))).toEqual(expectedState);
  });

  it('should execute an action of type LOGOUT_USER ', () => {
    const expectedState = { ...state, isLogin: false, userData: {} };
    expect(LoginReducer(state, logoutUser)).toEqual(expectedState);
  });
});
