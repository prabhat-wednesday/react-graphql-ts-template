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
  rules?: Rule[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput = ({ label, name, onChange, ...props }: FormInputProps) => {
  return (
    <div>
      <CustomFormItem {...props} label={translate(label)} name={translate(name)}>
        <StyledInput autoFocus onChange={onChange} data-testid="formInput" />
      </CustomFormItem>
    </div>
  );
};

export default FormInput;
