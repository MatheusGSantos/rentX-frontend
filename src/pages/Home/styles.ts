import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.whitePrimary};
  flex: 1;
  width: 100%;
`;
