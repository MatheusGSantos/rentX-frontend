import React from 'react';
import { AuthProvider } from './auth';
import { RentxToastProvider } from './useToast';
import { RentRangeProvider } from './rentRange';

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <RentxToastProvider>
      <AuthProvider>
        <RentRangeProvider>{children}</RentRangeProvider>
      </AuthProvider>
    </RentxToastProvider>
  );
}

export default AppProvider;
