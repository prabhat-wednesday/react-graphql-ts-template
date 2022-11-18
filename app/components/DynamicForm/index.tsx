import React, { useEffect } from 'react';
import { Form, FormInstance } from 'antd';
import styled from 'styled-components';
import FormInput from '../FormInput';
import { StepperLoginFormInputInterface } from '@app/interfaces/common';

const FormContainer = styled.div`
  width: 50%;
  margin: 5rem auto;
  padding: 1rem;
  border: 1px black solid;
`;

interface DynamicStepFormProps {
  formInput: StepperLoginFormInputInterface;
  handleNext: () => void;
  handleFormChange: (value: FormInstance<any>) => void;
  handlePrev: () => void;
  handleSubmit: (value: any) => void;
}

const DynamicStepForm = ({ formInput, handleSubmit, handleFormChange }: DynamicStepFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    handleFormChange(form);
  }, [form]);

  const onFinish = (values: any) => {
    handleSubmit(values);
    form.resetFields();
  };

  useEffect(() => {}, [formInput.name]);
  return (
    <>
      <FormContainer>
        <Form
          layout="vertical"
          data-testid="login-form"
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <FormInput {...formInput} />
        </Form>
      </FormContainer>
    </>
  );
};

export default DynamicStepForm;
