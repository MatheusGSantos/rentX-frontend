import styled from 'styled-components';

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  button {
    width: auto;
    color: ${({ theme }) => theme.colors.gray400};
    padding: 0;
    font-size: ${({ theme }) => theme.fontSizes.small};

    &:hover {
      color: ${({ theme }) => theme.colors.gray400};
    }
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  margin-bottom: 40px;
  background-color: ${({ theme }) => theme.colors.gray300};
  color: ${({ theme }) => theme.colors.gray300};
`;

export const ModalSection = styled.section`
  display: 'flex';
  flex-direction: 'column';
  gap: '16px';

  .section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
