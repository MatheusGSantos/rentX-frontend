import { Route, Routes } from 'react-router-dom';
import { NotFound } from '@pages/NotFound';
import { Onboard } from '@pages/Onboard';
import { Welcome } from '@pages/Welcome';
import { Signin } from '@pages/Signin';

import RedirectHandler from './RedirectHandler';

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
      <Route
        path='/signin'
        element={
          <RedirectHandler handlerType='logged'>
            <Signin />
          </RedirectHandler>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
