import { FunctionComponent, InputHTMLAttributes, ReactNode, SVGProps } from 'react';

export interface FormTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelIcon: FunctionComponent<SVGProps<SVGSVGElement>>;
  rightIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  onRightIconClick?: () => void;
}
