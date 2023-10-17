import { useCallback, useEffect, useMemo, useState } from 'react';

import { Loader } from '@components/Loader';
import { Text } from '@components/Text';

import { ReactComponent as UserAvatar } from '@assets/icons/user-avatar.svg';
import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { ReactComponent as LogoutButton } from '@assets/icons/power-button.svg';

import { ApiService } from '@services/ApiService';

import { User, useAuth } from '@hooks/auth';
import { useRentxToast } from '@hooks/useToast';
import { Navbar } from '@components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Container, Content, ProfileInfo } from './styles';

function ProfileLoading() {
  return (
    <div className='info-loading'>
      <Loader />
    </div>
  );
}

function Profile({ user }: { user: User }) {
  const { driverLicense, email, numberOfRentals, createdAt } = user;

  const formatted = new Date(createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <ProfileInfo>
      <div className='profile-info__item' id='numberOfRentals'>
        <Text as='h3' color='gray500' family='inter' weight='regular' size='medium'>
          Agendamentos feitos
        </Text>
        <Text as='p' color='gray700' family='archivo' weight='medium' size='medium'>
          {numberOfRentals ?? '0'}
        </Text>
      </div>
      <hr />
      <div className='profile-info__item' id='driverLicense'>
        <Text as='h3' color='gray500' family='inter' weight='regular' size='medium'>
          CNH
        </Text>
        <Text as='p' color='gray700' family='archivo' weight='medium' size='medium'>
          {driverLicense ?? ' - '}
        </Text>
      </div>
      <hr />
      <div className='profile-info__item' id='email'>
        <Text as='h3' color='gray500' family='inter' weight='regular' size='medium'>
          E-mail
        </Text>
        <Text as='p' color='gray700' family='archivo' weight='medium' size='medium'>
          {email ?? ' - '}
        </Text>
      </div>
      <hr />
      <div className='profile-info__item'>
        <Text as='h3' color='gray500' family='inter' weight='regular' size='medium'>
          Membro desde
        </Text>
        <Text as='p' color='gray700' family='archivo' weight='medium' size='medium'>
          {formatted ?? ' - '}
        </Text>
      </div>
    </ProfileInfo>
  );
}

function Info() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const api = useMemo(() => new ApiService(), []);
  const navigate = useNavigate();
  const { updateUser, user, signOut } = useAuth();
  const { createBasicToast } = useRentxToast();

  const getUserData = useCallback(async () => {
    try {
      const userProfile = await api.getUserProfile();
      updateUser({ ...user, ...userProfile });

      setDataLoading(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        createBasicToast('error', 'Sessão expirada. Faça login novamente.');
        signOut();
        return;
      }
      createBasicToast('error', 'Algo deu errado. Tente novamente mais tarde.');
    }
  }, [api, createBasicToast, signOut, updateUser, user]);

  useEffect(() => {
    if (dataLoading) getUserData();
  }, [getUserData, dataLoading]);

  return (
    <Container>
      <header>
        <EditIcon onClick={() => navigate('/profile/edit')} />
        <Text as='h1' color='whitePrimary' family='archivo' weight='semibold' size='xxlarge'>
          Perfil
        </Text>
        <LogoutButton onClick={signOut} />
      </header>
      <Content>
        <div className='image-container'>
          {dataLoading ? <Loader /> : <UserAvatar aria-label='profile-picture' />}
        </div>
        <Text as='h1' color='gray700' family='archivo' weight='semibold' size='xxxlarge'>
          {user?.name ?? ''}
        </Text>

        {dataLoading ? <ProfileLoading /> : <Profile user={user} />}
      </Content>
      <Navbar />
    </Container>
  );
}

export default Info;
