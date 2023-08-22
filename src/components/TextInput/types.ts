import { InputHTMLAttributes, ReactNode } from 'react';

export interface TextInputRootProps {
  children?: ReactNode;
}

export interface TextInputLabelIconProps {
  children?: ReactNode;
}

export interface TextInputInputWrapperProps {
  children?: ReactNode;
}

export interface TextInputInputIconProps {
  children?: ReactNode;
}

export interface TextInputInputProps extends InputHTMLAttributes<HTMLInputElement> {}
