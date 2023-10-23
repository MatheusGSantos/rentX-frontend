import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Text } from '@components/Text';
import { Button } from '@components/Button';

import { ReactComponent as LeftArrow } from '@assets/icons/arrow-left.svg';
import { ReactComponent as LongArrowRight } from '@assets/icons/long-arrow-right.svg';

import { Car } from '@utils/models/Car';
import { useRentRange } from '@hooks/rentRange';

import { ApiService } from '@services/ApiService';
import { Callout } from '@components/Callout';
import { Loader } from '@components/Loader';
import { CATEGORY_ICONS } from '@utils/models/Category';
import { useStore } from '@hooks/store';
import { useRentxToast } from '@hooks/useToast';
import { AxiosError } from 'axios';
import {
  Container,
  Content,
  Footer,
  InfoSection,
  InfoSectionCategoryCard,
  InfoSectionContainer,
  InfoSectionHeader,
} from './styles';

function Loading({ fullScreen = false }) {
  if (fullScreen)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 999,
          height: '100vh',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <Loader />
      </div>
    );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Loader />
    </div>
  );
}

function CarInfoSection({ car }: { car: Car }) {
  return (
    <InfoSection>
      <InfoSectionHeader>
        <div>
          <Text as='h3' size='xxsmall' weight='medium' color='gray400' family='archivo'>
            {car?.brand ?? '-'}
          </Text>
          <Text size='xxlarge' weight='medium' color='gray700' family='archivo'>
            {car?.name ?? '-'}
          </Text>
        </div>
        <div>
          <Text as='h3' size='xxsmall' weight='medium' color='gray400' family='archivo'>
            AO DIA
          </Text>
          <Text size='xxlarge' weight='medium' color='redPrimary' family='archivo'>
            R$ {car.dailyRate ?? '-'}
          </Text>
        </div>
      </InfoSectionHeader>

      <InfoSectionContainer>
        <hr />
        <div id='description'>
          <Text as='h2' size='large' weight='medium' color='gray700'>
            Sobre o veículo
          </Text>
          <Text size='small' weight='regular' color='gray500'>
            {car?.description ?? '-'}
          </Text>
        </div>
      </InfoSectionContainer>
    </InfoSection>
  );
}

export function CarDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { carId } = useParams();
  const { rentRange, getDifferenceInDays } = useRentRange();
  const { createBasicToast } = useRentxToast();
  const api = useMemo(() => new ApiService(), []);

  const [loading, setLoading] = useState<boolean>(false);
  const [carDetails, setCarDetails] = useState<Car>();
  const Icon = carDetails && CATEGORY_ICONS[carDetails?.category?.name];

  const rentRangeDifference = useMemo(() => getDifferenceInDays(), [getDifferenceInDays]);

  const dailyRentInfo = useMemo(() => {
    if (carDetails && rentRangeDifference) {
      const stringTail = rentRangeDifference > 1 ? 's' : '';
      return `R$ ${carDetails.dailyRate} x ${rentRangeDifference} diária${stringTail}`;
    }
    return '-';
  }, [carDetails, rentRangeDifference]);

  const { categories, setCategories } = useStore();

  useEffect(() => {
    if (!categories.length) {
      new ApiService()
        .getCategories()
        .then((categ) => setCategories(categ))
        .catch(() =>
          createBasicToast('error', 'Erro inesperado. Recarregue a página e tente novamente'),
        );
    }
  }, [categories, createBasicToast, setCategories]);

  const categoryDisplayName = useMemo(
    () => categories?.find((c) => c.id === carDetails?.category?.id)?.displayName,
    [categories, carDetails?.category?.id],
  );

  const fetchCarDetails = useCallback(async () => {
    if (!carDetails && carId) {
      try {
        setLoading(true);
        const [carInfo] = await api.getCarInfo(carId);
        setCarDetails(carInfo);
      } catch {
        createBasicToast('error', 'Erro inesperado. Recarregue a página e tente novamente');
      } finally {
        setLoading(false);
      }
    }
  }, [api, carDetails, carId, createBasicToast]);

  useEffect(() => {
    fetchCarDetails();
  }, [carId, fetchCarDetails]);

  const renderDateInfoSection = useCallback(
    () => (
      <div className='date-info-section'>
        <div className='label-date-pair'>
          <Text as='h2' family='archivo' weight='medium' size='xxsmall' color='gray500'>
            DE
          </Text>
          <Text as='p' size='medium' weight='medium' color='redPrimary'>
            {Array.isArray(rentRange)
              ? rentRange?.[0]
                  ?.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                  .split(' de ')
                  .join(' ')
              : ' - '}
          </Text>
        </div>
        <LongArrowRight />
        <div className='label-date-pair'>
          <Text as='h2' family='archivo' weight='medium' size='xxsmall' color='gray500'>
            ATÉ
          </Text>
          <Text as='p' size='medium' weight='medium' color='redPrimary'>
            {Array.isArray(rentRange)
              ? rentRange?.[1]
                  ?.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                  .split(' de ')
                  .join(' ')
              : ' - '}
          </Text>
        </div>
      </div>
    ),
    [rentRange],
  );

  const handleRentButtonClick = useCallback(async () => {
    if (!rentRangeDifference) {
      createBasicToast('error', 'Escolha o período de aluguél antes de continuar');
      return;
    }

    try {
      setLoading(true);

      const [startDate, endDate] = rentRange as [Date, Date];
      const { id } = carDetails as Car;

      if (!startDate || !endDate || startDate > endDate) {
        createBasicToast('error', 'A data de início deve ser anterior à data de término');
        return;
      }

      await api.createRental({
        carId: id,
        expectedReturnDate: endDate,
        startDate,
      });

      navigate('/success', {
        state: {
          title: 'Carro alugado!',
          paragraph:
            'Agora você só precisa ir até a concessionária da RENTX pegar o seu automóvel.',
          navigateTo: '/',
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error?.response?.status;

        if (status === 401) navigate('/login', { state: { goBackTo: `/cars/${carId}/details` } });
      } else
        createBasicToast(
          'error',
          'Ocorreu um erro ao executar o processo. Tente novamente mais tarde',
        );
    } finally {
      setLoading(false);
    }
  }, [api, carDetails, carId, createBasicToast, navigate, rentRange, rentRangeDifference]);

  return (
    <Container>
      <header>
        <LeftArrow
          onClick={() => (state?.fromNavigation ? navigate(-1) : navigate('/'))}
          style={{ cursor: 'pointer' }}
        />
      </header>
      <Content>
        <div id='category'>
          {Icon && (
            <InfoSectionCategoryCard>
              <Icon />
              <Text size='small' weight='medium' color='gray500'>
                {categoryDisplayName ?? '-'}
              </Text>
            </InfoSectionCategoryCard>
          )}
        </div>
        {carDetails?.carImage && <img src={`/images/${carDetails.carImage}`} alt='Car' />}
        {carDetails ? <CarInfoSection car={carDetails} /> : <Loading />}
        {renderDateInfoSection()}
        {!rentRangeDifference && (
          <Callout variant='error' message='Escolha o período de aluguél antes de continuar' />
        )}
        {carDetails && !!rentRangeDifference && (
          <Callout variant='info' message='Retiradas/Devoluções todos os dias às 12:00' />
        )}
      </Content>
      <Footer>
        <div id='price-info'>
          <div id='label-and-daily-rent'>
            <Text family='archivo' weight='medium' size='xxsmall' color='gray400'>
              TOTAL
            </Text>
            <Text weight='medium' size='medium' color='gray700'>
              {dailyRentInfo}
            </Text>
          </div>
          <Text id='totalPrice' size='xxlarge' weight='medium' family='archivo' color='gray700'>
            {!carDetails || !rentRangeDifference
              ? '-'
              : `R$ ${(carDetails.dailyRate * rentRangeDifference).toLocaleString('pt-BR')}`}
          </Text>
        </div>
        <Text color='redPrimary' family='archivo' weight='regular' size='small'>
          Atraso: R$ {carDetails?.fineAmount ?? '-'} / dia
        </Text>
        <Button
          id='confirmButton'
          onClick={handleRentButtonClick}
          disabled={!rentRangeDifference || loading || !carDetails}
        >
          Alugar agora
        </Button>
      </Footer>
      {loading && <Loading fullScreen />}
    </Container>
  );
}
