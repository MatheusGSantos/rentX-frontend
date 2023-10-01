import { useCallback, useMemo, useState } from 'react';
import Calendar from 'react-calendar';

import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { useRentRange } from '@hooks/rentRange';

import { ReactComponent as ArrowDown } from '@assets/icons/arrow-down-simple.svg';
import { ReactComponent as LongArrowRight } from '@assets/icons/long-arrow-right.svg';
import { ReactComponent as ArrowRight } from '@assets/icons/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '@assets/icons/arrow-left.svg';

import { Container, Content } from './styles';
import 'react-calendar/dist/Calendar.css';

function DateRangeSelector() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { rentRange, setRentRange, saveRentRangeToLocalStore } = useRentRange();
  const confirmButtonDisabled = !Array.isArray(rentRange);

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

  function confirmDateRange() {
    saveRentRangeToLocalStore();
    setExpanded(false);
  }

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
            prev2Label={null}
            next2Label={null}
            prevLabel={<ArrowLeft />}
            nextLabel={<ArrowRight />}
            navigationLabel={({ date }) =>
              `${date
                .toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric',
                })
                .split(' de ')
                .join(' ')}`
            }
          />
          <Button onClick={confirmDateRange} disabled={confirmButtonDisabled}>
            Confirmar
          </Button>
        </Content>
      )}
    </Container>
  );
}

export default DateRangeSelector;
