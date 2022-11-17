import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { translate } from '../IntlGlobalProvider';

const StyledInput = styled(Input)`
  width: 100%;
`;

const CustomFormItem = styled(Form.Item)`
  display: flex;
  justify-content: space-between;

  &&&.ant-form-horizontal .ant-form-item-label {
    margin-right: 10px;
  }
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
    <CustomFormItem label={translate(label)} name={translate(name)} rules={[{ required, message: translate(message) }]}>
      <StyledInput onChange={onChange} data-testid="formInput" />
    </CustomFormItem>
  );
};

export default FormInput;
