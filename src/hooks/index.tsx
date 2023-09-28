import React from 'react';
import { AuthProvider } from './auth';
import { RentxToastProvider } from './useToast';

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <RentxToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </RentxToastProvider>
  );
}

export default AppProvider;
