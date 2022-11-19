import React, { useEffect } from 'react';
import { Form as F, FormInstance } from 'antd';
import styled from 'styled-components';
import FormInput from '@components/FormInput';
import { StepperLoginFormInputInterface } from '@app/interfaces/common';

const FormContainer = styled.div`
  display: flex;
  flex: 1 1 0;
  align-self: center;
  padding: 1rem;
`;

const Form = styled(F)`
  width: 20rem;
`;
interface DynamicStepFormProps {
  formInput: StepperLoginFormInputInterface;
  handleFormChange: (value: FormInstance<any>) => void;
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

  return (
    <FormContainer>
      <Form
        id="my-form"
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
  );
};

export default DynamicStepForm;
