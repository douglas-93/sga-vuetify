import axios from "axios";

export class BaseService<T> {
  private _axios: axios.AxiosInstance;
  private _url: string = 'http://localhost:5000/api';

  constructor(path: string) {
    this._axios = axios;
    this._url += path;
  }

  async getAll(): Promise<T[]> {
    return await this._axios.get(this._url);
  }

  async getBy(data: T): Promise<T[]> {
    return await this._axios.post(`${this._url}/l`, data);
  }

  async create(data: T): Promise<T> {
    return await this._axios.post(this._url, data);
  }
}
