import styled from 'styled-components';

export const Container = styled.div<{ fullsize: boolean }>`
  transition: max-height 0.3s ease-out;
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
  z-index: 4;

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
    font-weight: ${({ theme }) => theme.fontWeights.medium} !important;
  }

  .react-calendar__tile--range:not(.react-calendar__tile--rangeStart):not(
      .react-calendar__tile--rangeEnd
    ) {
    background-color: ${({ theme }) => theme.colors.redHover};
    color: ${({ theme }) => theme.colors.redPrimary};
    font-weight: ${({ theme }) => theme.fontWeights.medium} !important;
  }

  .react-calendar__month-view__weekdays {
    margin-bottom: 16px;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    color: ${({ theme }) => theme.colors.gray400};
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Archivo', sans-serif;
    font-weight: 600;
    font-size: 10px;
    letter-spacing: 0.8px;
  }

  .react-calendar__navigation button:disabled {
    background-color: ${({ theme }) => theme.colors.whitePrimary};
  }

  .react-calendar__navigation__arrow:not(:disabled) {
    svg g path {
      fill: ${({ theme }) => theme.colors.gray500};
    }
  }

  .react-calendar__navigation button:enabled:focus {
    background-color: ${({ theme }) => theme.colors.whitePrimary};
  }

  .react-calendar__tile:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray400};
  }

  .react-calendar__month-view__days__day {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray700};
  }

  .react-calendar__tile--active {
    color: ${({ theme }) => theme.colors.whitePrimary};
  }

  .react-calendar__tile--now {
    background-color: ${({ theme }) => theme.colors.whitePrimary};
  }

  .react-calendar__tile {
    padding: 16px;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;
