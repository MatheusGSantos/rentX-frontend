import { Route, Routes } from 'react-router-dom';

import { NotFound } from '@pages/NotFound';
import { Onboard } from '@pages/Onboard';
import { Welcome } from '@pages/Welcome';
import { Signin } from '@pages/Signin';
import { Login } from '@pages/Login';
import { Wrapper } from '@pages/Wrapper';
import { SuccessPage } from '@pages/SuccessPage';
import { Edit, Info } from '@pages/Profile';
import { Home } from '@pages/Home';
import { List } from '@pages/List';

import RedirectHandler from './RedirectHandler';

export function RoutesIndexer() {
  return (
    <Routes>
      <Route path='/' element={<Wrapper />}>
        <Route index element={<Home />} />
        <Route path='list' element={<List />} />
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
        <Route
          path='/login'
          element={
            <RedirectHandler handlerType='logged'>
              <Login />
            </RedirectHandler>
          }
        />
        <Route path='/success' element={<SuccessPage />} />
        <Route
          path='profile'
          element={
            <RedirectHandler handlerType='security'>
              <Info />
            </RedirectHandler>
          }
        />
        <Route
          path='profile/edit'
          element={
            <RedirectHandler handlerType='security'>
              <Edit />
            </RedirectHandler>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
