import React from 'react';
import { Form, FormItemProps, Input } from 'antd';
import styled from 'styled-components';
import { translate } from '../IntlGlobalProvider';
import { Rule } from 'antd/lib/form';

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
interface FormInputProps extends FormItemProps {
  label: string;
  name: string;
  trigger?: string;
  rules?: Rule[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput = ({ label, trigger, name, rules, onChange }: FormInputProps) => {
  console.log('lBL', label);
  return (
    <div>
      <CustomFormItem trigger={trigger} label={translate(label)} name={translate(name)} rules={rules}>
        <StyledInput autoFocus onChange={onChange} data-testid="formInput" />
      </CustomFormItem>
    </div>
  );
};

export default FormInput;
