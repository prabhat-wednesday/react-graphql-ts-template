import React from 'react';
import { renderProvider, renderWithIntl, timeout } from '@app/utils/testUtils';
import FormInput from '..';
import { fireEvent } from '@testing-library/react';
import { translate } from '@app/components/IntlGlobalProvider';

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
    const { baseElement } = renderWithIntl(<FormInput {...FormInputProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should match the label name present in the FormInput ', () => {
    const { getByLabelText } = renderWithIntl(<FormInput {...FormInputProps} />);
    expect(getByLabelText(translate('Username'))).toBeInTheDocument();
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
