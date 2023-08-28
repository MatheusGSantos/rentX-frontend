import { ReactNode } from 'react';
import theme from '../../styles/theme';

export type TextProps = {
  children: string | ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';
  size?: keyof typeof theme.fontSizes;
  family?: keyof typeof theme.fontFamily;
  weight?: keyof typeof theme.fontWeights;
  color?: keyof typeof theme.colors;
  lineHeight?: number;
};

export type StyledTextProps = Omit<TextProps, 'children' | 'as'>;
