import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Steps } from 'antd';

import { requestGetUserData } from './reducer';
import { AnyAction, compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { For } from '@app/components';
import FormInput from '@app/components/FormInput';

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 3rem;
`;

const FormContainer = styled.div`
  width: 50%;
  margin: 5rem auto;
  padding: 1rem;
  border: 1px black solid;
`;

const CustomStep = styled(Steps)`
  padding: 0 10rem;
`;
export interface LoginContainerProps {
  dispatchUserData: (payload: any) => AnyAction;
}

const FormInputArray = [
  { label: 'label_username', name: 'username', message: 'msg_for_username', required: true },
  { label: 'label_emailId', name: 'emailId', message: 'msg_for_emailid', required: true },
  { label: 'label_password', name: 'password', message: 'msg_for_password', required: true }
];

const LoginContainer = ({ dispatchUserData }: LoginContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    dispatchUserData(values);
    form.resetFields();
  };
  const description = 'This is a description.';

  const list = ['username', 'emailId', 'password'];
  const { Step } = Steps;

  const handleChange = (value: any) => {
    const step = list.indexOf(Object.keys(value)[0]);
    console.log(step);
    setCurrentIndex(step);
  };
  return (
    <Container>
      <CustomStep current={currentIndex}>
        <Step title="Finished" description={description} />
        <Step title="In Progress" description={description} />
        <Step title="Waiting" description={description} />
      </CustomStep>
      <FormContainer>
        <Form
          layout="vertical"
          data-testid="loginForm"
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          onValuesChange={handleChange}
        >
          <For orientation={'column'} of={FormInputArray} renderItem={(item) => <FormInput {...item} />} />

          <Form.Item>
            <Button data-testid="submitButton" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </FormContainer>
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
