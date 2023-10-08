import { CATEGORY_ICONS } from '@utils/models/Category';
import { Text } from '@components/Text';
import { Car } from '@utils/models/Car';
import { Container, Description } from './styles';

type CardProps = {
  car: Car;
  onClick?: () => void;
};

export function Card({ car, onClick = () => {} }: CardProps) {
  const CategoryIcon = CATEGORY_ICONS[car.category.name];

  return (
    <Container id={car.id} key={car.id} onClick={onClick}>
      <Description>
        <div className='card-text-group'>
          <Text as='h4' color='gray400' family='archivo' weight='medium' size='xxsmall'>
            {car.brand}
          </Text>
          <Text color='gray700' family='archivo' weight='medium' size='medium'>
            {car.name}
          </Text>
        </div>
        <div className='daily-and-category-group'>
          <div className='card-text-group'>
            <Text as='h4' color='gray400' family='archivo' weight='medium' size='xxsmall'>
              AO DIA
            </Text>
            <Text color='redPrimary' family='archivo' weight='medium' size='medium'>
              R$ {car.dailyRate}
            </Text>
          </div>
          {CategoryIcon && <CategoryIcon />}
        </div>
      </Description>
      <img src={`src/assets/images/${car.carImage}`} alt='Car' />
    </Container>
  );
}

Card.defaultProps = {
  onClick: () => {},
};
