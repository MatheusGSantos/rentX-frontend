import React, { createContext, useCallback, useState, useContext, useMemo } from 'react';
import { To, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@utils/localStorageUtils';

import { ApiService } from '@services/ApiService';
import api from '@services/api';
import { useRentxToast } from './useToast';

export interface User {
  id: string;
  name: string;
  email: string;
  driverLicense: string;
  isAdmin: boolean;
  createdAt: string;
  numberOfRentals: number;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  login(
    credentials: SignInCredentials,
    rememberMe: boolean,
    setLoading?: (state: boolean) => void,
    redirectTo?: To,
  ): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const apiService = useMemo(() => new ApiService(), []);
  const [data, setData] = useState<AuthState>(() => {
    const token = getLocalStorageItem('token');
    const user = getLocalStorageItem('user');

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const { createLoadingToast, updateToast } = useRentxToast();

  const signOut = useCallback(() => {
    removeLocalStorageItem('token');
    removeLocalStorageItem('user');

    setData({} as AuthState);
  }, []);

  const login = useCallback(
    async (
      { email, password }: SignInCredentials,
      rememberMe: boolean,
      setLoading?: (state: boolean) => void,
      redirectTo?: To,
    ) => {
      if (setLoading) setLoading(true);
      const id = createLoadingToast('Aguarde...');
      try {
        const response = await apiService.login({
          email,
          password,
        });

        const { user, token } = response.data;

        if (rememberMe) {
          setLocalStorageItem('token', token);
          setLocalStorageItem('user', JSON.stringify(user));
        }

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setData({ token, user });
        updateToast(id, {
          render: 'Logged in successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        if (window.location.pathname === '/login') navigate(redirectTo ?? '/');
      } catch (err) {
        if (err instanceof AxiosError)
          updateToast(id, {
            render: `Error: ${err?.response?.data?.message}`,
            type: 'error',
            isLoading: false,
            autoClose: 4000,
            hideProgressBar: false,
          });
        else
          updateToast(id, {
            render: `Error: ${err}`,
            type: 'error',
            isLoading: false,
            autoClose: 4000,
            hideProgressBar: false,
          });
      } finally {
        if (setLoading) setLoading(false);
      }
    },
    [apiService, createLoadingToast, navigate, updateToast],
  );

  const updateUser = useCallback(
    (user: User) => {
      setLocalStorageItem('user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ user: data.user, login, signOut, updateUser }),
        [data.user, login, signOut, updateUser],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
