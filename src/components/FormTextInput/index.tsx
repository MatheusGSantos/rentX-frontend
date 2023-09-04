import { Controller, useFormContext } from 'react-hook-form';
import { Text } from '@components/Text';
import { FormTextInputProps } from './types';
import {
  StyledFormTextInputContainer,
  StyledFormTextInputInput,
  StyledFormTextInputInputWrapper,
  StyledFormTextInputLabelIcon,
  StyledFormTextInputRightIcon,
  StyledFormTextInputRoot,
} from './styles';

export function FormTextInput({
  labelIcon: LabelIcon,
  rightIcon: RightIcon,
  onRightIconClick,
  name,
  ...rest
}: FormTextInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <StyledFormTextInputContainer>
      <StyledFormTextInputRoot>
        <StyledFormTextInputLabelIcon hasError={!!errors[name]}>
          <LabelIcon />
        </StyledFormTextInputLabelIcon>

        <StyledFormTextInputInputWrapper hasError={!!errors[name]}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => <StyledFormTextInputInput type='text' {...field} {...rest} />}
          />

          {RightIcon && (
            <StyledFormTextInputRightIcon onClick={onRightIconClick}>
              <RightIcon />
            </StyledFormTextInputRightIcon>
          )}
        </StyledFormTextInputInputWrapper>
      </StyledFormTextInputRoot>

      <Text color='redPrimary' weight='regular' size='xsmall' className='helperText'>
        {errors[name]?.message as string}
      </Text>
    </StyledFormTextInputContainer>
  );
}
