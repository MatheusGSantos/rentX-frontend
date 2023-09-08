import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.blackPrimary};
  width: 100%;
  height: 100vh;
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.main`
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 850px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex: 1;
  }

  .presentation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    flex: 1;

    h1 {
      text-align: center;
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 26px;

    .button-container {
      display: flex;
      gap: 16px;
    }
  }
`;
