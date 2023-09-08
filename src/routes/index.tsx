import { Route, Routes } from 'react-router-dom';
import { NotFound } from '@pages/NotFound';
import { Onboard } from '@pages/Onboard';
import { Welcome } from '@pages/Welcome';
import RedirectHandler from './RedirectHandler';
// import { Home } from '../pages/Home';
// import LogIn from '../pages/LogIn';

export function RoutesIndexer() {
  return (
    <Routes>
      <Route
        path='/onboard'
        element={
          <RedirectHandler handlerType='logged'>
            <Onboard />
          </RedirectHandler>
        }
      />
      <Route
        path='/welcome'
        element={
          <RedirectHandler handlerType='logged'>
            <Welcome />
          </RedirectHandler>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
