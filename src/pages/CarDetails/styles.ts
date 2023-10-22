import styled from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.whitePrimary};

  header {
    padding: 24px 16px;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 280px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  gap: 24px;
  background-color: ${({ theme }) => theme.colors.gray100};

  #price-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    #label-and-daily-rent {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
`;
