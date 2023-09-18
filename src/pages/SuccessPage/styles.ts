import styled from 'styled-components';

export const Container = styled.div`
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
  }
  .done {
  }
  .button {
    width: 80px;
  }
`;
