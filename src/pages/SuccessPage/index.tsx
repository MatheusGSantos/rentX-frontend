import { ReactComponent as LogoIcon } from '@assets/logo-dark.svg';
import { ReactComponent as DoneIcon } from '@assets/done-indicator.svg';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';

type SuccessPageProps = {
  title: string;
  paragraph: string;
  navigateTo: string;
};

export function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, paragraph, navigateTo } = location.state as SuccessPageProps;

  if (!title || !paragraph || !navigateTo) {
    return <Navigate to='/welcome' />;
  }

  return (
    <Container>
      <Content>
        <LogoIcon className='logo' />
        <DoneIcon className='done' />
        <Text size='xxxlarge' weight='semibold' color='gray100' family='archivo'>
          {title}
        </Text>
        <Text size='small' weight='regular' color='gray400' lineHeight={24}>
          {paragraph}
        </Text>

        <Button className='button' variant='secondary' onClick={() => navigate(navigateTo)}>
          Ok
        </Button>
      </Content>
    </Container>
  );
}
