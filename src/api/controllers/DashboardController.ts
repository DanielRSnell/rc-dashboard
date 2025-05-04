// Dashboard Controller
// Handles API requests related to dashboard data

import BaseController from './BaseController';
import { 
  StatsResponse, 
  SiliconAllocationResponse, 
  ResourceUtilizationResponse, 
  DashboardOverviewResponse,
  RecentWorkflowsResponse,
  ComputePoolsResponse
} from '../types';
import { AxiosResponse } from 'axios';

export default class DashboardController extends BaseController {
  constructor() {
    super('/api/v1/dashboard');
  }

  /**
   * Get dashboard overview data
   * @returns Promise with dashboard overview response
   */
  async getDashboardOverview(): Promise<AxiosResponse<DashboardOverviewResponse>> {
    return this.get<DashboardOverviewResponse>('/overview');
  }

  /**
   * Get stats data
   * @returns Promise with stats response
   */
  async getStats(): Promise<AxiosResponse<StatsResponse>> {
    return this.get<StatsResponse>('/stats');
  }

  /**
   * Get silicon allocation data
   * @returns Promise with silicon allocation response
   */
  async getSiliconAllocation(): Promise<AxiosResponse<SiliconAllocationResponse>> {
    return this.get<SiliconAllocationResponse>('/silicon-allocation');
  }

  /**
   * Get resource utilization data
   * @returns Promise with resource utilization response
   */
  async getResourceUtilization(): Promise<AxiosResponse<ResourceUtilizationResponse>> {
    return this.get<ResourceUtilizationResponse>('/resource-utilization');
  }

  /**
   * Get recent workflows
   * @param limit - Optional limit for number of workflows to return
   * @returns Promise with recent workflows response
   */
  async getRecentWorkflows(limit?: number): Promise<AxiosResponse<RecentWorkflowsResponse>> {
    const params = limit ? { limit } : {};
    return this.get<RecentWorkflowsResponse>('/recent-workflows', params);
  }

  /**
   * Get CPU utilization grid
   * @returns Promise with compute pools response
   */
  async getCpuUtilizationGrid(): Promise<AxiosResponse<ComputePoolsResponse>> {
    return this.get<ComputePoolsResponse>('/cpu-utilization-grid');
  }
}
