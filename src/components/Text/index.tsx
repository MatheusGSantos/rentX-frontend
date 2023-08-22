import { StyledText } from './styles';
import { TextProps } from './types';

export function Text({ children, ...rest }: TextProps) {
  return <StyledText {...rest}>{children}</StyledText>;
}
