import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Loader } from '@components/Loader';
import { Text } from '@components/Text';

import { ApiService } from '@services/ApiService';

import { useRentxToast } from '@hooks/useToast';
import { Navbar } from '@components/Navbar';
import { Card } from '@components/Card';
import { AxiosError } from 'axios';
import { useAuth } from '@hooks/auth';
import { Rental } from '@utils/models/Rental';

import { ReactComponent as SmallArrowRight } from '@assets/icons/small-arrow-right.svg';

import { Container, Content, RentStatusContainer, RentalsListContainer } from './styles';

function SearchLoading() {
  return (
    <div className='loading-container'>
      <Loader />
    </div>
  );
}

function RentStatus({ rental }: { rental: Rental }) {
  const { endDate, expectedReturnDate } = rental;
  const today = new Date();
  const expectedReturnDateObj = new Date(expectedReturnDate);
  const differenceInDays =
    (today.getTime() - expectedReturnDateObj.getTime()) / (1000 * 60 * 60 * 24);

  const status = useMemo(() => {
    if (endDate) return 'finished';
    if (differenceInDays > 0) return 'delayed';
    return 'inProgress';
  }, [differenceInDays, endDate]);

  return (
    <RentStatusContainer status={status}>
      {status === 'inProgress' || status === 'delayed' ? (
        <Text
          as='h3'
          color={status === 'inProgress' ? 'greenPrimary' : 'redPrimary'}
          family='archivo'
          weight='medium'
          size='medium'
        >
          {status === 'inProgress'
            ? `Utilizando até ${new Date(rental.expectedReturnDate)
                .toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
                .split(' de ')
                .join(' ')}`
            : `Atrasado em ${Math.ceil(differenceInDays)} diária(s)`}
        </Text>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '32px',
          }}
        >
          <Text as='h4' color='gray400' family='archivo' weight='medium' size='xxsmall'>
            PERÍODO
          </Text>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Text as='h3' color='gray700' weight='regular' size='small'>
              {new Date(rental.startDate)
                .toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                .split(' de ')
                .join(' ')}
            </Text>
            <SmallArrowRight />
            <Text as='h3' color='gray700' weight='regular' size='small'>
              {new Date(rental.expectedReturnDate)
                .toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                .split(' de ')
                .join(' ')}
            </Text>
          </div>
        </div>
      )}
    </RentStatusContainer>
  );
}

function RentalsList({ rentals }: { rentals: Rental[] }) {
  const MemoizedRentStatus = memo(
    RentStatus,
    (prevProps, nextProps) => prevProps.rental.id === nextProps.rental.id,
  );

  if (rentals.length) {
    return (
      <RentalsListContainer className='RX-scroll'>
        {rentals.map((rental) => (
          <div id='card-and-status-container' key={rental.car.id}>
            <Card key={rental.car.id} car={rental.car} />
            <MemoizedRentStatus rental={rental} />
          </div>
        ))}
      </RentalsListContainer>
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
