import { CATEGORY_ICONS, CategoryName } from '@utils/models/Category';
import { Text } from '@components/Text';
import { Container, Description } from './styles';

type CardProps = {
  id: string;
  carImage: string;
  name: string;
  brand: string;
  dailyRate: number;
  category: CategoryName;
  onClick?: () => void;
};

export function Card({
  id,
  name,
  brand,
  carImage,
  category,
  dailyRate,
  onClick = () => {},
}: CardProps) {
  const CategoryIcon = CATEGORY_ICONS[category];

  return (
    <Container id={id} key={id} onClick={onClick}>
      <Description>
        <div className='card-text-group'>
          <Text as='h4' color='gray400' family='archivo' weight='medium' size='xxsmall'>
            {brand}
          </Text>
          <Text color='gray700' family='archivo' weight='medium' size='medium'>
            {name}
          </Text>
        </div>
        <div className='daily-and-category-group'>
          <div className='card-text-group'>
            <Text as='h4' color='gray400' family='archivo' weight='medium' size='xxsmall'>
              AO DIA
            </Text>
            <Text color='redPrimary' family='archivo' weight='medium' size='medium'>
              R$ {dailyRate}
            </Text>
          </div>
          {CategoryIcon && <CategoryIcon />}
        </div>
      </Description>
      <img src={`src/assets/images/${carImage}`} alt='Car' />
    </Container>
  );
}

Card.defaultProps = {
  onClick: () => {},
};
