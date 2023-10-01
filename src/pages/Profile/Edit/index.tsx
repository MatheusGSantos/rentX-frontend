import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@components/Button';
import { FormTextInput } from '@components/FormTextInput';
import { Loader } from '@components/Loader';
import { Text } from '@components/Text';

import { ReactComponent as UserAvatar } from '@assets/icons/user-avatar.svg';
import { ReactComponent as UserIcon } from '@assets/icons/user.svg';
import { ReactComponent as EmailIcon } from '@assets/icons/envelope.svg';
import { ReactComponent as LeftArrow } from '@assets/icons/arrow-left.svg';
import { ReactComponent as CarIcon } from '@assets/icons/car.svg';

import { ERROR_MESSAGES } from '@utils/constants';

import { ApiService } from '@services/ApiService';
import { AxiosError } from 'axios';

import { useRentxToast } from '@hooks/useToast';
import { Container, Content } from './styles';

const editProfileFormSchema = z.object({
  name: z.string().min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED),
  email: z
    .string()
    .min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED)
    .email(ERROR_MESSAGES.FORM_VALIDATION.INVALID_EMAIL),
  driverLicense: z
    .string()
    .min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED)
    .regex(/^\d{11}$/, ERROR_MESSAGES.FORM_VALIDATION.INVALID_DRIVER_LICENSE),
});

function FormLoading() {
  return (
    <div className='form-loading'>
      <Loader />
    </div>
  );
}

function Edit() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const api = useMemo(() => new ApiService(), []);
  const { createBasicToast, createLoadingToast, dismissToast, updateToast } = useRentxToast();

  const methods = useForm({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      driverLicense: '',
    },
    mode: 'onSubmit',
  });

  const getUserData = useCallback(async () => {
    try {
      const user = await api.getUserProfile();
      methods.reset(user);
      setDataLoading(false);
    } catch (error) {
      createBasicToast('error', 'Algo deu errado. Tente novamente mais tarde.');
    }
  }, [api, createBasicToast, methods]);

  useEffect(() => {
    if (dataLoading) getUserData();
  }, [methods, getUserData, dataLoading]);

  async function onSubmit(data: z.infer<typeof editProfileFormSchema>) {
    setIsSubmitting(true);
    const id = createLoadingToast('Aguarde...');
    try {
      await api.updateUser(data);
      dismissToast(id);
      navigate('/success', {
        state: {
          title: 'Feito!',
          paragraph: 'Agora suas infomações estão atualizadas.',
          navigateTo: '/profile/edit',
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
    <Container>
      <header>
        <LeftArrow className='back-arrow' onClick={() => navigate('/profile')} />
        <Text as='h1' color='whitePrimary' family='archivo' weight='semibold' size='xxlarge'>
          Editar Perfil
        </Text>
      </header>
      <Content>
        <div className='image-container'>
          {dataLoading ? <Loader /> : <UserAvatar aria-label='profile-picture' />}
        </div>
        <Text as='h1' color='gray700' family='archivo' weight='semibold' size='xxlarge'>
          Dados Pessoais
        </Text>
        <hr />

        {dataLoading ? (
          <FormLoading />
        ) : (
          <FormProvider {...methods}>
            <form>
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
            </form>
          </FormProvider>
        )}

        <Button
          onClick={methods.handleSubmit(onSubmit)}
          disabled={dataLoading || isSubmitting || !methods.formState.isDirty}
        >
          Salvar alterações
        </Button>
      </Content>
    </Container>
  );
}

export default Edit;
