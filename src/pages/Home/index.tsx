import { Navbar } from '@components/Navbar';
import { Text } from '@components/Text';
import { ReactComponent as FilterIcon } from '@assets/icons/parameters.svg';
import { Card } from '@components/Card';
import DateRangeSelector from './components/DateRangeSelector';

import { Container, Content, Results } from './styles';

export function Home() {
  return (
    <Container>
      <DateRangeSelector />
      <Content>
        <header>
          <Text size='xxlarge' weight='semibold' family='archivo' color='gray700'>
            Resultados
          </Text>

          <div>
            <Text size='small' weight='regular' family='archivo' color='gray400'>
              X carros
            </Text>
            <FilterIcon />
          </div>
        </header>

        <Results className='RX-scroll'>
          <Card
            id='lambo'
            brand='Lamborghini'
            name='Huracan'
            dailyRate={580}
            category='gas'
            carImage='Lambo.png'
          />
          <Card
            id='lambo2'
            brand='Lamborghini'
            name='Huracan'
            dailyRate={580}
            category='gas'
            carImage='Lambo.png'
          />
          <Card
            id='lambo3'
            brand='Lamborghini'
            name='Huracan'
            dailyRate={580}
            category='gas'
            carImage='Lambo.png'
          />
          <Card
            id='lambo4'
            brand='Lamborghini'
            name='Huracan'
            dailyRate={580}
            category='gas'
            carImage='Lambo.png'
          />
          <Card
            id='lambo5'
            brand='Lamborghini'
            name='Huracan'
            dailyRate={580}
            category='gas'
            carImage='Lambo.png'
          />
          <Card
            id='lambo6'
            brand='Lamborghini'
            name='Huracan'
            dailyRate={580}
            category='gas'
            carImage='Lambo.png'
          />
        </Results>
      </Content>
      <Navbar />
    </Container>
  );
}
