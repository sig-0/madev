import axios from 'axios';
import { RequestParams } from './restService.types';

const baseUrl = '';

export class RestService {
  static async post<T>(params: RequestParams) {
    return axios
      .post<T>(`${baseUrl}/api/v1/${params.url}`, params.data, params.config)
      .then((response) => response.data);
  }

  static async get<T>(
    params: Omit<RequestParams, 'data'>,
    redirectOnUnauthorized?: boolean
  ) {
    return axios
      .get<T>(`${baseUrl}/api/v1/${params.url}`, {
        // headers: params.headers,
        params: params.config
      })
      .then((response) => response.data);
  }

  static async delete<T>(params: RequestParams) {
    return axios
      .delete(`${baseUrl}/api/v1/${params.url}`, {
        params: params.config,
        data: params.data
      })
      .then((response) => response.data);
  }

  static async put<T>(params: RequestParams) {
    return axios
      .put(`${baseUrl}/api/v1/${params.url}`, params.data, {
        params: params.config
      })
      .then((response) => response.data);
  }
}
