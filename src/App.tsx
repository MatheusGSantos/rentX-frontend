import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesIndexer } from './routes';
import AppProvider from './hooks';

export function App() {
  return (
    <Router>
      <AppProvider>
        <RoutesIndexer />
      </AppProvider>

      {/* <CssBaseline /> */}
    </Router>
  );
}
