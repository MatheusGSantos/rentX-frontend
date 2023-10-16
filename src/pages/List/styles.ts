import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  header {
    padding: 32px 24px 54px;
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
  height: calc(100vh - 112px - 57px);

  form {
    width: 100%;
    padding: 0 16px;

    p.helperText {
      display: none;
    }
  }

  .input-search {
    margin-top: -28px;
    background-color: ${({ theme }) => theme.colors.whitePrimary};
  }

  .input-root {
    flex-direction: row-reverse;

    svg g path {
      fill: ${({ theme }) => theme.colors.gray700};
    }
  }

  .search-loading {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const SearchResultsContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: column;
  gap: 16px;
  padding: 16px 10px 16px 16px;

  .search-element {
    width: 100%;
    height: 70px;
    background-color: black;

    & + .search-element {
      margin-top: 16px;
    }
  }

  .rec {
    width: 100%;
    height: 56px;
    background-color: black;
  }
`;
