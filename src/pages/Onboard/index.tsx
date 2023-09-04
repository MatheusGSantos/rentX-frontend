import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';
import { Steps } from './steps';
import { StepBar } from './steps/components/StepBar';
import { MAX_STEPS } from './constants';

export function Onboard() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const changeStep = useCallback(
    (index: number) => index >= 0 && index !== step && index < MAX_STEPS && setStep(index),
    [step],
  );

  const onArrowClick = useCallback(() => {
    const nextStep = step + 1;

    if (nextStep === MAX_STEPS) navigate('/welcome');
    else changeStep(nextStep);
  }, [changeStep, navigate, step]);

  return (
    <Container>
      <Steps index={step} />
      <StepBar index={step} onDotClick={changeStep} onArrowClick={onArrowClick} />
    </Container>
  );
}
