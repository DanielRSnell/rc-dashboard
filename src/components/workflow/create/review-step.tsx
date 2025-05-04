'use client';

import { UseFormReturn } from 'react-hook-form';
import { WorkflowFormValues } from './types';

interface ReviewStepProps {
  form: UseFormReturn<WorkflowFormValues>;
}

export function ReviewStep({ form }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Basic Details</h3>
        <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p>{form.getValues('name')}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Priority</p>
            <p className="capitalize">{form.getValues('priority')}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p>{form.getValues('description') || 'No description provided'}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Environment Configuration</h3>
        <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Environment Strategy</p>
            <p>
              {form.getValues('environmentStrategy') === 'start' && 'Earliest Start'}
              {form.getValues('environmentStrategy') === 'time' && 'Fastest Estimated Execution Time'}
              {form.getValues('environmentStrategy') === 'cost' && 'Least Expensive'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Trace Level</p>
            <p>
              {form.getValues('traceLevel') === 'min' && 'Minimal'}
              {form.getValues('traceLevel') === 'med' && 'Standard'}
              {form.getValues('traceLevel') === 'debug' && 'Maximum'}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium text-gray-500">Selected Environments</p>
            <ul className="list-inside list-disc">
              {form.getValues('environments.awsVirginia') && (
                <li>AWS (Virginia)</li>
              )}
              {form.getValues('environments.dgxCloudCalifornia') && (
                <li>DGX Cloud (Oracle) (California)</li>
              )}
              {!form.getValues('environments.awsVirginia') && !form.getValues('environments.dgxCloudCalifornia') && (
                <p className="text-gray-500">No environments selected</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Options</h3>
        <div className="rounded-lg border p-4">
          <ul className="list-inside list-disc">
            {form.getValues('options.enableNotifications') && (
              <li>Notifications enabled</li>
            )}
            {form.getValues('options.enableLogging') && (
              <li>Logging enabled</li>
            )}
            {form.getValues('options.enableRetry') && (
              <li>Automatic retry enabled</li>
            )}
            {!form.getValues('options.enableNotifications') && 
             !form.getValues('options.enableLogging') && 
             !form.getValues('options.enableRetry') && (
              <p className="text-gray-500">No additional options enabled</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 