import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.whitePrimary};

  overflow-y: scroll;

  /* width */
  &::-webkit-scrollbar {
    width: 0.325rem;
    position: absolute;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    position: absolute;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
    position: absolute;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
    position: absolute;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;

  max-width: 400px;

  padding: 40px 24px;

  .presentation {
    width: 100%;
    padding-right: 40%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 120px;

    #presentation-title,
    #presentation-paragraph {
      max-width: 155px;
    }
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
  button {
    margin-top: 32px;
  }
  .extra {
    display: flex;
  }
`;
