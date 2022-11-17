import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { translate } from '../IntlGlobalProvider';

const StyledInput = styled(Input)`
  width: 100%;
`;

interface FormInputProps {
  label: string;
  name: string;
  message: string;
  required: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput = ({ label, name, message, required, onChange }: FormInputProps) => {
  return (
    <Form.Item label={translate(label)} name={translate(name)} rules={[{ required, message: translate(message) }]}>
      <StyledInput onChange={onChange} data-testid="formInput" />
    </Form.Item>
  );
};

export default FormInput;
