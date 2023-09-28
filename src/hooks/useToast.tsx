import { createContext, useContext, useMemo, ReactNode, useCallback } from 'react';
import { Id, UpdateOptions, toast } from 'react-toastify';

type RentxToastType = 'error' | 'success' | 'info';

interface RentxToastContextData {
  createBasicToast: (toastType: RentxToastType, message: string, screenTime?: number) => void;
  createLoadingToast: (message: string) => Id;
  updateToast: (id: Id, options: UpdateOptions) => void;
  dismissToast: (id: Id) => void;
}

interface RentxToastProviderProps {
  children: ReactNode;
}

const DEFAULT_TOAST_PROPS = {
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  closeButton: true,
};

const RentxToastContext = createContext<RentxToastContextData>({} as RentxToastContextData);

function RentxToastProvider({ children }: RentxToastProviderProps) {
  const createBasicToast = useCallback(
    (toastType: RentxToastType, message: string, screenTime?: number) => {
      switch (toastType) {
        case 'error':
          return toast.error(message, {
            ...DEFAULT_TOAST_PROPS,
            autoClose: screenTime ?? DEFAULT_TOAST_PROPS.autoClose,
          });
        case 'success':
          return toast.success(message, {
            ...DEFAULT_TOAST_PROPS,
            autoClose: screenTime ?? DEFAULT_TOAST_PROPS.autoClose,
          });
        case 'info':
          return toast.info(message, {
            ...DEFAULT_TOAST_PROPS,
            autoClose: screenTime ?? DEFAULT_TOAST_PROPS.autoClose,
          });
        default:
          return toast(message, {
            ...DEFAULT_TOAST_PROPS,
            autoClose: screenTime ?? DEFAULT_TOAST_PROPS.autoClose,
          });
      }
    },
    [],
  );

  const createLoadingToast = useCallback((message: string) => toast.loading(message), []);

  const updateToast = useCallback(
    (id: Id, options: UpdateOptions) => toast.update(id, { ...DEFAULT_TOAST_PROPS, ...options }),
    [],
  );

  return (
    <RentxToastContext.Provider
      value={useMemo(
        () => ({ createBasicToast, createLoadingToast, updateToast, dismissToast: toast.dismiss }),
        [createBasicToast, createLoadingToast, updateToast],
      )}
    >
      {children}
    </RentxToastContext.Provider>
  );
}

function useRentxToast() {
  const context = useContext(RentxToastContext);

  if (!context) throw new Error('useRentxToast must be used within a RentxToastProvider');
  return context;
}

export { RentxToastProvider, useRentxToast };
