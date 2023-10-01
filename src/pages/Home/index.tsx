import DateRangeSelector from './components/DateRangeSelector';
import { Container, Content } from './styles';

export function Home() {
  return (
    <Container>
      <DateRangeSelector />
      <Content>
        <h1>Home</h1>
      </Content>
    </Container>
  );
}
