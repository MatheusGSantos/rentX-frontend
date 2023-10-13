import { Navbar } from '@components/Navbar';
import { Text } from '@components/Text';
import { ReactComponent as FilterIcon } from '@assets/icons/parameters.svg';
import { Card } from '@components/Card';
import { useRentRange } from '@hooks/rentRange';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '@services/ApiService';
import { useStore } from '@hooks/store';
import { Loader } from '@components/Loader';

import DateRangeSelector from './components/DateRangeSelector';

import { Container, Content, Results } from './styles';
import { FilterModal } from './components/FilterModal';

export function Home() {
  const { rentRange } = useRentRange();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const api = useMemo(() => new ApiService(), []);
  const { cars, setCars } = useStore();

  const fetchCars = useCallback(async () => {
    setLoading(true);
    const availableCarsList = await api.getCars();
    setCars(availableCarsList);
    setLoading(false);
  }, [api, setCars]);

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

    return cars.map((car) => <Card key={car.id} car={car} />);
  }, [cars, loading]);

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
              {loading ? '' : `${cars?.length ?? 0} carros`}
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
