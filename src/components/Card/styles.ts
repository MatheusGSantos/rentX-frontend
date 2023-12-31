import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.gray100};
  gap: 16px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  img {
    width: 167px;
    height: 85px;
  }

  &:hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  }
`;

export const Description = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;

  .card-text-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .daily-and-category-group {
    display: flex;
    align-items: flex-end;
    gap: 24px;

    svg g path {
      fill: ${({ theme }) => theme.colors.gray400};
    }
  }

  h4 {
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }
`;
