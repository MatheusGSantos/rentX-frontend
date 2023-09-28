import { useFormContext, Controller } from 'react-hook-form';
import { CheckedState } from '@radix-ui/react-checkbox';
import { CheckboxProps } from './types';
import { StyledCheckboxIndicator, StyledCheckboxRoot } from './styles';

export function Checkbox({ name, ...rest }: CheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <StyledCheckboxRoot
          checked={field.value}
          onCheckedChange={(checked: CheckedState) => field.onChange(checked)}
          {...rest}
        >
          <StyledCheckboxIndicator as='div' checked={field.value} />
        </StyledCheckboxRoot>
      )}
    />
  );
}
