import { AxiosInstance } from 'axios';
import api from './api';
import { ILoginDTO } from './dtos/ILoginDTO';
import { ICreateUserDTO } from './dtos/ICreateUserDTO';
import { IUpdateUserDTO } from './dtos/IUpdateUserDTO';
import { IGetCarsDTO } from './dtos/IGetCarsDTO';
import { ICreateRentalDTO } from './dtos/ICreateRentalDTO';

export class ApiService {
  private api: AxiosInstance = api;

  public async createUser(user: ICreateUserDTO): Promise<void> {
    await this.api.post('/users', user);
  }

  public async updateUser(user: IUpdateUserDTO): Promise<void> {
    await this.api.patch('/users/profile', user);
  }

  public async login(payload: ILoginDTO) {
    return this.api.post('/sessions', payload);
  }

  public async getUserProfile() {
    const { data } = await this.api.get('/users/profile');
    return {
      name: data.name || '',
      email: data.email || '',
      driverLicense: data.driverLicense || '',
      numberOfRentals: data.numberOfRentals || 0,
    };
  }

  public async getCategories() {
    const { data } = await this.api.get('/categories');
    return data;
  }

  public async getCarBrands() {
    const { data } = await this.api.get('/cars/brands');
    return data;
  }

  public async getCars(params: IGetCarsDTO = {}) {
    let queryParams = '';

    if (Object.keys(params).length > 0) {
      queryParams += '?';

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          const [min, max] = value;

          queryParams += `${key}=${min}-${max}&`;
        } else if (value) {
          queryParams += `${key}=${value}&`;
        }
      });
    }

    const { data } = await this.api.get(`/cars/available${queryParams}`);

    return data;
  }

  public async getUserRentals() {
    const { data } = await this.api.get('/rentals/user');
    return data;
  }

  public async createRental(rental: ICreateRentalDTO) {
    await this.api.post('/rentals', rental);
  }

  public async endRental(rentalId: string) {
    await this.api.post(`/rentals/${rentalId}/end`);
  }

  public async getCarInfo(carId: string) {
    const { data } = await this.api.get(`/cars/available?id=${carId}`);
    return data;
  }
}
