'use client';

import { useState, useEffect } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check, AlertTriangle } from 'lucide-react';

// Get color for silicon type
const getSiliconTypeColor = (type) => {
  const colors = {
    'GPU A100': 'text-sky-400',
    'GPU H100': 'text-emerald-400',
    'TPU v4': 'text-yellow-400',
    'CPU EPYC': 'text-rose-400'
  };
  return colors[type] || 'text-gray-400';
};

// Get status icon and color
const getStatusInfo = (status) => {
  switch (status) {
    case 'Completed':
      return { icon: Check, color: 'text-green-400' };
    case 'Running':
      return { icon: Clock, color: 'text-blue-400' };
    case 'Failed':
      return { icon: AlertTriangle, color: 'text-red-400' };
    default:
      return { icon: Clock, color: 'text-gray-400' };
  }
};

export function RecentSales({ workflowData, className }) {
  // Default data if none provided
  const defaultData = {
    title: 'Recent Workflows',
    subtitle: 'No recent workflows',
    workflows: []
  };

  // Use provided data or fallback to default
  const { title, subtitle, workflows: initialWorkflows } = workflowData || defaultData;
  
  // State for workflows with animated updates
  const [workflows, setWorkflows] = useState(initialWorkflows || []);
  const [updateCounter, setUpdateCounter] = useState(0);

  // Update local state when props change
  useEffect(() => {
    if (initialWorkflows) {
      setWorkflows(initialWorkflows);
    }
  }, [initialWorkflows]);

  // Simulate periodic workflow updates with individual animations
  useEffect(() => {
    if (workflows.length === 0) return;
    
    // Function to generate a new workflow
    const generateNewWorkflow = () => {
      const siliconTypes = ['GPU A100', 'GPU H100', 'TPU v4', 'CPU EPYC'];
      const workflowTypes = ['Training Pipeline', 'Inference Job', 'Data Processing', 'Model Evaluation', 'Batch Prediction'];
      const statuses = ['Completed', 'Running', 'Completed', 'Completed']; // More chance of completed
      
      return {
        name: workflowTypes[Math.floor(Math.random() * workflowTypes.length)],
        id: `WF-${7834 + updateCounter}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        siliconType: siliconTypes[Math.floor(Math.random() * siliconTypes.length)],
        duration: `${Math.floor(Math.random() * 59 + 1)}m ${Math.floor(Math.random() * 59 + 1)}s`,
        avatarFallback: 'NW',
        isNew: true, // Mark as new for animation
        key: `wf-${Date.now()}-${Math.random().toString(36).substring(2, 9)}` // Unique key for animation
      };
    };
    
    // Function to update a single workflow's status
    const updateWorkflowStatus = (index) => {
      const newWorkflows = [...workflows];
      // Check if index is valid
      if (index < 0 || index >= newWorkflows.length) {
        return newWorkflows; // Return unchanged if index is invalid
      }
      
      const workflow = newWorkflows[index];
      // Check if workflow exists
      if (!workflow) {
        return newWorkflows; // Return unchanged if workflow doesn't exist
      }
      
      // Update status based on current status
      if (workflow.status === 'Running') {
        // 80% chance to complete, 20% chance to fail
        workflow.status = Math.random() < 0.8 ? 'Completed' : 'Failed';
        workflow.statusChanged = true; // Mark for animation
      } else if (workflow.status === 'Failed' || workflow.status === 'Completed') {
        // If completed or failed, it will be removed in the next update
        workflow.toRemove = true; // Mark for removal animation
      }
      
      return newWorkflows;
    };
    
    // Function to update a workflow's duration
    const updateWorkflowDuration = (index) => {
      const newWorkflows = [...workflows];
      // Check if index is valid
      if (index < 0 || index >= newWorkflows.length) {
        return newWorkflows; // Return unchanged if index is invalid
      }
      
      const workflow = newWorkflows[index];
      // Check if workflow exists and has required properties
      if (!workflow || !workflow.duration || workflow.status !== 'Running') {
        return newWorkflows; // Return unchanged if workflow doesn't exist or isn't running
      }
      
      try {
        const mins = parseInt(workflow.duration.split('m')[0]);
        const secs = parseInt(workflow.duration.split('m ')[1].split('s')[0]);
        
        // Increment duration for running workflows
        const newSecs = secs + Math.floor(Math.random() * 5) + 1;
        if (newSecs >= 60) {
          workflow.duration = `${mins + 1}m ${newSecs - 60}s`;
        } else {
          workflow.duration = `${mins}m ${newSecs}s`;
        }
        
        workflow.durationChanged = true; // Mark for animation
      } catch (error) {
        // If there's an error parsing the duration, set a default
        workflow.duration = '1m 0s';
        console.warn('Error updating workflow duration, reset to default');
      }
      
      return newWorkflows;
    };
    
    // Main interval for workflow updates
    const mainInterval = setInterval(() => {
      let newWorkflows = [...workflows];
      
      // Instead of immediately removing workflows marked for removal,
      // we keep them but continue to show their removal animation
      
      // Determine if we need to add a new workflow
      const activeWorkflows = newWorkflows.filter(w => !w.toRemove).length;
      let shouldAddNew = activeWorkflows < 5 || Math.random() < 0.15;
      
      // If we're adding a new workflow, first mark one for removal if needed
      if (shouldAddNew && activeWorkflows >= 5) {
        // Find the oldest completed/failed workflow to remove
        const completedIndex = newWorkflows.findIndex(w => 
          !w.toRemove && (w.status === 'Completed' || w.status === 'Failed')
        );
        
        if (completedIndex >= 0) {
          newWorkflows[completedIndex].toRemove = true;
          // Give it time to animate out before adding the new one
          setTimeout(() => {
            // Add the new workflow
            const newWorkflow = generateNewWorkflow();
            setWorkflows(current => [newWorkflow, ...current]);
          }, 400); // Slight delay to let the removal animation start
          
          // Skip adding a new workflow immediately
          shouldAddNew = false;
        }
      }
      
      // Add a new workflow if needed and we didn't just schedule one
      if (shouldAddNew) {
        const newWorkflow = generateNewWorkflow();
        newWorkflows.unshift(newWorkflow);
      }
      
      // 3. Randomly update status of an existing workflow (30% chance)
      if (Math.random() < 0.3 && newWorkflows.length > 0) {
        // Find a running workflow to update or pick a random one
        const runningIndex = newWorkflows.findIndex(w => w && w.status === 'Running');
        // Only proceed if we have workflows to update
        if (newWorkflows.length > 0) {
          const indexToUpdate = runningIndex >= 0 ? runningIndex : Math.floor(Math.random() * newWorkflows.length);
          newWorkflows = updateWorkflowStatus(indexToUpdate);
        }
      }
      
      // 4. Update durations of running workflows
      newWorkflows.forEach((workflow, index) => {
        if (workflow && workflow.status === 'Running') {
          newWorkflows = updateWorkflowDuration(index);
        }
      });
      
      // 5. Clear animation flags from previous updates
      newWorkflows.forEach(workflow => {
        workflow.isNew = false;
        workflow.statusChanged = false;
        workflow.durationChanged = false;
      });
      
      // 6. Cleanup: Actually remove workflows that have completed their exit animation
      // We use a separate timeout to ensure the animation has time to complete
      const toRemoveIds = newWorkflows
        .filter(w => w.toRemove)
        .map(w => w.key || `${w.id}`);
      
      if (toRemoveIds.length > 0) {
        setTimeout(() => {
          setWorkflows(current => 
            current.filter(w => !toRemoveIds.includes(w.key || `${w.id}`))
          );
        }, 300); // Shorter time for simpler exit animation
      }
      
      setWorkflows(newWorkflows);
      setUpdateCounter(prev => prev + 1);
    }, 3000); // Update every 3 seconds for more dynamic feeling
    
    return () => clearInterval(mainInterval);
  }, [workflows, updateCounter]);

  // Calculate a fixed height based on 5 workflow items plus spacing
  // Each workflow item is approximately 60px tall with margins
  const fixedContainerHeight = 5 * 60 + 24; // 5 items + header padding
  
  return (
    <div className={`bg-black border-2border-gray-900/30 shadow-lg rounded-lg p-6 relative overflow-hidden ${className}`}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30 pointer-events-none"></div>
      
      <div className="space-y-6 relative z-10">
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <div 
          className="relative overflow-hidden" 
          style={{ height: `${fixedContainerHeight}px`, minHeight: `${fixedContainerHeight}px` }}
        >
          {/* Empty placeholder workflows to maintain height when fewer than 5 items */}
          {workflows.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-sm">No workflows available</p>
            </div>
          )}
          <AnimatePresence initial={false}>
            {workflows.map((workflow, index) => {
              const StatusIcon = getStatusInfo(workflow.status).icon;
              const isRemoving = workflow.toRemove;
              
              return (
                <motion.div 
                  key={workflow.key || `${workflow.id}-${index}`}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: 'auto'
                  }}
                  exit={{ 
                    opacity: 0,
                    height: 0
                  }}
                  transition={{ 
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 }
                  }}
                  className="flex items-center justify-between overflow-hidden mb-6 relative"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-9 w-9 bg-gray-800/50 /50 text-white border border-gray-700">
                      <div className="flex items-center justify-center h-full w-full text-sm font-medium">
                        {workflow.avatarFallback}
                      </div>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">{workflow.name}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-400">{workflow.id}</p>
                        <span className="text-xs text-gray-600">•</span>
                        <p className={`text-xs ${getSiliconTypeColor(workflow.siliconType)}`}>{workflow.siliconType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-gray-400" />
                      <motion.p 
                        className="text-xs text-gray-400"
                        initial={workflow.durationChanged ? { opacity: 0 } : false}
                        animate={{ 
                          opacity: 1,
                          color: workflow.durationChanged ? ['#9CA3AF', '#60A5FA', '#9CA3AF'] : '#9CA3AF'
                        }}
                        transition={{ 
                          duration: 0.3
                        }}
                      >
                        {workflow.duration}
                      </motion.p>
                    </div>
                    <div className={`flex items-center ${getStatusInfo(workflow.status).color}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      <motion.p 
                        className="text-xs"
                        initial={workflow.statusChanged ? { opacity: 0 } : false}
                        animate={{ 
                          opacity: 1,
                          fontWeight: workflow.statusChanged ? [400, 600, 400] : 400
                        }}
                        transition={{ 
                          duration: 0.3
                        }}
                      >
                        {workflow.status}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
