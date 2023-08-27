import { useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { CheckboxProps } from './types';
import { StyledCheckboxIndicator, StyledCheckboxRoot } from './styles';

export function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = useState<CheckedState>(false);

  return (
    <StyledCheckboxRoot checked={checked} onCheckedChange={setChecked} {...props}>
      <StyledCheckboxIndicator as='div' checked={checked} />
    </StyledCheckboxRoot>
  );
}
