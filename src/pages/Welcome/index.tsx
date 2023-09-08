import { ReactComponent as Logo } from '@assets/logo.svg';

import { Text } from '@components/Text';
import { Button } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';
import { TEXT } from './constants';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <div className='logo-container'>
          <Logo />
        </div>

        <div className='presentation'>
          <Text size='huge' weight='semibold' as='h1' family='archivo' color='gray100'>
            {TEXT.TITLE}
          </Text>
          <Text size='small' weight='regular' color='gray300'>
            {TEXT.SUBTITLE}
          </Text>
        </div>

        <footer>
          <div className='button-container'>
            <Button variant='primary' onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant='secondary' onClick={() => navigate('/signin')}>
              Cadastro
            </Button>
          </div>
          <Button variant='ghost' onClick={() => navigate('/onboard')}>
            <Text family='archivo' as='p' weight='medium' size='small' color='gray500'>
              Voltar
            </Text>
          </Button>
        </footer>
      </Content>
    </Container>
  );
}
