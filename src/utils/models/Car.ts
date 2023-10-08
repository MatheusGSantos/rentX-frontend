import { CategoryName } from './Category';

export type Car = {
  id: string;
  name: string;
  brand: string;
  available: boolean;
  carImage: string;
  dailyRate: number;
  description: string;
  licensePlate: string;
  fineAmount: number;
  category: {
    id: string;
    name: CategoryName;
    icon: string;
  };
};
