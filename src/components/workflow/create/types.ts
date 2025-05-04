export interface WorkflowFormValues {
  // Step 1: Basic Details
  name: string;
  description?: string;
  priority: string;
  
  // Step 2: Environment Configuration
  environmentStrategy: string;
  traceLevel: string;
  environments: {
    awsVirginia: boolean;
    dgxCloudCalifornia: boolean;
  };
  
  // Step 3: Options
  options: {
    enableNotifications: boolean;
    enableLogging: boolean;
    enableRetry: boolean;
  };
} 