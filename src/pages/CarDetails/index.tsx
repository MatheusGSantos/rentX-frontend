import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Text } from '@components/Text';
import { Button } from '@components/Button';

import { ReactComponent as LeftArrow } from '@assets/icons/arrow-left.svg';

import { Car } from '@utils/models/Car';
import { useRentRange } from '@hooks/rentRange';

import { ApiService } from '@services/ApiService';
import { Callout } from '@components/Callout';
import { Container, Content, Footer } from './styles';

export function CarDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { carId } = useParams();
  const { rentRange, getDifferenceInDays } = useRentRange();
  const api = useMemo(() => new ApiService(), []);

  const [loading, setLoading] = useState<boolean>(false);
  const [carDetails, setCarDetails] = useState<Car>();

  const rentRangeDifference = useMemo(() => getDifferenceInDays(), [getDifferenceInDays]);
  const dailyRentInfo = useMemo(() => {
    if (carDetails && rentRangeDifference) {
      const stringTail = rentRangeDifference > 1 ? 's' : '';
      return `R$ ${carDetails.dailyRate} x ${rentRangeDifference} diária${stringTail}`;
    }
    return '-';
  }, [carDetails, rentRangeDifference]);

  const fetchCarDetails = useCallback(async () => {
    if (!carDetails && carId) {
      try {
        setLoading(true);
        const [carInfo] = await api.getCarInfo(carId);
        setCarDetails(carInfo);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  }, [api, carDetails, carId]);

  useEffect(() => {
    fetchCarDetails();
  }, [carId, fetchCarDetails]);

  return (
    <Container>
      <header>
        <LeftArrow onClick={() => navigate(state?.goBackTo ?? '/')} />
      </header>
      <Content>
        {carDetails?.carImage && <img src={`/images/${carDetails.carImage}`} alt='Car' />}
        {!rentRangeDifference && (
          <Callout variant='error' message='Escolha o período de aluguél antes de continuar' />
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
        <Button id='confirmButton' onClick={() => {}}>
          Alugar agora
        </Button>
      </Footer>
    </Container>
  );
}
