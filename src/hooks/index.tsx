import React from 'react';
import { AuthProvider } from './auth';
import { RentxToastProvider } from './useToast';
import { RentRangeProvider } from './rentRange';
import { StoreProvider } from './store';

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <RentxToastProvider>
      <AuthProvider>
        <RentRangeProvider>
          <StoreProvider>{children}</StoreProvider>
        </RentRangeProvider>
      </AuthProvider>
    </RentxToastProvider>
  );
}

export default AppProvider;
