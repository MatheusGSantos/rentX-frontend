import { Text } from '@components/Text';
import { TEXT } from '@pages/Onboard/constants';

import { ReactComponent as CarIcon } from '@assets/car.svg';
import { ReactComponent as StepIndicatorIcon } from '@assets/02.svg';

import { Container } from './styles';

export function Step2() {
  return (
    <Container>
      <div className='main-content'>
        <div className='upper-section'>
          <CarIcon className='car-icon' />
          <StepIndicatorIcon />
        </div>

        <div className='presentation-container'>
          <Text as='h1' color='gray700' size='huge' weight='bold' family='archivo' lineHeight={42}>
            {TEXT.STEP2.TITLE}
          </Text>
          <Text as='h3' color='gray500' size='small' weight='regular' lineHeight={24}>
            {TEXT.STEP2.SUBTITLE}
          </Text>
        </div>
      </div>
    </Container>
  );
}
