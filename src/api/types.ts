// API Types
// This file contains TypeScript interfaces for API requests and responses

// Common response types
export interface ApiResponse<T> {
  data: T;
  status: number;
}

// ComputePool types
export interface NodeType {
  type: string;
  count: number;
}

export interface ComputePoolResponse {
  id: string;
  name: string;
  description: string;
  status: string;
  region: string;
  provider: string;
  cpuUtilization: number;
  memoryUtilization: number;
  gpuUtilization: number;
  networkUtilization: number;
  nodeTypes: NodeType[];
}

export interface ComputePoolsResponse {
  pools: ComputePoolResponse[];
}

export interface CreateComputePoolRequest {
  name: string;
  description: string;
  nodeTypes: NodeType[];
  tags: string[];
}

export interface UpdateComputePoolRequest {
  name: string;
  description: string;
  nodeTypes: NodeType[];
  tags: string[];
}

export interface ComputePoolsActivitiesResponse {
  activities: any[]; // Define more specific type if needed
}

// Workflow types
export interface WorkflowSummary {
  id: string;
  name: string;
  status: string;
  priority: string;
  startTime: string;
  endTime?: string;
}

export interface WorkflowSummariesResponse {
  workflows: WorkflowSummary[];
}

export interface RecentWorkflowsResponse {
  workflows: WorkflowSummary[];
}

// Version type
export interface VersionResponse {
  version: string;
  buildTime: string;
  commitId: string;
}

// Usage types
export interface UsageActivePidsResponse {
  pids: number[];
}

export interface UsageAccountingStat {
  timestamp: string;
  metrics: Record<string, number>;
}

export interface UsageAccountingStatsResponse {
  stats: UsageAccountingStat[];
}

// Topology types
export interface TopologyResponse {
  devices: any[]; // Define more specific type if needed
}

// Device types
export interface DeviceResponse {
  devices: any[]; // Define more specific type if needed
}

// Dashboard types
export interface StatsResponse {
  stats: Record<string, number>;
}

export interface SiliconAllocationResponse {
  allocations: any[]; // Define more specific type if needed
}

export interface ResourceUtilizationResponse {
  utilization: Record<string, number>;
}

export interface DashboardOverviewResponse {
  stats: StatsResponse;
  siliconAllocation: SiliconAllocationResponse;
  resourceUtilization: ResourceUtilizationResponse;
  recentWorkflows: RecentWorkflowsResponse;
}

// Bandwidth types
export interface BandwidthResponse {
  name: string;
  deviceCount: number;
  transferSizeBytes: number;
  bandwidthMbPerSec: number;
}
