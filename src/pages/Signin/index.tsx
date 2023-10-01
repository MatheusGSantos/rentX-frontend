import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@components/Button';
import { FormTextInput } from '@components/FormTextInput';
import { Text } from '@components/Text';

import { ReactComponent as EmailIcon } from '@assets/icons/envelope.svg';
import { ReactComponent as UserIcon } from '@assets/icons/user.svg';
import { ReactComponent as LockIcon } from '@assets/icons/lock.svg';
import { ReactComponent as CarIcon } from '@assets/icons/car.svg';
import { ReactComponent as LeftArrow } from '@assets/icons/arrow-left.svg';

import { ERROR_MESSAGES } from '@utils/constants';
import { ApiService } from '@services/ApiService';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useRentxToast } from '@hooks/useToast';
import { Container, Content, StyledForm } from './styles';
import { TEXT } from './constants';

const signinFormSchema = z
  .object({
    name: z.string().min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED),
    email: z
      .string()
      .min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED)
      .email(ERROR_MESSAGES.FORM_VALIDATION.INVALID_EMAIL),
    driverLicense: z
      .string()
      .min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED)
      .regex(/^\d{11}$/, ERROR_MESSAGES.FORM_VALIDATION.INVALID_DRIVER_LICENSE),
    password: z
      .string()
      .min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED)
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export function Signin() {
  const methods = useForm({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      name: '',
      email: '',
      driverLicense: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });
  const navigate = useNavigate();
  const { state } = useLocation();
  const api = new ApiService();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createLoadingToast, dismissToast, updateToast } = useRentxToast();

  function goBack() {
    if (state?.from) {
      navigate(-1);
    } else {
      navigate('/welcome');
    }
  }

  async function onSubmit(data: z.infer<typeof signinFormSchema>) {
    setIsSubmitting(true);
    const id = createLoadingToast('Aguarde...');
    try {
      await api.createUser(data);
      dismissToast(id);
      navigate('/success', {
        state: {
          title: 'Conta criada!',
          paragraph: 'Agora é só fazer login\ne aproveitar.',
          navigateTo: '/login',
        },
      });
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error?.response?.data?.message
          : 'Erro inesperado ao criar usuário';

      updateToast(id, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
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
          <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='input-container'>
              <FormTextInput
                id='name'
                name='name'
                labelIcon={UserIcon}
                placeholder='Nome'
                autoComplete='new-password'
              />

              <FormTextInput
                type='email'
                id='email'
                name='email'
                labelIcon={EmailIcon}
                placeholder='E-mail'
                autoComplete='new-password'
              />

              <FormTextInput
                id='driverLicense'
                name='driverLicense'
                labelIcon={CarIcon}
                placeholder='Número da CNH'
                autoComplete='new-password'
              />

              <FormTextInput
                type='password'
                id='password'
                name='password'
                labelIcon={LockIcon}
                placeholder='Senha'
                autoComplete='new-password'
              />

              <FormTextInput
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                labelIcon={LockIcon}
                placeholder='Repetir senha'
                autoComplete='new-password'
              />
            </div>
            <Button type='submit' disabled={isSubmitting}>
              Cadastrar
            </Button>
          </StyledForm>
        </FormProvider>
      </Content>
    </Container>
  );
}
