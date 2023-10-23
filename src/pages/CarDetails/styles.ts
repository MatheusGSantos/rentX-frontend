import styled from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.whitePrimary};

  header {
    padding: 16px 16px 0;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 16px;
  gap: 16px;

  #category {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
  }

  img {
    width: 280px;
    margin-bottom: 16px;
  }

  .date-info-section {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;

    svg {
      margin: auto 0;

      path {
        fill: ${({ theme }) => theme.colors.gray400};
      }
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

export const InfoSection = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* gap: 32px; */
  width: 100%;
`;

export const InfoSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  h3 {
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
`;

export const InfoSectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  hr {
    border: none;
    height: 1px;
    width: 95%;
    margin: 24px auto;
    background-color: ${({ theme }) => theme.colors.gray300};
    color: ${({ theme }) => theme.colors.gray300};
  }

  #description {
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    gap: 8px;
  }

  #fine-amount {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const InfoSectionCategoryCard = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray100};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  gap: 12px;
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
