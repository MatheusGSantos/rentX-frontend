import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  width: 100%;
  height: 57px;
  padding: 16px 0;

  background-color: ${({ theme }) => theme.colors.whitePrimary};
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};

  display: flex;
  align-items: center;
  justify-content: space-around;

  li {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex: 1;
    height: 100%;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    div.active {
      path {
        fill: ${({ theme }) => theme.colors.redPrimary};
      }

      &::after {
        content: '';
        width: 4px;
        height: 2px;
        background-color: ${({ theme }) => theme.colors.redPrimary};
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    svg {
      position: relative;
      path {
        fill: ${({ theme }) => theme.colors.gray400};
      }
    }
  }
`;
