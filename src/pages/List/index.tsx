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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '@hooks/store';
import { Card } from '@components/Card';
import { Container, Content, SearchResultsContainer } from './styles';

function SearchLoading() {
  return (
    <div className='search-loading'>
      <Loader />
    </div>
  );
}

function SearchResults({ cars }: { cars: Car[] }) {
  const navigate = useNavigate();

  return (
    <SearchResultsContainer className='RX-scroll'>
      {cars.map((car) => (
        <Card key={car.id} car={car} onClick={() => navigate(`/cars/${car.id}/details/`)} />
      ))}
    </SearchResultsContainer>
  );
}

export function List() {
  const api = useMemo(() => new ApiService(), []);
  const { cars, setCars } = useStore();
  const { createBasicToast } = useRentxToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const methods = useForm<{ carName: string }>({
    defaultValues: {
      carName: '',
    },
  });

  const setSearchResults = useCallback(
    ({ carName }: { carName: string }) => {
      const currentCarName = searchParams.get('carName') ?? '';
      if (currentCarName !== carName) setSearchParams(carName.length ? { carName } : {});
    },
    [searchParams, setSearchParams],
  );

  const fetchCars = useCallback(async () => {
    try {
      setDataLoading(true);

      const searchParamsCarName = searchParams.get('carName');
      const payload = searchParamsCarName ? { name: searchParamsCarName } : {};

      const availableCarsList = await api.getCars(payload);
      setCars(availableCarsList);
    } catch (err) {
      createBasicToast('error', 'Erro ao buscar carros');
    } finally {
      setDataLoading(false);
    }
  }, [api, createBasicToast, searchParams, setCars]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <Container>
      <header>
        <Text as='h1' color='whitePrimary' family='archivo' weight='semibold' size='xxlarge'>
          Listagem
        </Text>
        <Text size='small' weight='regular' family='archivo' color='gray400'>
          {dataLoading ? '' : `${cars?.length ?? 0} carro(s)`}
        </Text>
      </header>
      <Content>
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormTextInput
              name='carName'
              labelIcon={SearchIcon}
              placeholder='Qual carro você procura?'
              wrapperClassName='input-search'
              inputRootClassName='input-root'
              onLabelClick={methods.handleSubmit(setSearchResults)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  methods.handleSubmit(setSearchResults)();
                }
              }}
            />
          </form>
        </FormProvider>

        {dataLoading ? <SearchLoading /> : <SearchResults cars={cars} />}
      </Content>
      <Navbar />
    </Container>
  );
}
