import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RoutesIndexer } from 'routes';

import AppProvider from 'hooks';

import GlobalStyle from '@styles/global';
import theme from '@styles/theme';

export function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <RoutesIndexer />
        </AppProvider>
      </ThemeProvider>
      <GlobalStyle />
    </Router>
  );
}
