import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderProvider, renderWithIntl } from '@app/utils/testUtils';
import DynamicStepForm from '..';

describe('<DynamicStepForm/> test', () => {
  const onClickSpy = jest.fn();
  const onSubmitSpy = jest.fn();
  const defaultProps = {
    formInput: { label: 'label_username', name: 'username', rules: [{ message: 'msg_for_username', required: true }] },
    handleSubmit: onSubmitSpy,
    handleFormInstance: onClickSpy
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<DynamicStepForm {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should submit the form when onsubmit is clicked', () => {
    const onFinishSpy = jest.fn();
    const { getByTestId } = renderProvider(<DynamicStepForm {...defaultProps} />);
    const loginForm = getByTestId('login-form');
    loginForm.onsubmit = onFinishSpy;
    fireEvent.submit(loginForm);
    expect(onFinishSpy).toBeCalled();
  });
});
