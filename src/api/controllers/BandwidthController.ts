// Bandwidth Controller
// Handles API requests related to bandwidth data

import BaseController from './BaseController';
import { BandwidthResponse } from '../types';
import { AxiosResponse } from 'axios';

export default class BandwidthController extends BaseController {
  constructor() {
    super('/api/v1/bandwidth');
  }

  /**
   * Get info about a specific device's bandwidth
   * @param deviceId - ID of the device
   * @returns Promise with bandwidth response
   */
  async getDeviceBandwidth(deviceId: number): Promise<AxiosResponse<BandwidthResponse>> {
    return this.get<BandwidthResponse>(`/${deviceId}`);
  }
}
