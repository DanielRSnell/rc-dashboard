// API Usage Examples
// This file provides examples of how to use the API controllers

import {
  bandwidthController,
  computePoolsController,
  dashboardController,
  deviceController,
  topologyController,
  usageAccountingController,
  versionController,
  workflowController
} from './controllers';

// Example: How to use ComputePoolsController
export const computePoolsExample = async () => {
  try {
    // Get all compute pools
    const allPools = await computePoolsController.getComputePools();
    console.log('All compute pools:', allPools.data);

    // Get a specific compute pool
    const poolId = 'example-pool-id';
    const specificPool = await computePoolsController.getComputePool(poolId);
    console.log(`Compute pool ${poolId}:`, specificPool.data);

    // Create a new compute pool
    const newPool = await computePoolsController.createComputePool({
      name: 'New Compute Pool',
      description: 'Example compute pool created via API',
      nodeTypes: [
        { type: 'cpu', count: 4 },
        { type: 'gpu', count: 2 }
      ],
      tags: ['example', 'development']
    });
    console.log('Created new compute pool:', newPool.data);

    // Update a compute pool
    const updatedPool = await computePoolsController.updateComputePool(poolId, {
      name: 'Updated Compute Pool',
      description: 'Example compute pool updated via API',
      nodeTypes: [
        { type: 'cpu', count: 8 },
        { type: 'gpu', count: 4 }
      ],
      tags: ['example', 'development', 'updated']
    });
    console.log('Updated compute pool:', updatedPool.data);

    // Delete a compute pool
    await computePoolsController.deleteComputePool(poolId);
    console.log(`Compute pool ${poolId} deleted`);

    // Get compute pool activities
    const activities = await computePoolsController.getComputePoolsActivity(poolId);
    console.log(`Activities for compute pool ${poolId}:`, activities.data);
  } catch (error) {
    console.error('Error in compute pools example:', error);
  }
};

// Example: How to use DashboardController
export const dashboardExample = async () => {
  try {
    // Get dashboard overview
    const overview = await dashboardController.getDashboardOverview();
    console.log('Dashboard overview:', overview.data);

    // Get stats
    const stats = await dashboardController.getStats();
    console.log('Dashboard stats:', stats.data);

    // Get silicon allocation
    const siliconAllocation = await dashboardController.getSiliconAllocation();
    console.log('Silicon allocation:', siliconAllocation.data);

    // Get resource utilization
    const resourceUtilization = await dashboardController.getResourceUtilization();
    console.log('Resource utilization:', resourceUtilization.data);

    // Get recent workflows with limit
    const recentWorkflows = await dashboardController.getRecentWorkflows(5);
    console.log('Recent workflows (limit 5):', recentWorkflows.data);

    // Get CPU utilization grid
    const cpuUtilizationGrid = await dashboardController.getCpuUtilizationGrid();
    console.log('CPU utilization grid:', cpuUtilizationGrid.data);
  } catch (error) {
    console.error('Error in dashboard example:', error);
  }
};

// Example: How to use WorkflowController
export const workflowExample = async () => {
  try {
    // Get all workflows
    const allWorkflows = await workflowController.getWorkflows();
    console.log('All workflows:', allWorkflows.data);

    // Get workflows with filters
    const filteredWorkflows = await workflowController.getWorkflows('running', 'high', 'test');
    console.log('Filtered workflows:', filteredWorkflows.data);

    // Get a specific workflow
    const workflowId = 'example-workflow-id';
    const specificWorkflow = await workflowController.getWorkflow(workflowId);
    console.log(`Workflow ${workflowId}:`, specificWorkflow.data);
  } catch (error) {
    console.error('Error in workflow example:', error);
  }
};

// Example: How to use other controllers
export const otherControllersExample = async () => {
  try {
    // Version controller
    const version = await versionController.getVersion();
    console.log('Version info:', version.data);

    // Device controller
    const devices = await deviceController.getDevices();
    console.log('All devices:', devices.data);
    
    const deviceId = 123;
    const device = await deviceController.getDevice(deviceId);
    console.log(`Device ${deviceId}:`, device.data);

    // Topology controller
    const topologies = await topologyController.getTopologies();
    console.log('All topologies:', topologies.data);
    
    const topology = await topologyController.getTopology(deviceId);
    console.log(`Topology for device ${deviceId}:`, topology.data);

    // Bandwidth controller
    const bandwidth = await bandwidthController.getDeviceBandwidth(deviceId);
    console.log(`Bandwidth for device ${deviceId}:`, bandwidth.data);

    // Usage accounting controller
    const activePids = await usageAccountingController.getActivePids();
    console.log('Active PIDs:', activePids.data);
    
    const pid = 456;
    const pidHistory = await usageAccountingController.getPidHistory(pid);
    console.log(`History for PID ${pid}:`, pidHistory.data);
  } catch (error) {
    console.error('Error in other controllers example:', error);
  }
};
