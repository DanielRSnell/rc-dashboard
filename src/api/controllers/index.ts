// Controllers Index
// Export all controllers for easy importing

import BaseController from './BaseController';
import BandwidthController from './BandwidthController';
import ComputePoolsController from './ComputePoolsController';
import DashboardController from './DashboardController';
import DeviceController from './DeviceController';
import TopologyController from './TopologyController';
import UsageAccountingController from './UsageAccountingController';
import VersionController from './VersionController';
import WorkflowController from './WorkflowController';

export {
  BaseController,
  BandwidthController,
  ComputePoolsController,
  DashboardController,
  DeviceController,
  TopologyController,
  UsageAccountingController,
  VersionController,
  WorkflowController
};

// Create instances of controllers for direct use
export const bandwidthController = new BandwidthController();
export const computePoolsController = new ComputePoolsController();
export const dashboardController = new DashboardController();
export const deviceController = new DeviceController();
export const topologyController = new TopologyController();
export const usageAccountingController = new UsageAccountingController();
export const versionController = new VersionController();
export const workflowController = new WorkflowController();
