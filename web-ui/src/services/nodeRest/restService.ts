import axios from 'axios';
import { RequestParams } from './restService.types';

const baseUrl = 'http://127.0.0.1:10000';

export class NodeRestService {
  static async post<T>(params: RequestParams) {
    return axios
      .post<T>(baseUrl, params.data, params.config)
      .then((response) => response.data);
  }
}
