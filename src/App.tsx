import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Slide, ToastContainer } from 'react-toastify';
import { RoutesIndexer } from './routes';

import AppProvider from './hooks';

import GlobalStyle from './styles/global';
import theme from './styles/theme';

export function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <RoutesIndexer />
        </AppProvider>
      </ThemeProvider>

      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        style={{ marginTop: '5rem' }}
      />
      <GlobalStyle />
    </Router>
  );
}
