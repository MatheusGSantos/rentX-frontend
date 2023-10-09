import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@utils/localStorageUtils';
import { createContext, useContext, useMemo, ReactNode, useState, useCallback } from 'react';

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface RentRangeContextData {
  rentRange: Value;
  setRentRange: (range: Value) => void;
  saveRentRangeToLocalStorage: () => void;
}

interface RentRangeProviderProps {
  children: ReactNode;
}

const RentRangeContext = createContext<RentRangeContextData>({} as RentRangeContextData);

function RentRangeProvider({ children }: RentRangeProviderProps) {
  const [rentRange, setRentRange] = useState<Value>(() => {
    const rentRangeFromLocalStorage = getLocalStorageItem('rentRange');
    if (rentRangeFromLocalStorage) {
      const [start, end] = JSON.parse(rentRangeFromLocalStorage);
      if (!!start && !!end && new Date(start) > new Date()) {
        return [new Date(start), new Date(end)] as Value;
      }

      removeLocalStorageItem('rentRange');
    }
    return null;
  });

  const saveRentRangeToLocalStorage = useCallback(() => {
    if (Array.isArray(rentRange)) {
      const [start, end] = rentRange;
      setLocalStorageItem('rentRange', JSON.stringify([start?.toISOString(), end?.toISOString()]));
    } else {
      setLocalStorageItem('rentRange', JSON.stringify(null));
    }
  }, [rentRange]);

  return (
    <RentRangeContext.Provider
      value={useMemo(
        () => ({ rentRange, setRentRange, saveRentRangeToLocalStorage }),
        [rentRange, setRentRange, saveRentRangeToLocalStorage],
      )}
    >
      {children}
    </RentRangeContext.Provider>
  );
}

function useRentRange() {
  const context = useContext(RentRangeContext);

  if (!context) throw new Error('useRentRange must be used within a RentRangeProvider');
  return context;
}

export { RentRangeProvider, useRentRange };
