// Device Controller
// Handles API requests related to devices

import BaseController from './BaseController';
import { DeviceResponse } from '../types';
import { AxiosResponse } from 'axios';

export default class DeviceController extends BaseController {
  constructor() {
    super('/api/v1/device');
  }

  /**
   * Get all known devices
   * @returns Promise with device response
   */
  async getDevices(): Promise<AxiosResponse<DeviceResponse>> {
    return this.get<DeviceResponse>();
  }

  /**
   * Get info about a specific device
   * @param deviceId - ID of the device
   * @returns Promise with device response
   */
  async getDevice(deviceId: number): Promise<AxiosResponse<DeviceResponse>> {
    return this.get<DeviceResponse>(`/${deviceId}`);
  }
}
