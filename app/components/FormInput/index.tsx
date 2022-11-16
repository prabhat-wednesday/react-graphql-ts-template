import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  width: 100%;
`;

interface FormInputProps {
  label: string;
  name: string;
  message: string;
}
const FormInput = ({ label, name, message }: FormInputProps) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required: true, message }]}>
      <StyledInput data-testid="formInput" />
    </Form.Item>
  );
};

export default FormInput;
