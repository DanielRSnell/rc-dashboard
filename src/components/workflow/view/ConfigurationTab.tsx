'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card';
import { Badge } from "@/components/ui/badge';
import { CheckboxCard } from "@/components/ui/checkbox-card';

interface ConfigurationTabProps {
  workflow: any;
}

export function ConfigurationTab({ workflow }: ConfigurationTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GeneralSettings workflow={workflow} />
        <ResourceSettings workflow={workflow} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NotificationSettings workflow={workflow} />
        <ScheduleSettings workflow={workflow} />
      </div>
      
      <SecuritySettings workflow={workflow} />
    </div>
  );
}

function GeneralSettings({ workflow }: { workflow: any }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">General Settings</CardTitle>
        <CardDescription>Basic workflow configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Workflow ID</h3>
          <p className="text-white font-mono text-sm">{workflow.id}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Priority</h3>
          <div className="flex items-center">
            <Badge variant={
              workflow.priority === 'high' ? 'danger' : 
              workflow.priority === 'medium' ? 'warning' : 
              'info'
            }>
              {workflow.priority.charAt(0).toUpperCase() + workflow.priority.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Timeout</h3>
          <p className="text-white">{workflow.config?.timeout || '1 hour'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Retry Policy</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Max Retries</span>
              <span className="text-sm text-white">{workflow.config?.retries || 3}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Retry Delay</span>
              <span className="text-sm text-white">{workflow.config?.retryDelay || '30 seconds'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ResourceSettings({ workflow }: { workflow: any }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Resource Settings</CardTitle>
        <CardDescription>Compute resource configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Compute Profile</h3>
          <p className="text-white">{workflow.config?.computeProfile || 'Standard'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Resource Limits</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">CPU</span>
              <span className="text-sm text-white">{workflow.config?.resources?.cpu || '2 cores'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Memory</span>
              <span className="text-sm text-white">{workflow.config?.resources?.memory || '4 GB'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">GPU</span>
              <span className="text-sm text-white">{workflow.config?.resources?.gpu || 'None'}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Storage</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Persistent Volume</span>
              <span className="text-sm text-white">{workflow.config?.storage?.persistentVolume || '10 GB'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Ephemeral Storage</span>
              <span className="text-sm text-white">{workflow.config?.storage?.ephemeralStorage || '5 GB'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationSettings({ workflow }: { workflow: any }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Notification Settings</CardTitle>
        <CardDescription>Alert and notification configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <CheckboxCard
            label="Email Notifications"
            details="Send email notifications for workflow status changes"
            checked={workflow.config?.notifications?.email || false}
            readOnly
          />
          
          <CheckboxCard
            label="Slack Notifications"
            details="Send Slack notifications for workflow status changes"
            checked={workflow.config?.notifications?.slack || false}
            readOnly
          />
          
          <CheckboxCard
            label="Webhook Notifications"
            details="Send webhook notifications for workflow status changes"
            checked={workflow.config?.notifications?.webhook || false}
            readOnly
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Notification Events</h3>
          <div className="flex flex-wrap gap-2">
            {(workflow.config?.notificationEvents || ['start', 'complete', 'fail']).map((event: string, index: number) => (
              <Badge key={index} variant="secondary">
                {event.charAt(0).toUpperCase() + event.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduleSettings({ workflow }: { workflow: any }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Schedule Settings</CardTitle>
        <CardDescription>Workflow execution schedule</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Schedule Type</h3>
          <p className="text-white">{workflow.config?.schedule?.type || 'Manual'}</p>
        </div>
        
        {workflow.config?.schedule?.type === 'cron' && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Cron Expression</h3>
            <p className="text-white font-mono">{workflow.config.schedule.cron}</p>
            <p className="text-sm text-gray-400 mt-1">
              {workflow.config.schedule.description || 'Runs daily at midnight'}
            </p>
          </div>
        )}
        
        {workflow.config?.schedule?.type === 'interval' && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Interval</h3>
            <p className="text-white">{workflow.config.schedule.interval}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <CheckboxCard
            label="Skip on Failure"
            details="Skip next scheduled run if the current run fails"
            checked={workflow.config?.schedule?.skipOnFailure || false}
            readOnly
          />
          
          <CheckboxCard
            label="Catch Up Missed Runs"
            details="Execute missed runs when the scheduler resumes"
            checked={workflow.config?.schedule?.catchUp || false}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
}

function SecuritySettings({ workflow }: { workflow: any }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Security Settings</CardTitle>
        <CardDescription>Access control and security configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Access Control</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Owner</span>
              <span className="text-sm text-white">{workflow.creator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Visibility</span>
              <span className="text-sm text-white">{workflow.config?.security?.visibility || 'Private'}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Permissions</h3>
          <div className="space-y-2">
            {(workflow.config?.security?.permissions || [
              { role: 'Admin', access: 'Full Access' },
              { role: 'Editor', access: 'Execute, Edit' },
              { role: 'Viewer', access: 'View Only' }
            ]).map((permission: any, index: number) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm text-gray-400">{permission.role}</span>
                <span className="text-sm text-white">{permission.access}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <CheckboxCard
            label="Audit Logging"
            details="Enable detailed audit logging for all workflow operations"
            checked={workflow.config?.security?.auditLogging || true}
            readOnly
          />
          
          <CheckboxCard
            label="Secure Secrets"
            details="Use secure secret management for sensitive workflow data"
            checked={workflow.config?.security?.secureSecrets || true}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
} 