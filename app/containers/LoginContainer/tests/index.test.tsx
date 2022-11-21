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
    const LoginForm = getByTestId('login-form');
    expect(LoginForm).toBeInTheDocument();
  });

  it('should check if form get submit after clicking on submit button', async () => {
    const submitSpy = jest.fn();
    const { getByTestId } = renderProvider(<LoginContainer dispatchUserData={submitSpy} />);
    const onFinishSpy = jest.fn();
    const LoginForm = getByTestId('login-form');
    const LoginInputs = getByTestId('formInput');
    LoginForm.onsubmit = onFinishSpy;

    fireEvent.change(LoginInputs, {
      target: { value: 'Prabhat Singh' }
    });
    fireEvent.submit(LoginForm);
    await timeout(500);
    expect(onFinishSpy).toBeCalled();
    expect(submitSpy).toBeCalled();
  });

  it('should check if error msg get print on the screen when input field is empty ', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByText } = renderWithIntl(<LoginContainer dispatchUserData={submitSpy} />);
    const onFinishSpy = jest.fn();
    const LoginForm = getByTestId('login-form');
    const LoginInputs = getByTestId('formInput');
    LoginForm.onsubmit = onFinishSpy;

    fireEvent.change(LoginInputs, {
      target: { value: '' }
    });
    fireEvent.submit(LoginForm);
    await timeout(500);
    const ErrorMsg1 = getByText(translate('msg_for_username'));
    expect(ErrorMsg1).toBeInTheDocument();
  });

  it('should check next button get load on the screen currentIndex is zero', () => {
    const { getByRole } = renderWithIntl(<LoginContainer dispatchUserData={submitSpy} />);
    const NextButton = getByRole('button', { name: /Next/i });
    expect(NextButton).toBeInTheDocument();
    fireEvent.click(NextButton);
  });

  it('should check next button get load on the screen currentIndex is zero', () => {
    const { getByRole } = renderWithIntl(<LoginContainer dispatchUserData={submitSpy} />);
    const NextButton = getByRole('button', { name: /Next/i });
    expect(NextButton).toBeInTheDocument();
  });
});
