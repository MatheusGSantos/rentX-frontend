import styled from 'styled-components';

export const Container = styled.div<{ fullsize: boolean }>`
  transition: max-height 0.5s ease-out;
  max-height: ${({ fullsize: fullSize }) => (fullSize ? '100vh' : '90px')};
  ${({ fullsize: fullSize }) => (fullSize ? 'height: 100%;' : '')}
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0;
  background-color: ${({ theme }) => theme.colors.blackPrimary};
  padding-top: 24px;
  display: flex;
  flex-direction: column;

  .presentation {
    max-width: 264px;
    margin-bottom: 48px;
    padding: 0 24px;
  }

  .date-info-section {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 24px 24px;

    svg {
      scale: 1.35;
      margin-bottom: 4px;
    }

    .label-date-pair {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    h2 {
      letter-spacing: 0.4px;
    }
  }
`;

export const Button = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
`;

export const Content = styled.div`
  padding: 40px 24px 24px;
  background-color: ${({ theme }) => theme.colors.whitePrimary};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .react-calendar {
    border: none;
  }

  .react-calendar__navigation__label__labelText {
    color: ${({ theme }) => theme.colors.gray700};
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: ${({ theme }) => theme.colors.redPrimary};
    background: ${({ theme }) => theme.colors.redPrimary};
  }

  .react-calendar__tile--range:not(.react-calendar__tile--rangeStart):not(.react-calendar__tile--rangeEnd) {
    background-color: ${({ theme }) => theme.colors.redDisabled};
  }
`;
