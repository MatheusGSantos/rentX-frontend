import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Text } from '@components/Text';
import { Button } from '@components/Button';

import { ReactComponent as LeftArrow } from '@assets/icons/arrow-left.svg';

import { Car } from '@utils/models/Car';

import { Container, Content } from './styles';

export function CarDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { carId } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [carDetails, setCarDetails] = useState<Car>();

  return (
    <Container>
      <header>
        <LeftArrow className='back-arrow' onClick={() => navigate(state?.goBackTo ?? '/')} />
      </header>
      <Content />
      <footer>
        <div id='priceInfo'>
          <div id='label&dailyRent'>
            <Text family='archivo' weight='medium' size='xxsmall' color='gray400'>
              TOTAL
            </Text>
            <Text weight='medium' size='medium' color='gray700'>
              R$ 580 x3 diárias
            </Text>
          </div>
          <Text id='totalPrice' size='xxlarge' weight='medium' family='archivo' color='gray700'>
            R$ 2,900
          </Text>
        </div>
        <Button id='confirmButton' onClick={() => {}}>
          Alugar agora
        </Button>
      </footer>
    </Container>
  );
}
