import React from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';

const CustomStep = styled(Steps)`
  padding: 0 10rem;
`;
const { Step } = Steps;

interface StepsComponentProps {
  currentIndex: Number;
  stepsMsg: { title: string }[];
}
const StepsComponent = ({ currentIndex, stepsMsg }: StepsComponentProps) => {
  return (
    <CustomStep current={currentIndex}>
      {stepsMsg.map((item: any) => (
        <Step key={item.title} {...item} />
      ))}
    </CustomStep>
  );
};

export default StepsComponent;
