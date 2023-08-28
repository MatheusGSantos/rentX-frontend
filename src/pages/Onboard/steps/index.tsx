import { Step1 } from './Step1';

type StepsProps = {
  index: number;
};

export function Steps({ index }: StepsProps) {
  const steps = [Step1];
  const Component = steps[index];

  return <Component />;
}
