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
      <RentRangeProvider>
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
      </RentRangeProvider>
    </RentxToastProvider>
  );
}

export default AppProvider;
