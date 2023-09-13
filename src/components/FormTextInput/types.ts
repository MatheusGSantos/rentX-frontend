import { FunctionComponent, InputHTMLAttributes, SVGProps } from 'react';

export interface FormTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  wrapperClassName?: string;
  labelIcon: FunctionComponent<SVGProps<SVGSVGElement>>;
  rightIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  onRightIconClick?: () => void;
}
