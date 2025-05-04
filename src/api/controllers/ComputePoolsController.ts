// Compute Pools Controller
// Handles API requests related to compute pools

import BaseController from './BaseController';
import { 
  ComputePoolResponse, 
  ComputePoolsResponse, 
  CreateComputePoolRequest, 
  UpdateComputePoolRequest,
  ComputePoolsActivitiesResponse
} from '../types';
import { AxiosResponse } from 'axios';

export default class ComputePoolsController extends BaseController {
  constructor() {
    super('/api/v1/pools');
  }

  /**
   * Get all known compute pools
   * @returns Promise with compute pools response
   */
  async getComputePools(): Promise<AxiosResponse<ComputePoolsResponse>> {
    return this.get<ComputePoolsResponse>();
  }

  /**
   * Get info about a specific compute pool
   * @param poolId - ID of the compute pool
   * @returns Promise with compute pool response
   */
  async getComputePool(poolId: string): Promise<AxiosResponse<ComputePoolResponse>> {
    return this.get<ComputePoolResponse>(`/${poolId}`);
  }

  /**
   * Create a new compute pool
   * @param request - Create compute pool request data
   * @returns Promise with the created compute pool
   */
  async createComputePool(request: CreateComputePoolRequest): Promise<AxiosResponse<ComputePoolResponse>> {
    return this.post<ComputePoolResponse>('', request);
  }

  /**
   * Update an existing compute pool
   * @param poolId - ID of the compute pool to update
   * @param request - Update compute pool request data
   * @returns Promise with the updated compute pool
   */
  async updateComputePool(
    poolId: string, 
    request: UpdateComputePoolRequest
  ): Promise<AxiosResponse<ComputePoolResponse>> {
    return this.put<ComputePoolResponse>(`/${poolId}`, request);
  }

  /**
   * Delete a compute pool
   * @param poolId - ID of the compute pool to delete
   * @returns Promise with the response
   */
  async deleteComputePool(poolId: string): Promise<AxiosResponse<void>> {
    return this.delete<void>(`/${poolId}`);
  }

  /**
   * Get activity for compute pools
   * @param poolId - Optional pool ID to filter activities
   * @returns Promise with compute pools activities response
   */
  async getComputePoolsActivity(poolId?: string): Promise<AxiosResponse<ComputePoolsActivitiesResponse>> {
    const params = poolId ? { poolId } : {};
    return this.get<ComputePoolsActivitiesResponse>('/activity', params);
  }
}
