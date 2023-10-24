import { Car } from './Car';

export type Rental = {
  id: string;
  carId: string;
  endDate: string;
  userId: string;
  expectedReturnDate: string;
  startDate: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  car: Car;
};
