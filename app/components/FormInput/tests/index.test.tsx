import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import FormInput from '..';

describe('<FormInput/> component test', () => {
  const FormInputProps = {
    label: 'Username',
    name: 'username',
    message: 'Please input your username!'
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<FormInput {...FormInputProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
