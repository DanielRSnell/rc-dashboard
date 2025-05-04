// Version Controller
// Handles API requests related to version information

import BaseController from './BaseController';
import { VersionResponse } from '../types';
import { AxiosResponse } from 'axios';

export default class VersionController extends BaseController {
  constructor() {
    super('/api/v1/version');
  }

  /**
   * Get version information
   * @returns Promise with version response
   */
  async getVersion(): Promise<AxiosResponse<VersionResponse>> {
    return this.get<VersionResponse>();
  }
}
