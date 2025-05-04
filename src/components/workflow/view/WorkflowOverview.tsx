import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card';
// Link import removed - use <a> tags instead;
import { Button } from "@/components/ui/button';
import { Edit, Download, Play, Trash2 } from 'lucide-react';

interface WorkflowOverviewProps {
  workflow: any;
  formatDate: (dateString: string) => string;
  getStatusBadgeClass: (status: string) => string;
}

export function WorkflowOverview({ workflow, formatDate, getStatusBadgeClass }: WorkflowOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Workflow Details</CardTitle>
            <CardDescription>Basic information about this workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
              <p className="text-white">{workflow.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Created By</h3>
                <p className="text-white">{workflow.creator}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Created On</h3>
                <p className="text-white" suppressHydrationWarning>{formatDate(workflow.createdAt)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Last Execution</h3>
                <p className="text-white">{formatDate(workflow.lastRun)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Total Executions</h3>
                <p className="text-white">{workflow.executions.length}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Environments</h3>
              <div className="flex flex-wrap gap-2">
                {workflow.environments.map((env: string, index: number) => (
                  <span 
                    key={index}
                    className="px-2.5 py-1 bg-gray-800 text-gray-300 rounded-md text-xs"
                  >
                    {env}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {workflow.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="px-2.5 py-1 bg-blue-900/20 text-blue-400 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Workflow Steps</CardTitle>
            <CardDescription>Steps executed in this workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflow.steps.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
                  className="flex items-center p-3 rounded-lg border border-gray-800 bg-gray-800/20"
                >
                  <div className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{step.name}</h3>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-3">
                          {step.duration}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(step.status)}`}>
                          {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <RecentExecutions workflow={workflow} formatDate={formatDate} getStatusBadgeClass={getStatusBadgeClass} />
        <QuickActions workflow={workflow} />
      </div>
    </div>
  );
}

function RecentExecutions({ workflow, formatDate, getStatusBadgeClass }: { workflow: any, formatDate: (dateString: string) => string, getStatusBadgeClass: (status: string) => string }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Recent Executions</CardTitle>
        <CardDescription>Last 3 workflow runs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workflow.executions.slice(0, 3).map((execution: any, index: number) => (
            <motion.div
              key={execution.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
              className="p-3 rounded-lg border border-gray-800 bg-gray-800/20"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="ml-2 text-white font-medium">Run #{workflow.executions.length - index}</span>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(execution.status)}`}>
                  {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Started</p>
                  <p className="text-white">{formatDate(execution.startTime)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Duration</p>
                  <p className="text-white">{execution.duration}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions({ workflow }: { workflow: any }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
        <CardDescription>Common workflow operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href={`/workflow/execute?id=${workflow.id}`} className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
            <Play className="mr-2 h-4 w-4" />
            Execute Workflow
          </Button>
        </Link>
        <Button variant="outline" className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800 justify-start">
          <Edit className="mr-2 h-4 w-4" />
          Edit Workflow
        </Button>
        <Button variant="outline" className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800 justify-start">
          <Download className="mr-2 h-4 w-4" />
          Export Configuration
        </Button>
        <Button variant="outline" className="w-full bg-transparent border-red-900/50 text-red-400 hover:bg-red-900/30 justify-start">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Workflow
        </Button>
      </CardContent>
    </Card>
  );
} 