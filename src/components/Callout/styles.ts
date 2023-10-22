import { darken } from 'polished';
import styled from 'styled-components';

type ContainerProps = {
  variant: 'info' | 'warning' | 'error';
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'info':
        return theme.colors.lightBlue;
      case 'warning':
        return theme.colors.lightYellow;
      case 'error':
        return theme.colors.redHover;
      default:
        return theme.colors.lightBlue;
    }
  }};

  svg {
    width: 20px !important;
    height: 20px !important;
    color: ${({ theme, variant }) => {
      switch (variant) {
        case 'info':
          return darken(0.4, theme.colors.lightBlue);
        case 'warning':
          return darken(0.6, theme.colors.lightYellow);
        case 'error':
          return theme.colors.redPrimary;
        default:
          return darken(0.4, theme.colors.lightBlue);
      }
    }};
  }
`;
