import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

import { requestGetUserData } from './reducer';
import { AnyAction, compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

const FormContainer = styled.div`
  width: 50%;
  margin: 5rem auto;
  padding: 1rem;
  border: 1px black solid;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

interface LoginContainerProps {
  dispatchUserData: (payload: any) => AnyAction;
}

const LoginContainer = ({ dispatchUserData }: LoginContainerProps) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    dispatchUserData(values);
    form.resetFields();
  };

  return (
    <FormContainer>
      <Form form={form} name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <StyledInput />
        </Form.Item>

        <Form.Item label="EmailId" name="emailId" rules={[{ required: true, message: 'Please input your emailid!' }]}>
          <StyledInput />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <StyledInput />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

function mapDispatchToProps(dispatch: (arg0: AnyAction) => any) {
  return {
    dispatchUserData: (payload: any) => dispatch(requestGetUserData(payload))
  };
}

const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(LoginContainer);
