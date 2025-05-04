// Usage Accounting Controller
// Handles API requests related to usage accounting

import BaseController from './BaseController';
import { UsageActivePidsResponse, UsageAccountingStatsResponse } from '../types';
import { AxiosResponse } from 'axios';

export default class UsageAccountingController extends BaseController {
  constructor() {
    super('/api/v1/usage');
  }

  /**
   * Get all known PIDs sorted by age
   * @returns Promise with active PIDs response
   */
  async getActivePids(): Promise<AxiosResponse<UsageActivePidsResponse>> {
    return this.get<UsageActivePidsResponse>('/pids');
  }

  /**
   * Get usage for PID, sorted by timestamp, descending
   * @param pid - Process ID
   * @returns Promise with usage accounting stats response
   */
  async getPidHistory(pid: number): Promise<AxiosResponse<UsageAccountingStatsResponse>> {
    return this.get<UsageAccountingStatsResponse>(`/pids/${pid}/history`);
  }
}
