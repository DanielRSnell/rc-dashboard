'use client';

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select';
import { CheckboxCard } from "@/components/ui/checkbox-card';
import { UseFormReturn } from 'react-hook-form';
import { WorkflowFormValues } from './types';

interface EnvironmentStepProps {
  form: UseFormReturn<WorkflowFormValues>;
}

export function EnvironmentStep({ form }: EnvironmentStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="environmentStrategy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Environment Selection Strategy</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="start">Earliest Start</SelectItem>
                <SelectItem value="time">Fastest Estimated Execution Time</SelectItem>
                <SelectItem value="cost">Least Expensive</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Select the top priority to be used when selecting an execution environment.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="traceLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trace Level and Utilization Measurement</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select trace level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="min">Minimal - Step Start/End Times Only</SelectItem>
                <SelectItem value="med">Standard - Step Start/End Time and Avg Utilization</SelectItem>
                <SelectItem value="debug">Maximum - Debug level traces</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Select how detailed the logging and instrumentation for the execution should be.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div>
        <FormLabel>Compatible Execution Environments</FormLabel>
        <FormDescription className="mb-4">
          Select the environments to consider for execution.
        </FormDescription>
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="environments.awsVirginia"
            render={({ field }) => (
              <FormItem className="flex h-full flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <CheckboxCard
                    checked={field.value}
                    label="AWS (Virginia)"
                    details={
                      <div className="space-y-1">
                        <span>188 / 256 CPU Cores Available</span><br />
                        <span>6144 / 8192 Gb CPU Memory Available</span><br />
                        <span>520 / 1024 GPU Cores Available</span><br />
                        <span>7168 / 8192 Gb GPU Memory Available</span>
                      </div>
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="environments.dgxCloudCalifornia"
            render={({ field }) => (
              <FormItem className="flex h-full flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <CheckboxCard
                    checked={field.value}
                    label="DGX Cloud (Oracle) (California)"
                    details={
                      <div className="space-y-1">
                        <span>248 / 512 CPU Cores Available</span><br />
                        <span>8192 / 32768 Gb CPU Memory Available</span><br />
                        <span>1012 / 4096 GPU Cores Available</span><br />
                        <span>52428.8 / 65536 Gb GPU Memory Available</span>
                      </div>
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
} 