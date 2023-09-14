import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.whitePrimary};

  overflow-y: scroll;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 120px;
  min-height: 100vh;
  width: 100%;
  overflow-y: visible;

  max-width: 400px;

  padding: 90px 16px 40px 24px;

  .presentation {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    #presentation-title,
    #presentation-paragraph {
      max-width: 250px;
    }
  }

  .back-arrow {
    position: absolute;
    top: 20px;
    left: 8px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .checkbox-container {
    margin-top: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .login-button {
    margin-top: 32px;
  }
`;
