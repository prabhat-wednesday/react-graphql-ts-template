import React from 'react';
import { renderProvider, timeout } from '@app/utils/testUtils';
import FormInput from '..';
import { fireEvent } from '@testing-library/react';

describe('<FormInput/> component test', () => {
  const onChangeSpy = jest.fn();
  const FormInputProps = {
    label: 'Username',
    name: 'username',
    message: 'Please input your username!',
    onChange: onChangeSpy,
    required: true
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<FormInput {...FormInputProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should check if form input have data when onchange is fire', async () => {
    const { getByTestId } = renderProvider(<FormInput {...FormInputProps} />);
    const LoginInput = getByTestId('formInput');
    fireEvent.change(LoginInput, {
      target: { value: 'Prabhat' }
    });
    await timeout(500);
    expect(onChangeSpy).toBeCalled();
  });
});
