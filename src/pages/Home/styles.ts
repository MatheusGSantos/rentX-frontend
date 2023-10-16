import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 90px;
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.whitePrimary};

  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 90px - 57px);
  overflow: hidden;

  header {
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .clickable {
      cursor: pointer;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }
  }
`;

export const Results = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: column;
  gap: 16px;
  padding: 8px 10px 16px 16px;
`;
