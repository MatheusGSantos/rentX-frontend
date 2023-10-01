import { createContext, useContext, useMemo, ReactNode, useState, useCallback } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface RentRangeContextData {
  rentRange: Value;
  setRentRange: (range: Value) => void;
  saveRentRangeToLocalStore: () => void;
}

interface RentRangeProviderProps {
  children: ReactNode;
}

const RentRangeContext = createContext<RentRangeContextData>({} as RentRangeContextData);

function RentRangeProvider({ children }: RentRangeProviderProps) {
  const [rentRange, setRentRange] = useState<Value>(() => {
    const rentRangeFromLocalStorage = localStorage.getItem('rentRange');
    if (rentRangeFromLocalStorage) {
      const [start, end] = JSON.parse(rentRangeFromLocalStorage);
      if (start && end && new Date(start).getDay() > new Date().getDay()) {
        return [new Date(start), new Date(end)] as Value;
      }
    }
    return null;
  });

  const saveRentRangeToLocalStore = useCallback(() => {
    if (Array.isArray(rentRange)) {
      const [start, end] = rentRange;
      localStorage.setItem('rentRange', JSON.stringify([start?.toISOString(), end?.toISOString()]));
    } else {
      localStorage.setItem('rentRange', JSON.stringify(null));
    }
  }, [rentRange]);

  return (
    <RentRangeContext.Provider
      value={useMemo(
        () => ({ rentRange, setRentRange, saveRentRangeToLocalStore }),
        [rentRange, setRentRange, saveRentRangeToLocalStore],
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