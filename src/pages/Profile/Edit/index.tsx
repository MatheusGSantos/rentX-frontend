import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@components/Button';
import { FormTextInput } from '@components/FormTextInput';
import { Text } from '@components/Text';

import { ReactComponent as UserAvatar } from '@assets/user-avatar.svg';
import { ReactComponent as UserIcon } from '@assets/user.svg';
import { ReactComponent as EmailIcon } from '@assets/envelope.svg';
import { ReactComponent as LeftArrow } from '@assets/arrow-left.svg';

import { ERROR_MESSAGES } from '@utils/constants';

import { ApiService } from '@services/ApiService';

import { toast } from 'react-toastify';
import { Container, Content } from './styles';

const editProfileFormSchema = z.object({
  name: z.string().min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED),
  email: z
    .string()
    .min(1, ERROR_MESSAGES.FORM_VALIDATION.REQUIRED)
    .email(ERROR_MESSAGES.FORM_VALIDATION.INVALID_EMAIL),
});

function FormLoading() {
  return (
    <div className='form-loading'>
      <ReactLoading type='cubes' color='#DC1637' height={32} width={32} />
    </div>
  );
}

function Edit() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const api = useMemo(() => new ApiService(), []);

  const methods = useForm({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onSubmit',
  });

  const getUserData = useCallback(async () => {
    try {
      const user = await api.getUserProfile();
      methods.reset(user);
      setDataLoading(false);
    } catch (error) {
      toast.error('Algo deu errado. Tente novamente mais tarde.');
    }
  }, [api, methods]);

  useEffect(() => {
    if (dataLoading) getUserData();
  }, [methods, getUserData, dataLoading]);

  // async function onSubmit(data: z.infer<typeof signinFormSchema>) {
  //   setIsSubmitting(true);
  //   const id = toast.loading('Aguarde...');
  //   try {
  //     await api.createUser(data);
  //     toast.dismiss(id);
  //     navigate('/success', {
  //       state: {
  //         title: 'Conta criada!',
  //         paragraph: 'Agora é só fazer login\ne aproveitar.',
  //         navigateTo: '/login',
  //       },
  //     });
  //   } catch (error) {
  //     const message =
  //       error instanceof AxiosError
  //         ? error?.response?.data?.message
  //         : 'Erro inesperado ao criar usuário';

  //     toast.update(id, {
  //       render: message,
  //       type: 'error',
  //       isLoading: false,
  //       autoClose: 2000,
  //       closeButton: true,
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }

  return (
    <Container>
      <header>
        <LeftArrow className='back-arrow' onClick={() => navigate('/profile')} />
        <Text as='h1' color='whitePrimary' family='archivo' weight='semibold' size='xxlarge'>
          Editar Perfil
        </Text>
      </header>
      <Content>
        <circle className='image-container'>
          <UserAvatar aria-label='profile-picture' />
        </circle>
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
            </form>
          </FormProvider>
        )}

        <Button onClick={methods.handleSubmit((data) => console.info(data))} disabled={dataLoading}>
          Salvar alterações
        </Button>
      </Content>
    </Container>
  );
}

export default Edit;
