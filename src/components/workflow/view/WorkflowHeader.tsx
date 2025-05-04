import { motion } from 'framer-motion';
// Link import removed - use <a> tags instead;
import { Button } from "@/components/ui/button';
import { Badge } from "@/components/ui/badge';
import { ArrowLeft, Play, MoreHorizontal, Edit, Download, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu';

interface WorkflowHeaderProps {
  workflow: any;
  getStatusBadgeClass: (status: string) => string;
  getPriorityBadgeClass: (priority: string) => string;
}

export function WorkflowHeader({ workflow, getStatusBadgeClass, getPriorityBadgeClass }: WorkflowHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between"
    >
      <div>
        <div className="flex items-center">
          <Link href="/workflow" className="mr-2">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-white">{workflow.name}</h1>
        </div>
        <div className="flex items-center mt-1 space-x-3">
          <p className="text-gray-400">ID: {workflow.id}</p>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(workflow.status)}`}>
            {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
          </span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityBadgeClass(workflow.priority)}`}>
            {workflow.priority.charAt(0).toUpperCase() + workflow.priority.slice(1)} Priority
          </span>
        </div>
      </div>
      <div className="flex space-x-3">
        <Link href={`/workflow/execute?id=${workflow.id}`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Play className="mr-2 h-4 w-4" />
            Execute
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-800">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              Edit Workflow
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              <Download className="mr-2 h-4 w-4" />
              Export Configuration
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-900/30 hover:text-red-400 cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Workflow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
} 