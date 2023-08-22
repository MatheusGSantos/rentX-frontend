import styled from 'styled-components';
import { StyledTextProps } from './types';

export const StyledText = styled.p<StyledTextProps>`
  ${({ theme, color, size, weight, family }) => `
    color: ${color ? theme.colors[color] : 'inherit'};
    font-size: ${size ? theme.fontSizes[size] : 'inherit'};
    font-weight: ${weight ? theme.fontWeights[weight] : 'inherit'};
    font-family: ${family ? theme.fontFamily[family] : 'inherit'};
  `}
`;
