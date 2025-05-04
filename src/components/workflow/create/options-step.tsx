'use client';

import { FormField, FormItem, FormControl, FormDescription } from "@/components/ui/form';
import { CheckboxCard } from "@/components/ui/checkbox-card';
import { UseFormReturn } from 'react-hook-form';
import { WorkflowFormValues } from './types';

interface OptionsStepProps {
  form: UseFormReturn<WorkflowFormValues>;
}

export function OptionsStep({ form }: OptionsStepProps) {
  return (
    <div className="space-y-6">
      <FormDescription className="text-base">
        Configure additional options for your workflow.
      </FormDescription>
      
      <div className="flex flex-row gap-4">
        <FormField
          control={form.control}
          name="options.enableNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row w-1/3 h-full items-start space-x-3 space-y-0">
              <FormControl>
                <CheckboxCard
                  checked={field.value}
                  label="Enable Notifications"
                  details="Send notifications when workflow status changes"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="options.enableLogging"
          render={({ field }) => (
            <FormItem className="flex flex-row w-1/3 h-full items-start space-x-3 space-y-0">
              <FormControl>
                <CheckboxCard
                  checked={field.value}
                  label="Enable Logging"
                  details="Record detailed logs for this workflow"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="options.enableRetry"
          render={({ field }) => (
            <FormItem className="flex flex-row w-1/3 h-full items-start space-x-3 space-y-0">
              <FormControl>
                <CheckboxCard
                  checked={field.value}
                  label="Enable Automatic Retry"
                  details="Automatically retry failed steps up to 3 times"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
} 