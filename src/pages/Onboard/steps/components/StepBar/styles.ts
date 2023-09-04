import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  svg {
    cursor: pointer;
    margin-right: -16px;
  }
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > button {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray400};
    border: none;
  }

  > button.active {
    background-color: ${({ theme }) => theme.colors.gray700};
  }
`;
