import { useCallback, useEffect, useState } from 'react';
import { Button } from '@components/Button';
import Calendar from 'react-calendar';

import { ReactComponent as ArrowDown } from '@assets/arrow-down-simple.svg';
import { ReactComponent as LongArrowRight } from '@assets/long-arrow-right.svg';

import { Text } from '@components/Text';
import { Container, Content } from './styles';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function DateRangeSelector() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [value, onChange] = useState<Value>(new Date());

  useEffect(() => {
    console.info('value', value);
  }, [value]);

  const renderDateInfoSection = useCallback(
    () => (
      <div className='date-info-section'>
        <div className='label-date-pair'>
          <Text as='h2' family='archivo' weight='medium' size='xxsmall' color='gray700'>
            DE
          </Text>
          <Text as='p' size='medium' weight='medium'>
            16 Julho 2020
          </Text>
        </div>
        {expanded ? <LongArrowRight /> : <ArrowDown onClick={() => setExpanded(!expanded)} />}
        <div className='label-date-pair'>
          <Text as='h2' family='archivo' weight='medium' size='xxsmall' color='gray700'>
            ATÉ
          </Text>
          <Text as='p' size='medium' weight='medium'>
            20 Julho 2020
          </Text>
        </div>
      </div>
    ),
    [expanded],
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
          <Calendar onChange={onChange} value={value} returnValue='range' selectRange />
          <Button onClick={() => setExpanded(!expanded)}>Confirmar</Button>
        </Content>
      )}
    </Container>
  );
}

export default DateRangeSelector;
