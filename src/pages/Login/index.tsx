import { Text } from '@components/Text';
import { FormTextInput } from '@components/FormTextInput';

import { ReactComponent as EmailIcon } from '@assets/envelope.svg';
import { ReactComponent as LockIcon } from '@assets/lock.svg';
import { ReactComponent as LeftArrow } from '@assets/arrow-left.svg';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkbox } from '@components/Checkbox';
import { Container, Content, StyledForm } from './styles';
import { TEXT } from './constants';

type FormData = {
  email: string;
  password: string;
};

export function Login() {
  const methods = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });
  const navigate = useNavigate();
  const { state } = useLocation();

  function goBack() {
    if (state?.from) {
      navigate(-1);
    } else {
      navigate('/welcome');
    }
  }

  return (
    <Container className='RX-scroll'>
      <Content>
        <LeftArrow className='back-arrow' onClick={goBack} />
        <div className='presentation'>
          <Text
            id='presentation-title'
            size='huge'
            weight='semibold'
            as='h1'
            family='archivo'
            color='gray700'
          >
            {TEXT.PRESENTATION.TITLE}
          </Text>
          <Text
            id='presentation-paragraph'
            size='medium'
            weight='regular'
            color='gray500'
            lineHeight={24}
          >
            {TEXT.PRESENTATION.PARAGRAPH}
          </Text>
        </div>
        <FormProvider {...methods}>
          <StyledForm onSubmit={methods.handleSubmit((data) => console.log(data))}>
            <div className='input-container'>
              <FormTextInput
                type='email'
                id='email'
                name='email'
                labelIcon={EmailIcon}
                placeholder='E-mail'
                autoComplete='username'
                required
              />

              <FormTextInput
                type='password'
                id='password'
                name='password'
                labelIcon={LockIcon}
                placeholder='Senha'
                autoComplete='new-password'
                required
              />
            </div>
            <div className='checkbox-container'>
              <Checkbox name='rememberMe' id='rememberMe' aria-labelledby='rememberMe-label' />
              <Text
                id='rememberMe-label'
                size='small'
                weight='regular'
                color='gray500'
                as='label'
                for='rememberMe'
              >
                Lembrar-me
              </Text>
            </div>
            <Button type='submit' className='login-button'>
              Login
            </Button>
          </StyledForm>
        </FormProvider>
      </Content>
    </Container>
  );
}
