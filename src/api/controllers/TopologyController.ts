// Topology Controller
// Handles API requests related to device topology

import BaseController from './BaseController';
import { TopologyResponse } from '../types';
import { AxiosResponse } from 'axios';

export default class TopologyController extends BaseController {
  constructor() {
    super('/api/v1/topology');
  }

  /**
   * Get all known topologies
   * @returns Promise with topology response
   */
  async getTopologies(): Promise<AxiosResponse<TopologyResponse>> {
    return this.get<TopologyResponse>();
  }

  /**
   * Get info about a specific device's topology
   * @param deviceId - ID of the device
   * @returns Promise with topology response
   */
  async getTopology(deviceId: number): Promise<AxiosResponse<TopologyResponse>> {
    return this.get<TopologyResponse>(`/${deviceId}`);
  }
}
