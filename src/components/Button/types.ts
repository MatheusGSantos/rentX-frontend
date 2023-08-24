import { ButtonHTMLAttributes } from 'react';

enum EButtonTypes {
  'primary',
  'secondary',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttontype?: keyof typeof EButtonTypes;
};

export type StyledButtonProps = Omit<ButtonProps, 'children'>;
