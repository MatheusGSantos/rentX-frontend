import { ButtonHTMLAttributes } from 'react';

enum EButtonVariants {
  'primary',
  'secondary',
  'ghost',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof EButtonVariants;
};

export type StyledButtonProps = Omit<ButtonProps, 'children'>;
