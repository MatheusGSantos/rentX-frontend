import { Text } from '@components/Text';
import { FormTextInput } from '@components/FormTextInput';

import { ReactComponent as EmailIcon } from '@assets/envelope.svg';
import { ReactComponent as UserIcon } from '@assets/user.svg';
import { ReactComponent as LockIcon } from '@assets/lock.svg';
import { ReactComponent as CarIcon } from '@assets/car.svg';
import { ReactComponent as LeftArrow } from '@assets/arrow-left.svg';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Content, StyledForm } from './styles';

type FormData = {
  name: string;
  email: string;
  driverLicense: string;
  password: string;
  repeatPassword: string;
};

export function Signin() {
  const methods = useForm<FormData>({
    defaultValues: { name: '', email: '', driverLicense: '', password: '', repeatPassword: '' },
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
    <Container>
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
            Crie sua conta
          </Text>
          <Text
            id='presentation-paragraph'
            size='medium'
            weight='regular'
            color='gray500'
            lineHeight={24}
          >
            Faça seu cadastro de forma rápida e fácil.
          </Text>
        </div>
        <FormProvider {...methods}>
          <StyledForm onSubmit={methods.handleSubmit((data) => console.log(data))}>
            <div className='input-container'>
              <FormTextInput
                id='name'
                name='name'
                labelIcon={UserIcon}
                placeholder='Nome'
                autoComplete='new-password'
                required
              />

              <FormTextInput
                type='email'
                id='email'
                name='email'
                labelIcon={EmailIcon}
                placeholder='E-mail'
                autoComplete='new-password'
                required
              />

              <FormTextInput
                id='driverLicense'
                name='driverLicense'
                labelIcon={CarIcon}
                placeholder='Número da CNH'
                autoComplete='new-password'
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

              <FormTextInput
                type='password'
                id='repeatPassword'
                name='repeatPassword'
                labelIcon={LockIcon}
                placeholder='Repetir senha'
                autoComplete='new-password'
                required
              />
            </div>
            <Button type='submit'>Cadastrar</Button>
          </StyledForm>
        </FormProvider>
      </Content>
    </Container>
  );
}
