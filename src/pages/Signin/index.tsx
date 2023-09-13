import { Text } from '@components/Text';
import { FormTextInput } from '@components/FormTextInput';

import { ReactComponent as EmailIcon } from '@assets/envelope.svg';
import { ReactComponent as UserIcon } from '@assets/user.svg';
import { ReactComponent as LockIcon } from '@assets/lock.svg';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import { Container, Content, StyledForm } from './styles';

type FormData = {
  name: string;
  email: string;
  password: string;
};

export function Signin() {
  const methods = useForm<FormData>({ defaultValues: { name: '', email: '', password: '' } });

  return (
    <Container>
      <Content>
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
            size='small'
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
                id='password'
                name='password'
                labelIcon={LockIcon}
                placeholder='Repetir senha'
                autoComplete='new-password'
                required
              />
              <FormTextInput
                type='password'
                id='password'
                name='password'
                labelIcon={LockIcon}
                placeholder='Repetir senha'
                autoComplete='new-password'
                required
                wrapperClassName='extra'
              />
              <FormTextInput
                type='password'
                id='password'
                name='password'
                labelIcon={LockIcon}
                placeholder='Repetir senha'
                autoComplete='new-password'
                required
                wrapperClassName='extra'
              />
              <FormTextInput
                type='password'
                id='password'
                name='password'
                labelIcon={LockIcon}
                placeholder='Repetir senha'
                autoComplete='new-password'
                required
                wrapperClassName='extra'
              />
              <FormTextInput
                type='password'
                id='password'
                name='password'
                labelIcon={LockIcon}
                placeholder='Repetir senha'
                autoComplete='new-password'
                required
                wrapperClassName='extra'
              />
              <FormTextInput
                type='password'
                id='password'
                name='password'
                labelIcon={LockIcon}
                placeholder='Repetir senha'
                autoComplete='new-password'
                required
                wrapperClassName='extra'
              />
            </div>
            <Button type='submit'>Cadastrar</Button>
          </StyledForm>
        </FormProvider>
      </Content>
    </Container>
  );
}
