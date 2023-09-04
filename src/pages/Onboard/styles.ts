import styled from 'styled-components';

export const Container = styled.main`
  background-color: ${({ theme }) => theme.colors.whitePrimary};
  width: 100%;
  height: 100vh;
  padding: 0 32px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
