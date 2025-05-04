'use client';

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form';
import { Input } from "@/components/ui/input';
import { Textarea } from "@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { WorkflowFormValues } from './types';

interface BasicDetailsStepProps {
  form: UseFormReturn<WorkflowFormValues>;
}

export function BasicDetailsStep({ form }: BasicDetailsStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Workflow Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter workflow name" {...field} />
            </FormControl>
            <FormDescription>
              A descriptive name for your workflow.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the purpose of this workflow" 
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Optional description of what this workflow does.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Priority</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Set the priority level for this workflow.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
} 