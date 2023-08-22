import { ButtonHTMLAttributes } from 'react';

enum EButtonTypes {
  'primary',
  'secondary',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: keyof typeof EButtonTypes;
};

export type StyledButtonProps = Omit<ButtonProps, 'children'>;
