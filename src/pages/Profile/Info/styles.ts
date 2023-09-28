import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  header {
    margin-bottom: 160px;
    padding-top: 30px;
    display: flex;
    align-items: center;
    width: 100%;

    h1 {
      flex: 1;
      text-align: center;
    }

    svg {
      cursor: pointer;
      position: absolute;
      left: 12px;
    }
  }
`;

export const Content = styled.div`
  background-color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 24px 16px 24px;

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.gray300};
    margin-bottom: 24px;
    margin-top: -90px;
    border-radius: 50%;
    width: 180px;
    height: 180px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.whitePrimary};
    box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.25);

    svg {
      width: 100%;
      height: 100%;
    }
  }

  hr {
    border: none;
    height: 1px;
    width: 60%;
    margin: 16px 0 32px 0;
    background-color: ${({ theme }) => theme.colors.gray300};
    color: ${({ theme }) => theme.colors.gray300};
  }

  .info-loading {
    flex: 1;
    display: flex;
    padding-top: 100px;
    justify-content: center;
    width: 100%;
  }
`;
