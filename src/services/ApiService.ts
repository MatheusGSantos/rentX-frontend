import { AxiosInstance } from 'axios';
import api from './api';
import { ILoginDTO } from './dtos/ILoginDTO';
// import {
//   ICreateUserDTO,
//   IResultsFromSearchDTO,
//   IResultInfo,
//   IChatListDTO,
//   NewObjectDTO,
// } from './dtos';

export class ApiService {
  private api: AxiosInstance = api;

  // public async createUser(user: ICreateUserDTO): Promise<void> {
  //   await this.api.post('/user', user);
  // }

  public async login(payload: ILoginDTO) {
    return this.api.post('/login', payload);
  }
}
