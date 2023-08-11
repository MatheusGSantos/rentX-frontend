import { Route, Routes } from 'react-router-dom';
import RedirectHandler from './RedirectHandler';
import { NotFound } from '../pages/NotFound';
// import { Home } from '../pages/Home';
// import LogIn from '../pages/LogIn';

export function RoutesIndexer() {
  return (
    <Routes>
      {/* <Route index element={<Home />} />
      <Route
        path='/login'
        element={
          <RedirectHandler handlerType='logged'>
            <LogIn />
          </RedirectHandler>
        }
      />
      <Route
        path='/signup'
        element={
          <RedirectHandler handlerType='logged'>
            <SignUp />
          </RedirectHandler>
        }
      /> */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
