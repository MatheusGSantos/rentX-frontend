import { AxiosInstance } from 'axios';
import api from './api';
import { ILoginDTO } from './dtos/ILoginDTO';
import { ICreateUserDTO } from './dtos/ICreateUserDTO';
import { IUpdateUserDTO } from './dtos/IUpdateUserDTO';

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
    };
  }
}
