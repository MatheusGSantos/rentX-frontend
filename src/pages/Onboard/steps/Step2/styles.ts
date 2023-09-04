import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.whitePrimary};
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    flex: 1;
    gap: 90px;
  }

  .upper-section {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .car-icon {
      height: 80px;
      width: 80px;

      g path {
        fill: ${({ theme }) => theme.colors.redPrimary};
      }
    }
  }

  .presentation-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 200px;
  }
`;
