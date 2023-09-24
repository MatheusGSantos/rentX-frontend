import { AxiosInstance } from 'axios';
import api from './api';
import { ICreateUserDTO, ILoginDTO } from './dtos/ILoginDTO';

export class ApiService {
  private api: AxiosInstance = api;

  public async createUser(user: ICreateUserDTO): Promise<void> {
    await this.api.post('/users', user);
  }

  public async login(payload: ILoginDTO) {
    return this.api.post('/login', payload);
  }

  public async getUserProfile() {
    const { data } = await this.api.get('/users/profile');
    return { name: data.name as string, email: data.email as string };
  }
}
