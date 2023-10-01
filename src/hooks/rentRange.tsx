import { createContext, useContext, useMemo, ReactNode, useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface RentRangeContextData {
  rentRange: Value;
  setRentRange: (range: Value) => void;
}

interface RentRangeProviderProps {
  children: ReactNode;
}

const RentRangeContext = createContext<RentRangeContextData>({} as RentRangeContextData);

function RentRangeProvider({ children }: RentRangeProviderProps) {
  const [rentRange, setRentRange] = useState<Value>(null);

  return (
    <RentRangeContext.Provider
      value={useMemo(() => ({ rentRange, setRentRange }), [rentRange, setRentRange])}
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
