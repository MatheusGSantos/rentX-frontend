import { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';

import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { useRentRange } from '@hooks/rentRange';

import { ReactComponent as ArrowDown } from '@assets/arrow-down-simple.svg';
import { ReactComponent as LongArrowRight } from '@assets/long-arrow-right.svg';

import { Container, Content } from './styles';
import 'react-calendar/dist/Calendar.css';

function DateRangeSelector() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { rentRange, setRentRange } = useRentRange();

  const minimumDate = useMemo(() => {
    const returnValue = new Date();
    const hours = returnValue.getUTCHours() - 3; // GMT -3
    if (hours > 17) {
      returnValue.setDate(returnValue.getDate() + 1);
    } else {
      returnValue.setDate(returnValue.getDate());
    }

    return returnValue;
  }, []);

  useEffect(() => {
    if (rentRange) console.info('rentRange', rentRange.toString());
  }, [rentRange]);

  const renderDateInfoSection = useCallback(
    () => (
      <div className='date-info-section'>
        <div className='label-date-pair'>
          <Text as='h2' family='archivo' weight='medium' size='xxsmall' color='gray700'>
            DE
          </Text>
          <Text as='p' size='medium' weight='medium'>
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
        {expanded ? (
          <LongArrowRight />
        ) : (
          <ArrowDown onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }} />
        )}
        <div className='label-date-pair'>
          <Text as='h2' family='archivo' weight='medium' size='xxsmall' color='gray700'>
            ATÉ
          </Text>
          <Text as='p' size='medium' weight='medium'>
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
    [expanded, rentRange],
  );

  return (
    <Container fullsize={expanded} id='expandable-div'>
      {expanded && (
        <Text
          as='h1'
          family='archivo'
          weight='semibold'
          size='xxxlarge'
          lineHeight={34}
          className='presentation'
        >
          Escolha a data e encontre um carro.
        </Text>
      )}
      {renderDateInfoSection()}
      {expanded && (
        <Content>
          <Calendar
            onChange={setRentRange}
            value={rentRange}
            returnValue='range'
            selectRange
            minDate={minimumDate}
          />
          <Button onClick={() => setExpanded(!expanded)}>Confirmar</Button>
        </Content>
      )}
    </Container>
  );
}

export default DateRangeSelector;
