import { Text } from '../../../../components/Text';
import { Container } from './styles';

import { TEXT } from '../../constants';

import { ReactComponent as CalendarIcon } from '../../../../assets/calendar.svg';
import { ReactComponent as StepIndicatorIcon } from '../../../../assets/01.svg';

export function Step1() {
  return (
    <Container>
      <div className='main-content'>
        <div className='upper-section'>
          <CalendarIcon className='calendar-icon' />
          <StepIndicatorIcon />
        </div>

        <div className='presentation-container'>
          <Text as='h1' color='gray700' size='huge' weight='bold' family='archivo' lineHeight={42}>
            {TEXT.STEP1.TITLE}
          </Text>
          <Text as='h3' color='gray500' size='small' weight='regular' lineHeight={24}>
            {TEXT.STEP1.SUBTITLE}
          </Text>
        </div>
      </div>
    </Container>
  );
}
