import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderProvider, timeout } from '@app/utils/testUtils';
import { requestGetUserData } from '../reducer';
import { LoginContainerTest as LoginContainer, LoginContainerProps, mapDispatchToProps } from '..';

describe('<LoginContainer tests', () => {
  let submitSpy: jest.Mock;
  let defaultProps: LoginContainerProps;
  beforeEach(() => {
    defaultProps = {
      dispatchUserData: submitSpy
    };
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LoginContainer {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should validate the mapDispatchToProps action', () => {
    const dispatchUserDataSpy = jest.fn();
    const payload = {
      username: 'Prabhat Singh',
      emailId: 'singhprabhat',
      password: 'qwerty1234'
    };
    const action = {
      dispatchUserData: requestGetUserData(payload)
    };
    const props = mapDispatchToProps(dispatchUserDataSpy);
    props.dispatchUserData(payload);
    expect(dispatchUserDataSpy).toHaveBeenCalledWith(action.dispatchUserData);
  });

  it('should render on the screen', () => {
    const { getByTestId } = renderProvider(<LoginContainer {...defaultProps} />);
    const LoginForm = getByTestId('loginForm');
    expect(LoginForm).toBeInTheDocument();
  });

  it('should check if form get submit after clicking on submit button', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getAllByTestId } = renderProvider(<LoginContainer dispatchUserData={submitSpy} />);
    const onFinishSpy = jest.fn();
    const LoginForm = getByTestId('loginForm');
    const LoginInputs = getAllByTestId('formInput') as HTMLInputElement[];
    LoginForm.onsubmit = onFinishSpy;

    fireEvent.change(LoginInputs[0], {
      target: { value: 'Prabhat Singh' }
    });
    fireEvent.change(LoginInputs[1], {
      target: { value: 'singhprabhat@gmail.com' }
    });
    fireEvent.change(LoginInputs[2], {
      target: { value: 'qwerty1234' }
    });
    fireEvent.submit(LoginForm);
    await timeout(500);
    expect(onFinishSpy).toBeCalled();
    expect(submitSpy).toBeCalled();
  });
});
