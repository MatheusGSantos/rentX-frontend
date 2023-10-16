import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

export const StyledFormTextInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledFormTextInputRoot = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const StyledFormTextInputLabelIcon = styled.div<{ hasError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: ${({ theme, hasError }) =>
    hasError ? theme.colors.redPrimary : theme.colors.gray200};

  path {
    fill: ${({ theme, hasError }) => (hasError ? theme.colors.gray300 : theme.colors.gray500)};
  }

  ${({ theme, onClick }) =>
    onClick &&
    `
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.gray300};
    }
  `}
`;

export const StyledFormTextInputInputWrapper = styled.div<{ hasError: boolean }>`
  flex: 1;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.redPrimary : theme.colors.gray200)};
  background-color: ${({ theme }) => theme.colors.gray200};
  padding: 16px;
  gap: 4px;
`;

export const StyledFormTextInputInput = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  flex: 1;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fontFamily.inter};

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray400};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`;

export const StyledFormTextInputRightIcon = styled.div<{ isButton?: () => void }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.colors.gray500};
  }
`;
