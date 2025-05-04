// Base Controller
// This class provides common functionality for all API controllers

import apiClient from '../index';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class BaseController {
  protected basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  /**
   * Make a GET request to the API
   * @param endpoint - The endpoint to call (will be appended to basePath)
   * @param params - Query parameters
   * @param config - Additional axios config
   * @returns Promise with the response
   */
  protected async get<T>(
    endpoint: string = '',
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    const url = `${this.basePath}${endpoint}`;
    return apiClient.get<T>(url, { ...config, params });
  }

  /**
   * Make a POST request to the API
   * @param endpoint - The endpoint to call (will be appended to basePath)
   * @param data - Request body data
   * @param config - Additional axios config
   * @returns Promise with the response
   */
  protected async post<T>(
    endpoint: string = '',
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    const url = `${this.basePath}${endpoint}`;
    return apiClient.post<T>(url, data, config);
  }

  /**
   * Make a PUT request to the API
   * @param endpoint - The endpoint to call (will be appended to basePath)
   * @param data - Request body data
   * @param config - Additional axios config
   * @returns Promise with the response
   */
  protected async put<T>(
    endpoint: string = '',
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    const url = `${this.basePath}${endpoint}`;
    return apiClient.put<T>(url, data, config);
  }

  /**
   * Make a DELETE request to the API
   * @param endpoint - The endpoint to call (will be appended to basePath)
   * @param config - Additional axios config
   * @returns Promise with the response
   */
  protected async delete<T>(
    endpoint: string = '',
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    const url = `${this.basePath}${endpoint}`;
    return apiClient.delete<T>(url, config);
  }
}
