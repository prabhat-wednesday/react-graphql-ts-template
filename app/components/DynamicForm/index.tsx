import React, { useEffect, useState } from 'react';
import { Button, Form, FormInstance } from 'antd';
import styled from 'styled-components';
import FormInput from '../FormInput';
import If from '../If';
import { isEmpty } from 'lodash-es';
import { Rule } from 'antd/lib/form';

const FormContainer = styled.div`
  width: 50%;
  margin: 5rem auto;
  padding: 1rem;
  border: 1px black solid;
`;

interface DynamicStepFormProps {
  formInput: { label: string; name: string; rules: Rule[] };
  handleNext: () => void;
  handleFormChange: (value: FormInstance<any>) => void;
  handlePrev: () => void;
  handleSubmit: (value: any) => void;
}

const DynamicStepForm = ({ formInput, handleSubmit, handleFormChange }: DynamicStepFormProps) => {
  console.log(formInput, 'in Dynamic form');
  const [isDisabled, setIsDisabled] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    handleFormChange(form);
  }, [form]);

  const onFinish = (values: any) => {
    handleSubmit(values);
    form.resetFields();
  };

  const handleChange = (value: any) => {
    setIsDisabled(isEmpty(value[formInput.name]));
  };

  useEffect(() => {
    setIsDisabled(true);
  }, [formInput.name]);
  console.log(formInput);
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
          onValuesChange={handleChange}
          autoComplete="off"
        >
          <FormInput {...formInput} />
        </Form>
      </FormContainer>
    </>
  );
};

export default DynamicStepForm;
