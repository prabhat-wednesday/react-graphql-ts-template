import React from 'react';
import styled from 'styled-components';
import { Button, Form } from 'antd';

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

export interface LoginContainerProps {
  dispatchUserData: (payload: any) => AnyAction;
}

const FormInputArray = [
  { label: 'label_username', name: 'username', message: 'msg_for_username', required: true },
  { label: 'label_emailId', name: 'emailId', message: 'msg_for_emailid', required: true },
  { label: 'label_password', name: 'password', message: 'msg_for_password', required: true }
];

const LoginContainer = ({ dispatchUserData }: LoginContainerProps) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    dispatchUserData(values);
    form.resetFields();
  };
  return (
    <Container>
      <FormContainer>
        <Form
          data-testid="loginForm"
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
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
