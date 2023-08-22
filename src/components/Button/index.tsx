import { Container } from './styles';
import { ButtonProps } from './types';

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <Container type='button' {...rest}>
      {children}
    </Container>
  );
}
