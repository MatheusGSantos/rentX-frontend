import { Navbar } from '@components/Navbar';
import { Text } from '@components/Text';
import { ReactComponent as FilterIcon } from '@assets/icons/parameters.svg';
import { Card } from '@components/Card';
import { useRentRange } from '@hooks/rentRange';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '@services/ApiService';
import { useStore } from '@hooks/store';
import { Loader } from '@components/Loader';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { IGetCarsDTO } from '@services/dtos/IGetCarsDTO';
import DateRangeSelector from './components/DateRangeSelector';

import { Container, Content, Results } from './styles';
import { FilterModal } from './components/FilterModal';

export function Home() {
  const api = useMemo(() => new ApiService(), []);
  const { rentRange } = useRentRange();
  const { cars, setCars } = useStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    const availableCarsList = await api.getCars({
      ...(Object.fromEntries(searchParams.entries()) as IGetCarsDTO),
    });
    setCars(availableCarsList);
    setLoading(false);
  }, [api, searchParams, setCars]);

  useEffect(() => {
    if (rentRange) {
      fetchCars();
    }
  }, [fetchCars, rentRange]);

  const renderResults = useCallback(() => {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 220px)',
          }}
        >
          <Loader />
        </div>
      );
    }

    if (!cars?.length) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 220px)',
          }}
        >
          <Text size='medium' weight='medium' family='archivo' color='gray400'>
            Nenhum carro encontrado
          </Text>
        </div>
      );
    }

    return cars.map((car) => (
      <Card
        key={car.id}
        car={car}
        onClick={() => navigate(`/cars/${car.id}/details/`, { state: { fromNavigation: true } })}
      />
    ));
  }, [cars, loading, navigate]);

  return (
    <Container>
      <DateRangeSelector rentRange={rentRange} />
      <Content>
        <header>
          <Text size='xxlarge' weight='semibold' family='archivo' color='gray700'>
            Resultados
          </Text>

          <div>
            <Text size='small' weight='regular' family='archivo' color='gray400'>
              {loading ? '' : `${cars?.length ?? 0} carro(s)`}
            </Text>
            <FilterIcon onClick={() => setModalIsOpen(true)} className='clickable' />
          </div>
        </header>

        <Results className='RX-scroll'>{renderResults()}</Results>
      </Content>
      <Navbar />
      <FilterModal open={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </Container>
  );
}
