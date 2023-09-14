import { createGlobalStyle } from 'styled-components';
import theme from './theme';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${theme.colors.blackPrimary};
    color: ${theme.colors.whitePrimary};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: ${theme.fontFamily.inter}, sans-serif;
    font-size: ${theme.fontSizes.medium};
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  #root {
    height: 100%;
  }

  .RX-scroll {
    /* width */
    &::-webkit-scrollbar {
      width: 0.375rem;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 8px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;
