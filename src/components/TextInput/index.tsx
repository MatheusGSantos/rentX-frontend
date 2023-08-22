import {
  TextInputInputWrapperProps,
  TextInputLabelIconProps,
  TextInputRootProps,
  TextInputInputIconProps,
  TextInputInputProps,
} from './types';
import { StyledTextInputRoot } from './styles';

function TextInputRoot({ children }: TextInputRootProps) {
  return <StyledTextInputRoot>{children}</StyledTextInputRoot>;
}

TextInputRoot.displayName = 'TextInput.Root';

function TextInputLabelIcon({ children }: TextInputLabelIconProps) {
  return <div>{children}</div>;
}

TextInputLabelIcon.displayName = 'TextInput.LabelIcon';

function TextInputWrapper({ children }: TextInputInputWrapperProps) {
  return <div>{children}</div>;
}

TextInputWrapper.displayName = 'TextInput.Wrapper';

function TextInputInputIcon({ children }: TextInputInputIconProps) {
  return <div>{children}</div>;
}

TextInputInputIcon.displayName = 'TextInput.InputIcon';

function TextInputInput({ children }: TextInputInputProps) {
  return <div>{children}</div>;
}

TextInputInput.displayName = 'TextInput.Input';

export const TextInput = {
  Root: TextInputRoot,
  LabelIcon: TextInputLabelIcon,
  Wrapper: TextInputWrapper,
  InputIcon: TextInputInputIcon,
  Input: TextInputInput,
};
