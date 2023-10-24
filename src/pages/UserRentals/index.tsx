import { useCallback, useEffect, useMemo, useState } from 'react';

import { Loader } from '@components/Loader';
import { Text } from '@components/Text';

import { ApiService } from '@services/ApiService';

import { useRentxToast } from '@hooks/useToast';
import { Navbar } from '@components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/Card';
import { AxiosError } from 'axios';
import { useAuth } from '@hooks/auth';
import { Rental } from '@utils/models/Rental';
import { Container, Content, SearchResultsContainer } from './styles';

function SearchLoading() {
  return (
    <div className='loading-container'>
      <Loader />
    </div>
  );
}

function RentalsList({ rentals }: { rentals: Rental[] }) {
  if (rentals.length) {
    return (
      <SearchResultsContainer className='RX-scroll'>
        {rentals.map(({ car }) => (
          <Card key={car.id} car={car} />
        ))}
      </SearchResultsContainer>
    );
  }

  return null;
}

export function UserRentals() {
  const api = useMemo(() => new ApiService(), []);
  const { createBasicToast } = useRentxToast();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  const fetchUserRentals = useCallback(async () => {
    try {
      setLoading(true);

      const userRentals = await api.getUserRentals();
      setRentals(userRentals);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          signOut();
          createBasicToast('error', 'Sessão expirada, faça login novamente');
          return;
        }
      }
      createBasicToast('error', 'Erro ao buscar histórico de agendamentos');
    } finally {
      setLoading(false);
    }
  }, [api, createBasicToast, signOut]);

  useEffect(() => {
    if (!rentals.length) fetchUserRentals();
  }, [fetchUserRentals, rentals.length]);

  return (
    <Container>
      <header>
        <Text as='h1' color='whitePrimary' family='archivo' weight='semibold' size='xxlarge'>
          Agendamentos
        </Text>
        <Text size='small' weight='regular' family='archivo' color='gray400'>
          {loading ? '' : `${rentals?.length ?? 0} Agendamento(s)`}
        </Text>
      </header>
      <Content>{loading ? <SearchLoading /> : <RentalsList rentals={rentals} />}</Content>
      <Navbar />
    </Container>
  );
}
