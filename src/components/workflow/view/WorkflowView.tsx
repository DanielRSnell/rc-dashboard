import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowOverview } from './WorkflowOverview';
import { ExecutionHistory } from './ExecutionHistory';
import { ConfigurationTab } from './ConfigurationTab';

export function WorkflowView() {
  const searchParams = useSearchParams();
  const workflowId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [workflow, setWorkflow] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate API call to fetch workflow data
  useEffect(() => {
    const fetchWorkflow = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock workflow data
      const mockWorkflows = {
        'wf-1001': {
          id: 'wf-1001',
          name: 'Image Classification Training',
          description: 'A workflow for training image classification models on the ImageNet dataset using distributed GPU training.',
          status: 'active',
          priority: 'high',
          creator: 'John Doe',
          createdAt: '2025-06-15T10:30:00Z',
          lastRun: '2025-07-10T14:45:00Z',
          environments: ['production', 'staging'],
          tags: ['machine-learning', 'computer-vision', 'training'],
          steps: [
            { name: 'Data Preparation', status: 'completed', duration: '10:25' },
            { name: 'Model Training', status: 'completed', duration: '45:30' },
            { name: 'Model Evaluation', status: 'completed', duration: '15:10' },
            { name: 'Model Export', status: 'completed', duration: '05:45' },
            { name: 'Deployment', status: 'pending', duration: '00:00' }
          ],
          executions: [
            {
              id: 'exec-5001',
              status: 'completed',
              startTime: '2025-07-10T14:45:00Z',
              endTime: '2025-07-10T16:01:25Z',
              duration: '01:16:25',
              executor: 'John Doe',
              resourceUsage: {
                cpu: 78,
                memory: 65,
                gpu: 92
              },
              stepExecutions: [
                {
                  name: 'Data Preparation',
                  status: 'completed',
                  startTime: '2025-07-10T14:45:00Z',
                  endTime: '2025-07-10T14:55:25Z',
                  duration: '00:10:25',
                  logs: [
                    { timestamp: '14:45:10', level: 'info', message: 'Starting data preparation...' },
                    { timestamp: '14:47:30', level: 'info', message: 'Downloading ImageNet dataset...' },
                    { timestamp: '14:52:15', level: 'info', message: 'Preprocessing images...' },
                    { timestamp: '14:55:20', level: 'info', message: 'Data preparation completed successfully.' }
                  ]
                },
                {
                  name: 'Model Training',
                  status: 'completed',
                  startTime: '2025-07-10T14:55:30Z',
                  endTime: '2025-07-10T15:41:00Z',
                  duration: '00:45:30',
                  logs: [
                    { timestamp: '14:55:35', level: 'info', message: 'Initializing training environment...' },
                    { timestamp: '14:56:20', level: 'info', message: 'Starting model training with 8 GPUs...' },
                    { timestamp: '15:15:45', level: 'info', message: 'Epoch 1/10 completed. Loss: 2.345' },
                    { timestamp: '15:25:10', level: 'info', message: 'Epoch 5/10 completed. Loss: 1.456' },
                    { timestamp: '15:40:55', level: 'info', message: 'Training completed. Final loss: 0.876' }
                  ]
                },
                {
                  name: 'Model Evaluation',
                  status: 'completed',
                  startTime: '2025-07-10T15:41:05Z',
                  endTime: '2025-07-10T15:56:15Z',
                  duration: '00:15:10',
                  logs: [
                    { timestamp: '15:41:10', level: 'info', message: 'Starting model evaluation...' },
                    { timestamp: '15:45:30', level: 'info', message: 'Evaluating on validation set...' },
                    { timestamp: '15:56:10', level: 'info', message: 'Evaluation completed. Accuracy: 92.7%' }
                  ]
                },
                {
                  name: 'Model Export',
                  status: 'completed',
                  startTime: '2025-07-10T15:56:20Z',
                  endTime: '2025-07-10T16:01:25Z',
                  duration: '00:05:45',
                  logs: [
                    { timestamp: '15:56:25', level: 'info', message: 'Exporting model to ONNX format...' },
                    { timestamp: '15:59:40', level: 'info', message: 'Optimizing model for inference...' },
                    { timestamp: '16:01:20', level: 'info', message: 'Model export completed successfully.' }
                  ]
                }
              ]
            },
            {
              id: 'exec-4892',
              status: 'failed',
              startTime: '2025-07-05T09:30:00Z',
              endTime: '2025-07-05T10:15:45Z',
              duration: '00:45:45',
              executor: 'John Doe',
              error: 'GPU memory allocation failed during training step',
              resourceUsage: {
                cpu: 65,
                memory: 72,
                gpu: 88
              },
              stepExecutions: [
                {
                  name: 'Data Preparation',
                  status: 'completed',
                  startTime: '2025-07-05T09:30:00Z',
                  endTime: '2025-07-05T09:40:15Z',
                  duration: '00:10:15',
                  logs: [
                    { timestamp: '09:30:05', level: 'info', message: 'Starting data preparation...' },
                    { timestamp: '09:40:10', level: 'info', message: 'Data preparation completed successfully.' }
                  ]
                },
                {
                  name: 'Model Training',
                  status: 'failed',
                  startTime: '2025-07-05T09:40:20Z',
                  endTime: '2025-07-05T10:15:45Z',
                  duration: '00:35:25',
                  error: 'GPU memory allocation failed: CUDA out of memory',
                  logs: [
                    { timestamp: '09:40:25', level: 'info', message: 'Initializing training environment...' },
                    { timestamp: '09:41:10', level: 'info', message: 'Starting model training with 8 GPUs...' },
                    { timestamp: '10:15:40', level: 'error', message: 'CUDA error: out of memory' },
                    { timestamp: '10:15:42', level: 'error', message: 'GPU memory allocation failed' }
                  ]
                }
              ]
            },
            {
              id: 'exec-4756',
              status: 'completed',
              startTime: '2025-06-28T13:15:00Z',
              endTime: '2025-06-28T14:32:10Z',
              duration: '01:17:10',
              executor: 'Jane Smith',
              resourceUsage: {
                cpu: 75,
                memory: 68,
                gpu: 90
              }
            }
          ],
          config: {
            timeout: '2 hours',
            retries: 3,
            retryDelay: '30 seconds',
            computeProfile: 'GPU-Optimized',
            resources: {
              cpu: '16 cores',
              memory: '64 GB',
              gpu: '8x NVIDIA A100'
            },
            storage: {
              persistentVolume: '500 GB',
              ephemeralStorage: '200 GB'
            },
            notifications: {
              email: true,
              slack: true,
              webhook: false
            },
            notificationEvents: ['start', 'complete', 'fail'],
            schedule: {
              type: 'cron',
              cron: '0 0 * * 1',
              description: 'Runs every Monday at midnight',
              skipOnFailure: true,
              catchUp: false
            },
            security: {
              visibility: 'Team',
              auditLogging: true,
              secureSecrets: true,
              permissions: [
                { role: 'Admin', access: 'Full Access' },
                { role: 'Data Scientist', access: 'Execute, Edit' },
                { role: 'Viewer', access: 'View Only' }
              ]
            }
          }
        },
        'wf-1002': {
          id: 'wf-1002',
          name: 'NLP Data Processing Pipeline',
          description: 'A workflow for processing and preparing natural language data for model training.',
          status: 'inactive',
          priority: 'medium',
          creator: 'Jane Smith',
          createdAt: '2025-05-20T08:15:00Z',
          lastRun: '2025-06-15T11:30:00Z',
          environments: ['development'],
          tags: ['nlp', 'data-processing'],
          steps: [
            { name: 'Data Collection', status: 'completed', duration: '15:20' },
            { name: 'Text Cleaning', status: 'completed', duration: '25:45' },
            { name: 'Tokenization', status: 'completed', duration: '10:30' },
            { name: 'Feature Extraction', status: 'failed', duration: '05:15' }
          ],
          executions: [
            {
              id: 'exec-4501',
              status: 'failed',
              startTime: '2025-06-15T11:30:00Z',
              endTime: '2025-06-15T12:26:50Z',
              duration: '00:56:50',
              executor: 'System',
              error: 'Memory limit exceeded during feature extraction',
              resourceUsage: {
                cpu: 92,
                memory: 98,
                gpu: 0
              }
            },
            {
              id: 'exec-4350',
              status: 'completed',
              startTime: '2025-06-01T09:45:00Z',
              endTime: '2025-06-01T10:41:30Z',
              duration: '00:56:30',
              executor: 'Jane Smith',
              resourceUsage: {
                cpu: 85,
                memory: 72,
                gpu: 0
              }
            }
          ],
          config: {
            timeout: '1.5 hours',
            retries: 2,
            retryDelay: '1 minute',
            computeProfile: 'CPU-Optimized',
            resources: {
              cpu: '32 cores',
              memory: '128 GB',
              gpu: 'None'
            }
          }
        }
      };
      
      // Find the requested workflow
      const foundWorkflow = mockWorkflows[workflowId || ''] || null;
      
      setWorkflow(foundWorkflow);
      setIsLoading(false);
    };
    
    fetchWorkflow();
  }, [workflowId]);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString; // Fallback to the original string if parsing fails
    }
  };

  // Get appropriate badge class based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
        return 'bg-green-900/50 text-green-400';
      case 'inactive':
        return 'bg-gray-800 text-gray-400';
      case 'failed':
        return 'bg-red-900/50 text-red-400';
      case 'running':
        return 'bg-blue-900/50 text-blue-400';
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-400';
      default:
        return 'bg-gray-800 text-gray-400';
    }
  };

  // Get appropriate badge class based on priority
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-900/50 text-red-400';
      case 'medium':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'low':
        return 'bg-blue-900/50 text-blue-400';
      default:
        return 'bg-gray-800 text-gray-400';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'running':
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 border-t-2 border-primary animate-spin rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading workflow...</p>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!workflow) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Workflow Not Found</h2>
          <p className="text-muted-foreground mb-6">The workflow you're looking for doesn't exist or you don't have access to it.</p>
          <a href="/workflow" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Back to Workflows
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <WorkflowHeader 
        workflow={workflow} 
        getStatusBadgeClass={getStatusBadgeClass} 
        getPriorityBadgeClass={getPriorityBadgeClass} 
      />
      
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-gray-900/50 border border-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800">
            Overview
          </TabsTrigger>
          <TabsTrigger value="execution-history" className="data-[state=active]:bg-gray-800">
            Execution History
          </TabsTrigger>
          <TabsTrigger value="configuration" className="data-[state=active]:bg-gray-800">
            Configuration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <WorkflowOverview 
            workflow={workflow} 
            formatDate={formatDate} 
            getStatusBadgeClass={getStatusBadgeClass} 
          />
        </TabsContent>
        
        <TabsContent value="execution-history" className="space-y-6">
          <ExecutionHistory 
            workflow={workflow} 
            formatDate={formatDate} 
            getStatusBadgeClass={getStatusBadgeClass} 
            getStatusIcon={getStatusIcon} 
          />
        </TabsContent>
        
        <TabsContent value="configuration" className="space-y-6">
          <ConfigurationTab workflow={workflow} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 