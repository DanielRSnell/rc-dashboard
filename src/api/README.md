# API Module

This module provides a clean and organized structure for interacting with the backend API endpoints defined in the swagger.json specification.

## Structure

- `index.ts` - Main entry point that exports all controllers and types
- `types.ts` - TypeScript interfaces for API requests and responses
- `examples.ts` - Usage examples for all controllers
- `controllers/` - Directory containing all API controllers
  - `BaseController.ts` - Base class that all controllers extend
  - `BandwidthController.ts` - Handles bandwidth-related endpoints
  - `ComputePoolsController.ts` - Handles compute pool-related endpoints
  - `DashboardController.ts` - Handles dashboard-related endpoints
  - `DeviceController.ts` - Handles device-related endpoints
  - `TopologyController.ts` - Handles topology-related endpoints
  - `UsageAccountingController.ts` - Handles usage accounting-related endpoints
  - `VersionController.ts` - Handles version-related endpoints
  - `WorkflowController.ts` - Handles workflow-related endpoints
  - `index.ts` - Exports all controllers

## Usage

### Importing Controllers

You can import the pre-instantiated controller instances:

```typescript
import { 
  bandwidthController,
  computePoolsController,
  dashboardController,
  deviceController,
  topologyController,
  usageAccountingController,
  versionController,
  workflowController
} from '@/api';
```

Or import the controller classes if you need to create your own instances:

```typescript
import { 
  BandwidthController,
  ComputePoolsController,
  DashboardController,
  DeviceController,
  TopologyController,
  UsageAccountingController,
  VersionController,
  WorkflowController
} from '@/api';
```

### Example Usage

```typescript
// Get all compute pools
const getAllComputePools = async () => {
  try {
    const response = await computePoolsController.getComputePools();
    return response.data;
  } catch (error) {
    console.error('Error fetching compute pools:', error);
    throw error;
  }
};

// Get a specific compute pool
const getComputePool = async (poolId: string) => {
  try {
    const response = await computePoolsController.getComputePool(poolId);
    return response.data;
  } catch (error) {
    console.error(`Error fetching compute pool ${poolId}:`, error);
    throw error;
  }
};
```

See the `examples.ts` file for more detailed usage examples for each controller.

## Error Handling

All controller methods return Promises that resolve to Axios responses. You should always wrap API calls in try/catch blocks to handle potential errors:

```typescript
try {
  const response = await dashboardController.getDashboardOverview();
  // Handle successful response
} catch (error) {
  // Handle error
  if (axios.isAxiosError(error)) {
    // Handle Axios-specific errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
  } else {
    // Handle non-Axios errors
    console.error('Unexpected error:', error);
  }
}
```

## Authentication

The API client is configured to use a base URL from the swagger.json specification. If the API requires authentication, you can uncomment and modify the authentication logic in the request interceptor in `index.ts`.

## Adding New Controllers

If new endpoints are added to the API, you can create new controller classes that extend the `BaseController` class. Follow the pattern of the existing controllers for consistency.
