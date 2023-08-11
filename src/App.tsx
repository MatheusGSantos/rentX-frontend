import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesIndexer } from './routes';

import AppProvider from './hooks';

import GlobalStyle from './styles/global';

export function App() {
  return (
    <Router>
      <AppProvider>
        <RoutesIndexer />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
}
