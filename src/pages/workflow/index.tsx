import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, ArrowUpDown, Eye } from 'lucide-react';

// Mock data for workflows
const mockWorkflows = [
  {
    id: 'wf-1001',
    name: 'GPU Training Pipeline',
    description: 'Allocates GPUs for ML model training',
    status: 'active',
    priority: 'high',
    lastRun: '2025-10-15T10:30:00Z',
  },
  {
    id: 'wf-1002',
    name: 'CPU Batch Processing',
    description: 'Handles batch processing jobs on CPU clusters',
    status: 'active',
    priority: 'medium',
    lastRun: '2025-10-14T08:15:00Z',
  },
  {
    id: 'wf-1003',
    name: 'TPU Research Allocation',
    description: 'Manages TPU resources for research teams',
    status: 'inactive',
    priority: 'low',
    lastRun: '2025-10-10T14:45:00Z',
  },
  {
    id: 'wf-1004',
    name: 'Emergency Compute Scaling',
    description: 'Scales compute resources during peak demand',
    status: 'active',
    priority: 'critical',
    lastRun: '2025-10-16T09:20:00Z',
  },
  {
    id: 'wf-1005',
    name: 'Nightly Data Processing',
    description: 'Processes data during off-peak hours',
    status: 'active',
    priority: 'medium',
    lastRun: '2025-10-15T23:00:00Z',
  },
];

export default function WorkflowPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [workflows, setWorkflows] = useState(mockWorkflows);

  // Filter workflows based on search query
  const filteredWorkflows = workflows.filter(workflow => 
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/30 text-green-400';
      case 'inactive':
        return 'bg-gray-800/50 text-gray-400';
      case 'error':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-gray-800/50 text-gray-400';
    }
  };

  // Get priority badge class
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-900/30 text-red-400';
      case 'high':
        return 'bg-orange-900/30 text-orange-400';
      case 'medium':
        return 'bg-blue-900/30 text-blue-400';
      case 'low':
        return 'bg-gray-800/50 text-gray-400';
      default:
        return 'bg-gray-800/50 text-gray-400';
    }
  };

  return (
    <div className="space-y-6 h-full w-full bg-black">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="bg-background border-gray-800">
          <CardHeader>
            <CardTitle><span className="text-gray-100">All Workflows</span></CardTitle>
            <CardDescription>
              View and manage all your workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mb-4 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search workflows..."
                  className="pl-8 bg-gray-800/50 border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-md border border-gray-800"
            >
              <div className="grid grid-cols-12 border-b border-gray-800 bg-gray-800/40 px-4 py-3 text-sm font-medium text-gray-400">
                <div className="col-span-1">ID</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Last Run</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              <div className="divide-y divide-gray-800">
                {filteredWorkflows.length > 0 ? (
                  filteredWorkflows.map((workflow, index) => (
                    <motion.div 
                      key={workflow.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                      className="grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-800/30"
                    >
                      <div className="col-span-1 text-gray-400 font-mono text-sm">
                        {workflow.id}
                      </div>
                      <div className="col-span-3">
                        <div className="font-medium text-white">{workflow.name}</div>
                        <div className="text-sm text-gray-400">
                          {workflow.description}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(workflow.status)}`}>
                          {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityBadgeClass(workflow.priority)}`}>
                          {workflow.priority.charAt(0).toUpperCase() + workflow.priority.slice(1)}
                        </span>
                      </div>
                      <div className="col-span-2 text-sm text-gray-400">
                        {formatDate(workflow.lastRun)}
                      </div>
                      <div className="col-span-2 text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                          onClick={() => window.location.href = `/workflow/view?id=${workflow.id}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="px-4 py-6 text-center text-sm text-gray-400"
                  >
                    No workflows found. Try adjusting your search.
                  </motion.div>
                )}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      </div>
    </div>
  );
}
