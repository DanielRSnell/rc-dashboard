import { motion } from 'framer-motion';
// Link import removed - use <a> tags instead;
import { Button } from "@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import { WorkflowFormValues } from './types';

interface SuccessScreenProps {
  workflow: WorkflowFormValues;
}

export function SuccessScreen({ workflow }: SuccessScreenProps) {
  // Generate a mock workflow ID
  const workflowId = `wf-${Math.floor(Math.random() * 10000)}`;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center mb-6"
        >
          <Check className="h-10 w-10 text-green-500" />
        </motion.div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Workflow Created Successfully</h1>
        <p className="text-gray-400 max-w-md">
          Your workflow has been created and is ready to be executed.
          You can view it in the workflows list or execute it now.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Workflow Details</CardTitle>
            <CardDescription>Summary of the created workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Name</h3>
                <p className="text-lg font-medium text-white">{workflow.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Priority</h3>
                <p className="text-lg font-medium text-white capitalize">{workflow.priority}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                <p className="text-white">{workflow.description || 'No description provided'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Environment Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Strategy</p>
                  <p className="text-white capitalize">{workflow.environmentStrategy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Trace Level</p>
                  <p className="text-white capitalize">{workflow.traceLevel}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-400 mb-2">Selected Environments</p>
                  <div className="flex flex-wrap gap-2">
                    {workflow.environments.awsVirginia && (
                      <span className="px-2.5 py-1 bg-gray-800 text-gray-300 rounded-md text-xs">
                        AWS Virginia
                      </span>
                    )}
                    {workflow.environments.dgxCloudCalifornia && (
                      <span className="px-2.5 py-1 bg-gray-800 text-gray-300 rounded-md text-xs">
                        DGX Cloud California
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Notifications</p>
                  <p className="text-white">{workflow.options.enableNotifications ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Logging</p>
                  <p className="text-white">{workflow.options.enableLogging ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Auto-retry</p>
                  <p className="text-white">{workflow.options.enableRetry ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-center space-x-4"
      >
        <Link href="/workflow">
          <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-800">
            View All Workflows
          </Button>
        </Link>
        <Link href={`/workflow/execute?id=${workflowId}`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Execute Workflow <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
} 