import { Step1 } from './Step1';
import { Step2 } from './Step2';

type StepsProps = {
  index: number;
};

const steps = [Step1, Step2];

export function Steps({ index }: StepsProps) {
  const Component = steps[index];

  return <Component />;
}
