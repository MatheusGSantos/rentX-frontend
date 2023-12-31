import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@hooks/auth';

type HandlerTypes = 'security' | 'logged';

interface RedirectHandlerProps {
  children: React.ReactElement;
  handlerType: HandlerTypes;
}

function RedirectHandler({ children, handlerType }: RedirectHandlerProps) {
  const { user } = useAuth();
  const location = useLocation();

  switch (handlerType) {
    // User unauthorized, redirect to login page
    case 'security':
      return !user ? <Navigate to='/login' state={{ from: location }} replace /> : children;
    case 'logged':
      // User already logged in, redirect to home
      return !user ? children : <Navigate to='/' state={{ from: location }} replace />;
    default:
      return children;
  }
}

export default RedirectHandler;
