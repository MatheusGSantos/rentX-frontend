import { transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  header {
    padding: 32px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.whitePrimary};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 90px - 57px);

  .loading-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const RentalsListContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: column;
  gap: 16px;
  padding: 16px 10px 16px 16px;

  #card-and-status-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const RentStatusContainer = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;

  h4 {
    letter-spacing: 0.4px;
  }

  ${({ theme, status }) => {
    if (status === 'inProgress')
      return `
        background-color: ${theme.colors.greenHover};
        box-shadow: 2px 2px 4px ${transparentize(0.8, theme.colors.greenPrimary)};
        justify-content: center;
      `;

    if (status === 'delayed')
      return `
        background-color: ${theme.colors.redHover};
        box-shadow: 2px 2px 4px ${transparentize(0.8, theme.colors.redPrimary)};
        justify-content: center;
      `;
    return `
      background-color: ${theme.colors.gray100};
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    `;
  }};
`;
