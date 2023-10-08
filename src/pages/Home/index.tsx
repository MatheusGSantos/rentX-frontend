import { Navbar } from '@components/Navbar';
import { Text } from '@components/Text';
import { ReactComponent as FilterIcon } from '@assets/icons/parameters.svg';
import { Card } from '@components/Card';
import { useRentRange } from '@hooks/rentRange';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ApiService } from '@services/ApiService';
import { useStore } from '@hooks/store';
import DateRangeSelector from './components/DateRangeSelector';

import { Container, Content, Results } from './styles';

export function Home() {
  const { rentRange } = useRentRange();
  const [loading, setLoading] = useState<boolean>(false);
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

  console.info('Home', rentRange);

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
              X carros
            </Text>
            <FilterIcon />
          </div>
        </header>

        <Results className='RX-scroll'>
          {cars.map((car) => (
            <Card key={car.id} car={car} />
          ))}
        </Results>
      </Content>
      <Navbar />
    </Container>
  );
}
