// Workflow Controller
// Handles API requests related to workflows

import BaseController from './BaseController';
import { WorkflowSummariesResponse } from '../types';
import { AxiosResponse } from 'axios';

export default class WorkflowController extends BaseController {
  constructor() {
    super('/api/v1/workflows');
  }

  /**
   * Get all workflows
   * @param status - Optional status filter
   * @param priority - Optional priority filter
   * @param search - Optional search term
   * @returns Promise with workflow summaries response
   */
  async getWorkflows(
    status?: string,
    priority?: string,
    search?: string
  ): Promise<AxiosResponse<WorkflowSummariesResponse>> {
    const params: Record<string, string> = {};
    if (status) params.status = status;
    if (priority) params.priority = priority;
    if (search) params.search = search;
    
    return this.get<WorkflowSummariesResponse>('', params);
  }

  /**
   * Get a specific workflow by ID
   * @param workflowId - ID of the workflow
   * @returns Promise with workflow summaries response
   */
  async getWorkflow(workflowId: string): Promise<AxiosResponse<WorkflowSummariesResponse>> {
    return this.get<WorkflowSummariesResponse>(`/${workflowId}`);
  }
}
