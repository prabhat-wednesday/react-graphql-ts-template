import React, { useState, useRef, MutableRefObject } from 'react';
import { AnyAction, compose } from '@reduxjs/toolkit';
import styled from 'styled-components';
import { connect } from 'react-redux';

import DynamicStepForm from '@app/components/DynamicForm';
import StepsComponent from '@app/components/StepsComponent';
import { requestGetUserData } from './reducer';
import { If } from '@app/components';
import { FormInstance } from 'antd';
import { getStepperLoginFormInputConstants } from './constants';
import { Button } from '@app/components/Button';
import { translate } from '@app/components/IntlGlobalProvider';

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 3rem;
`;

const CustomFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export interface LoginContainerProps {
  dispatchUserData: (payload: any) => AnyAction;
}

const getStepMessages = () => [
  { title: translate('username') },
  { title: translate('email') },
  { title: translate('password') }
];

const LoginContainer = ({ dispatchUserData }: LoginContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const form = useRef<FormInstance<any>>(null);
  const handleNext = () => {
    form.current
      ?.validateFields()
      .then(() => {
        setCurrentIndex((next) => next + 1);
      })
      .catch(() => {});
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleSubmit = (values: any) => {
    dispatchUserData(values);
  };

  const handleFormInstance = (f: FormInstance<any>) => {
    (form as MutableRefObject<FormInstance>).current = f;
  };
  return (
    <Container>
      <StepsComponent currentIndex={currentIndex} stepsMsg={getStepMessages()} />
      <CustomFormContainer>
        <DynamicStepForm
          handleFormInstance={handleFormInstance}
          formInput={getStepperLoginFormInputConstants()[currentIndex]}
          handleSubmit={handleSubmit}
        />
        <div style={{ display: 'flex' }}>
          <If condition={currentIndex}>
            <Button messageId="prev" onClick={handlePrev} type="primary" />
          </If>
          <If
            condition={currentIndex < 2}
            otherwise={
              <Button messageId="submit" form="my-form" data-testid="submitButton" type="primary" htmlType="submit" />
            }
          >
            <Button messageId="next" onClick={handleNext} type="primary" />
          </If>
        </div>
      </CustomFormContainer>
    </Container>
  );
};

export function mapDispatchToProps(dispatch: (arg0: AnyAction) => any) {
  return {
    dispatchUserData: (payload: any) => dispatch(requestGetUserData(payload))
  };
}

const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(LoginContainer);
export const LoginContainerTest = LoginContainer;
