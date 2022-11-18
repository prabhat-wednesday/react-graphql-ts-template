import React from 'react';
import { renderWithIntl } from '@app/utils/testUtils';
import DynamicStepForm from '..';

describe('<DynamicStepForm/> test', () => {
  const onClickSpy = jest.fn();
  const onSubmitSpy = jest.fn();
  const defaultProps = {
    formInput: { label: 'label_username', name: 'username', rules: [{ message: 'msg_for_username', required: true }] },
    handleNext: onClickSpy,
    handlePrev: onClickSpy,
    handleSubmit: onSubmitSpy,
    handleFormChange: onClickSpy
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<DynamicStepForm {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
