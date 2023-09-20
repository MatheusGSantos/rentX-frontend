import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  max-height: 960px;
  max-width: 1366px;

  .logo {
    margin-bottom: 60px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 16px;

    .done {
      margin-bottom: 24px;
    }

    p {
      max-width: 155px;
    }
  }
  .button {
    margin-top: 80px;
    width: 80px;
  }
`;
