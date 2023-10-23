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
  getDifferenceInDays: () => number;
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

      if (!!start && !!end) {
        const startDate = new Date(start);
        const todayDate = new Date();

        startDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        if (startDate >= todayDate) {
          return [new Date(start), new Date(end)] as Value;
        }
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

  const getDifferenceInDays = useCallback(() => {
    if (Array.isArray(rentRange)) {
      const [start, end] = rentRange;
      if (start && end) {
        const formattedStart = new Date(start);
        const formattedEnd = new Date(end);

        formattedEnd.setHours(0, 0, 0, 0);
        formattedStart.setHours(0, 0, 0, 0);

        const differenceInTime = Math.abs(formattedEnd.getTime() - formattedStart.getTime());
        return Math.ceil(differenceInTime / (1000 * 3600 * 24));
      }

      return 0;
    }
    return 0;
  }, [rentRange]);

  return (
    <RentRangeContext.Provider
      value={useMemo(
        () => ({ rentRange, setRentRange, saveRentRangeToLocalStorage, getDifferenceInDays }),
        [rentRange, setRentRange, saveRentRangeToLocalStorage, getDifferenceInDays],
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
