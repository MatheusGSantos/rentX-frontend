import { ReactComponent as InfoIcon } from '@assets/icons/info-circle-1.svg';
import { Text } from '@components/Text';
import { Container } from './styles';

type CalloutVariant = 'info' | 'warning' | 'error';

interface CalloutProps {
  variant: CalloutVariant;
  message: string;
  className?: string;
}

export function Callout({ variant, message, className }: CalloutProps) {
  return (
    <Container variant={variant} className={className}>
      <InfoIcon />
      <Text color='gray700' weight='regular' family='archivo' size='small'>
        {message}
      </Text>
    </Container>
  );
}

Callout.defaultProps = {
  className: '',
};
