import styled from 'styled-components';
import * as RadixUICheckbox from '@radix-ui/react-checkbox';

export const StyledCheckboxRoot = styled(RadixUICheckbox.Root)`
  width: 20px;
  height: 20px;
  padding: 6px;
  border: none;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.blackPrimary : theme.colors.gray200};
  transition: all 0.2s ease-in-out;
`;

export const StyledCheckboxIndicator = styled(RadixUICheckbox.CheckboxIndicator)<{
  checked: RadixUICheckbox.CheckedState;
}>`
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.whitePrimary : theme.colors.gray200};
  width: 8px;
  height: 8px;
`;
