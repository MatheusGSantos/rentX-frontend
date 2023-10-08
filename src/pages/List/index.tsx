import { useCallback, useEffect, useMemo, useState } from 'react';

import { Loader } from '@components/Loader';
import { Text } from '@components/Text';

import { ReactComponent as SearchIcon } from '@assets/icons/search.svg';

import { ApiService } from '@services/ApiService';

import { useAuth } from '@hooks/auth';
import { useRentxToast } from '@hooks/useToast';
import { Navbar } from '@components/Navbar';
import { FormTextInput } from '@components/FormTextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { Car } from '@utils/models/Car';
import { Container, Content, SearchResultsContainer } from './styles';

function SearchLoading() {
  return (
    <div className='search-loading'>
      <Loader />
    </div>
  );
}

function SearchResults() {
  return (
    <SearchResultsContainer className='RX-scroll'>
      <div className='search-element' />
      <div className='search-element' />
      <div className='search-element' />
      <div className='search-element' />
      <div className='search-element' />
      <div className='search-element' />
      <div className='search-element' />
      <div className='search-element' />
      <div className='search-element' />
      <div className='search-element' />
    </SearchResultsContainer>
  );
}

export function List() {
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const api = useMemo(() => new ApiService(), []);
  const { updateUser, user } = useAuth();
  const { createBasicToast } = useRentxToast();

  const methods = useForm<{ carName: string }>({
    defaultValues: {
      carName: '',
    },
  });

  const getUserData = useCallback(async () => {
    try {
      const userProfile = await api.getUserProfile();
      updateUser({ ...user, ...userProfile });

      setDataLoading(false);
    } catch (error) {
      createBasicToast('error', 'Algo deu errado. Tente novamente mais tarde.');
    }
  }, [api, createBasicToast, updateUser, user]);

  // useEffect(() => {
  //   if (dataLoading) getUserData();
  // }, [getUserData, dataLoading]);

  return (
    <Container>
      <header>
        <Text as='h1' color='whitePrimary' family='archivo' weight='semibold' size='xxlarge'>
          Listagem
        </Text>
        <Text size='small' weight='regular' family='archivo' color='gray400'>
          X carros
        </Text>
      </header>
      <Content>
        <FormProvider {...methods}>
          <form>
            <FormTextInput
              name='carName'
              labelIcon={SearchIcon}
              placeholder='Qual carro você procura?'
              wrapperClassName='input-search'
              inputRootClassName='input-root'
            />
          </form>
        </FormProvider>

        {dataLoading ? <SearchLoading /> : <SearchResults />}
      </Content>
      <Navbar />
    </Container>
  );
}
