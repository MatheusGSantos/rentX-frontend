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
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;

  .section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &#price-range-slider {
  }

  &#categories {
    #category-cards-container {
      display: flex;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray100};
      justify-content: space-between;
      padding: 2px;
    }
  }

  &#brands {
  }
`;

export const CategoryCard = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 106px;
  height: 66px;
  padding: 8px;
  gap: 8px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.whitePrimary : 'transparent'};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
  }

  svg g path {
    fill: ${({ selected, theme }) => (selected ? theme.colors.redPrimary : theme.colors.gray400)};
  }

  p {
    color: ${({ theme, selected }) => (selected ? theme.colors.gray700 : theme.colors.gray400)};
  }
`;
