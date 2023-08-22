import styled from 'styled-components';
import { StyledTextProps } from './types';

export const StyledText = styled.p<StyledTextProps>`
  ${({ theme, color, size, weight }) => `
    color: ${color ? theme.colors[color] : 'inherit'};
    font-size: ${size ? theme.fontSizes[size] : theme.fontSizes.medium};
    font-weight: ${weight ? theme.fontWeights[weight] : 'inherit'};
  `}
`;
