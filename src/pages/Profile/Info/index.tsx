import { useCallback, useEffect, useMemo, useState } from 'react';

import { Loader } from '@components/Loader';
import { Text } from '@components/Text';

import { ReactComponent as UserAvatar } from '@assets/user-avatar.svg';

import { ApiService } from '@services/ApiService';

import { useAuth } from '@hooks/auth';
import { useRentxToast } from '@hooks/useToast';
import { Container, Content } from './styles';

function ProfileLoading() {
  return (
    <div className='info-loading'>
      <Loader />
    </div>
  );
}

function Info() {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const api = useMemo(() => new ApiService(), []);
  const { updateUser, user } = useAuth();
  const { createBasicToast } = useRentxToast();

  const getUserData = useCallback(async () => {
    try {
      const userProfile = await api.getUserProfile();
      updateUser({ ...user, ...userProfile });

      setDataLoading(false);
    } catch (error) {
      createBasicToast('error', 'Algo deu errado. Tente novamente mais tarde.');
    }
  }, [api, createBasicToast, updateUser, user]);

  useEffect(() => {
    if (dataLoading) getUserData();
  }, [getUserData, dataLoading]);

  return (
    <Container>
      <header>
        <Text as='h1' color='whitePrimary' family='archivo' weight='semibold' size='xxlarge'>
          Perfil
        </Text>
      </header>
      <Content>
        <div className='image-container'>
          {dataLoading ? <Loader /> : <UserAvatar aria-label='profile-picture' />}
        </div>
        <Text as='h1' color='gray700' family='archivo' weight='semibold' size='xxxlarge'>
          {user?.name || ''}
        </Text>

        {dataLoading ? <ProfileLoading /> : <div />}
      </Content>
    </Container>
  );
}

export default Info;
