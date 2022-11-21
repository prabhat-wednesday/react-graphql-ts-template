import { ButtonProps, Button as But } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { T } from '@components/T';

const B = styled(But)`
  margin: 0.5em;
`;
interface CustomButtonProps extends ButtonProps {
  messageId: string;
}
export const Button = (props: CustomButtonProps) => {
  return (
    <B {...props}>
      <T id={props.messageId} />
    </B>
  );
};
