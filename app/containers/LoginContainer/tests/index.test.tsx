import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderProvider, timeout, renderWithIntl } from '@app/utils/testUtils';
import { requestGetUserData } from '../reducer';
import { LoginContainerTest as LoginContainer, LoginContainerProps, mapDispatchToProps } from '..';
import { translate } from '@app/components/IntlGlobalProvider';

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

  it('should check if error msg get print on the screen when input field is empty ', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getAllByTestId, getByText } = renderWithIntl(<LoginContainer dispatchUserData={submitSpy} />);
    const onFinishSpy = jest.fn();
    const LoginForm = getByTestId('loginForm');
    const LoginInputs = getAllByTestId('formInput') as HTMLInputElement[];
    LoginForm.onsubmit = onFinishSpy;

    fireEvent.change(LoginInputs[0], {
      target: { value: '' }
    });
    fireEvent.change(LoginInputs[1], {
      target: { value: '' }
    });
    fireEvent.change(LoginInputs[2], {
      target: { value: '' }
    });
    fireEvent.submit(LoginForm);
    await timeout(500);
    const ErrorMsg1 = getByText(translate('msg_1'));
    const ErrorMsg2 = getByText(translate('msg_2'));
    const ErrorMsg3 = getByText(translate('msg_3'));
    expect(ErrorMsg1).toBeInTheDocument();
    expect(ErrorMsg2).toBeInTheDocument();
    expect(ErrorMsg3).toBeInTheDocument();
  });
});
