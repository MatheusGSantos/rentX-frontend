import { Car } from '@utils/models/Car';
import { Category } from '@utils/models/Category';
import { createContext, useContext, useMemo, ReactNode, useState } from 'react';

interface StoreContextData {
  cars: Car[];
  categories: Category[];
  brands: string[];
  setCars: (cars: Car[]) => void;
  setCategories: (categories: Category[]) => void;
  setBrands: (brands: string[]) => void;
}

interface StoreProviderProps {
  children: ReactNode;
}

const StoreContext = createContext<StoreContextData>({} as StoreContextData);

function StoreProvider({ children }: StoreProviderProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  return (
    <StoreContext.Provider
      value={useMemo(
        () => ({ cars, categories, brands, setCars, setCategories, setBrands }),
        [cars, categories, brands, setCars, setCategories, setBrands],
      )}
    >
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  const context = useContext(StoreContext);

  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
}

export { StoreProvider, useStore };
