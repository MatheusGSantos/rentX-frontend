import { MAX_STEPS } from '@pages/Onboard/constants';
import { ReactComponent as RightArrow } from '@assets/icons/arrow-right.svg';
import { Container, ProgressBarContainer } from './styles';

type StepBarProps = {
  index: number;
  onDotClick: (index: number) => void;
  onArrowClick: () => void;
};

export function StepBar({ index, onDotClick, onArrowClick }: StepBarProps) {
  return (
    <Container>
      <ProgressBarContainer>
        {Array.from({ length: MAX_STEPS }).map((_, i) => (
          <button
            key={`progressDot-${i}`}
            type='button'
            className={`${i === index && 'active'}`}
            aria-label={`Step ${i + 1}`}
            onClick={() => onDotClick(i)}
          />
        ))}
      </ProgressBarContainer>
      <RightArrow onClick={onArrowClick} />
    </Container>
  );
}
