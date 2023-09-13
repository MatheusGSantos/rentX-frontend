import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { StyledButtonProps } from './types';

export const Container = styled.button<StyledButtonProps>`
  border: 0;
  padding: 1rem;
  transition: background-color 0.2s ease-in-out;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  flex: 1;

  ${({ theme, variant, disabled }) => {
    if (variant === 'secondary') {
      return css`
        background-color: ${theme.colors.blackSecondary};
        color: ${disabled ? theme.colors.gray400 : theme.colors.whitePrimary};
        &:hover {
          background-color: ${disabled
            ? theme.colors.blackSecondary
            : lighten(0.1, theme.colors.blackSecondary)};
        }
      `;
    }

    if (variant === 'ghost') {
      return css`
        background-color: transparent;
        color: ${disabled ? theme.colors.gray400 : theme.colors.whitePrimary};
        &:hover {
          color: ${disabled ? theme.colors.gray400 : theme.colors.gray200};
        }
      `;
    }

    // primary
    return css`
      background-color: ${disabled ? theme.colors.redDisabled : theme.colors.redPrimary};
      color: ${disabled ? theme.colors.gray200 : theme.colors.whitePrimary};
      &:hover {
        background-color: ${disabled
          ? theme.colors.redDisabled
          : lighten(0.1, theme.colors.redPrimary)};
      }
    `;
  }}
`;
