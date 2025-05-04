import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card';
import { Button } from "@/components/ui/button';
import { CheckCircle, AlertCircle, Clock, Eye, Download } from 'lucide-react';
// Link import removed - use <a> tags instead;

interface ExecutionHistoryProps {
  workflow: any;
  formatDate: (dateString: string) => string;
  getStatusBadgeClass: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
}

export function ExecutionHistory({ workflow, formatDate, getStatusBadgeClass, getStatusIcon }: ExecutionHistoryProps) {
  // Add client-side only rendering to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // If not client yet, render a placeholder with the same structure
  if (!isClient) {
    return (
      <div className="space-y-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Execution History</CardTitle>
            <CardDescription>All previous workflow runs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-800">
              <div className="grid grid-cols-12 border-b border-gray-800 bg-gray-800/40 px-4 py-3 text-sm font-medium text-gray-400">
                <div className="col-span-1">Run #</div>
                <div className="col-span-2">Execution ID</div>
                <div className="col-span-3">Start Time</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              <div className="p-4 text-center text-gray-500">Loading execution history...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ExecutionTable 
        workflow={workflow} 
        formatDate={formatDate} 
        getStatusBadgeClass={getStatusBadgeClass} 
        getStatusIcon={getStatusIcon} 
      />
      
      {workflow.executions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExecutionDetails 
            execution={workflow.executions[0]} 
            formatDate={formatDate} 
            getStatusIcon={getStatusIcon} 
          />
          <ExecutionMetrics workflow={workflow} />
        </div>
      )}
      
      {workflow.executions.length > 0 && workflow.executions[0].stepExecutions && (
        <StepExecutionDetails 
          stepExecutions={workflow.executions[0].stepExecutions} 
          formatDate={formatDate} 
          getStatusBadgeClass={getStatusBadgeClass} 
        />
      )}
    </div>
  );
}

function ExecutionTable({ workflow, formatDate, getStatusBadgeClass, getStatusIcon }: ExecutionHistoryProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Execution History</CardTitle>
        <CardDescription>All previous workflow runs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-800">
          <div className="grid grid-cols-12 border-b border-gray-800 bg-gray-800/40 px-4 py-3 text-sm font-medium text-gray-400">
            <div className="col-span-1">Run #</div>
            <div className="col-span-2">Execution ID</div>
            <div className="col-span-3">Start Time</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-gray-800">
            {workflow.executions.map((execution: any, index: number) => (
              <div 
                key={execution.id} 
                className="grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-800/30"
              >
                <div className="col-span-1 text-gray-400">
                  #{workflow.executions.length - index}
                </div>
                <div className="col-span-2 text-gray-400 font-mono text-sm">
                  {execution.id}
                </div>
                <div className="col-span-3 text-sm text-gray-400" suppressHydrationWarning>
                  {formatDate(execution.startTime)}
                </div>
                <div className="col-span-2 text-sm text-white">
                  {execution.duration}
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    {getStatusIcon(execution.status)}
                    <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(execution.status)}`}>
                      {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 text-right space-x-2">
                  <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-white hover:bg-gray-800">
                    <Eye className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExecutionDetails({ execution, formatDate, getStatusIcon }: { execution: any, formatDate: (dateString: string) => string, getStatusIcon: (status: string) => JSX.Element }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Latest Execution Details</CardTitle>
        <CardDescription suppressHydrationWarning>
          {execution.id} • {formatDate(execution.startTime)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Status</h3>
            <div className="flex items-center">
              {getStatusIcon(execution.status)}
              <span className={`ml-2 text-sm font-medium ${execution.status === 'completed' ? 'text-green-400' : execution.status === 'failed' ? 'text-red-400' : 'text-gray-400'}`}>
                {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Duration</h3>
            <p className="text-white">{execution.duration}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Executed By</h3>
          <p className="text-white">{execution.executor || 'System'}</p>
        </div>
        
        {execution.error && (
          <div>
            <h3 className="text-sm font-medium text-red-400 mb-1">Error</h3>
            <div className="bg-red-900/20 border border-red-900/30 rounded-md p-3 text-sm text-red-400">
              {execution.error}
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Resource Usage</h3>
          <div className="space-y-2 mt-2">
            {execution.resourceUsage && (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">CPU</span>
                    <span className="text-white">{execution.resourceUsage.cpu}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${execution.resourceUsage.cpu}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-white">{execution.resourceUsage.memory}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: `${execution.resourceUsage.memory}%` }}
                    />
                  </div>
                </div>
                
                {execution.resourceUsage.gpu !== undefined && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">GPU</span>
                      <span className="text-white">{execution.resourceUsage.gpu}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${execution.resourceUsage.gpu}%` }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="pt-2">
          <Button variant="outline" className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800">
            <Download className="mr-2 h-4 w-4" />
            Download Execution Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ExecutionMetrics({ workflow }: { workflow: any }) {
  // Avoid calculations during initial render
  const [metrics, setMetrics] = useState<{
    durations: any[],
    maxDuration: number,
    successRate: number,
    successCount: number
  }>({
    durations: [],
    maxDuration: 0,
    successRate: 0,
    successCount: 0
  });
  
  useEffect(() => {
    // Calculate metrics on the client side only
    const durations = workflow.executions.map((execution: any) => {
      const [hours, minutes, seconds] = execution.duration.split(':').map(Number);
      return {
        totalMinutes: (hours * 60) + minutes + (seconds / 60),
        status: execution.status
      };
    });
    
    const maxDuration = Math.max(...durations.map((d: any) => d.totalMinutes));
    const successCount = workflow.executions.filter((e: any) => e.status === 'completed').length;
    const successRate = (successCount / workflow.executions.length) * 100;
    
    setMetrics({
      durations,
      maxDuration,
      successRate,
      successCount
    });
  }, [workflow]);

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Execution Metrics</CardTitle>
        <CardDescription>Performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Execution Duration Trend</h3>
            <div className="h-40 flex items-end space-x-2">
              {metrics.durations.map((duration: any, index: number) => {
                // Calculate height percentage (max height is 100%)
                const heightPercentage = metrics.maxDuration > 0 
                  ? (duration.totalMinutes / metrics.maxDuration) * 100 
                  : 0;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-full rounded-t-sm ${duration.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2 rotate-45 origin-left">
                      Run #{index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Success Rate</h3>
            <div className="flex items-center">
              <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${metrics.successRate}%` }}
                ></div>
              </div>
              <span className="ml-3 text-white font-medium">
                {metrics.successRate.toFixed(0)}%
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {metrics.successCount} successful out of {workflow.executions.length} executions
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StepExecutionDetails({ stepExecutions, formatDate, getStatusBadgeClass }: { stepExecutions: any[], formatDate: (dateString: string) => string, getStatusBadgeClass: (status: string) => string }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Latest Execution Step Details</CardTitle>
        <CardDescription>Step-by-step execution breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stepExecutions.map((stepExecution: any, index: number) => (
            <div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className={`px-4 py-3 flex items-center justify-between ${
                stepExecution.status === 'completed' 
                  ? 'bg-green-900/20 border-b border-green-900/30' 
                  : stepExecution.status === 'failed'
                    ? 'bg-red-900/20 border-b border-red-900/30'
                    : 'bg-gray-800/50 border-b border-gray-700'
              }`}>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{stepExecution.name}</h3>
                    <p className="text-sm text-gray-400" suppressHydrationWarning>
                      {formatDate(stepExecution.startTime)} - {formatDate(stepExecution.endTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm mr-3">
                    {stepExecution.duration}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(stepExecution.status)}`}>
                    {stepExecution.status.charAt(0).toUpperCase() + stepExecution.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-900/30">
                {stepExecution.error && (
                  <div className="mb-4 bg-red-900/20 border border-red-900/30 rounded-md p-3 text-sm text-red-400">
                    Error: {stepExecution.error}
                  </div>
                )}
                
                <h4 className="text-sm font-medium text-gray-400 mb-2">Logs</h4>
                <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-300 h-24 overflow-auto">
                  {stepExecution.logs && stepExecution.logs.map((log: any, logIndex: number) => (
                    <div key={logIndex} className="mb-1">
                      <span className="text-gray-500">[{log.timestamp}]</span> <span className={log.level === 'error' ? 'text-red-400' : log.level === 'warning' ? 'text-yellow-400' : 'text-gray-300'}>{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 