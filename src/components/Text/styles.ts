import styled from 'styled-components';
import { StyledTextProps } from './types';

export const StyledText = styled.p<StyledTextProps>`
  ${({ theme, color, size, weight, family, className }) => `
    color: ${color ? theme.colors[color] : 'inherit'};
    font-size: ${size ? theme.fontSizes[size] : 'inherit'};
    font-weight: ${weight ? theme.fontWeights[weight] : 'inherit'};
    font-family: ${family ? theme.fontFamily[family] : 'inherit'};
    ${className?.includes('helperText') ? `height: ${theme.fontSizes.xsmall};` : ''}
  `}
`;
