import { ReactComponent as LogoIcon } from '@assets/icons/logo-dark.svg';
import { ReactComponent as DoneIcon } from '@assets/icons/done-indicator.svg';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';

type SuccessPageProps = {
  title: string | undefined;
  paragraph: string | undefined;
  navigateTo: string | undefined;
};

export function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, paragraph, navigateTo } = (location?.state as SuccessPageProps) || {};

  if (!title || !paragraph || !navigateTo) {
    return <Navigate to='/welcome' replace />;
  }

  return (
    <Container>
      <Content>
        <LogoIcon className='logo' />
        <div className='info'>
          <DoneIcon className='done' />
          <Text size='xxxlarge' as='h1' weight='semibold' color='gray100' family='archivo'>
            {title}
          </Text>
          <Text size='small' weight='regular' color='gray400' lineHeight={24}>
            {paragraph}
          </Text>
        </div>

        <Button className='button' variant='secondary' onClick={() => navigate(navigateTo)}>
          Ok
        </Button>
      </Content>
    </Container>
  );
}
