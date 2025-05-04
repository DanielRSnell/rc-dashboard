'use client'

import * as React from 'react'
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip
} from 'recharts'

export function ChartContainer({
  config,
  children,
  className,
  ...props
}) {
  // Generate CSS variables for chart colors
  const style = React.useMemo(() => {
    if (!config) return {}
    
    return Object.entries(config).reduce((acc, [key, value]) => {
      acc[`--color-${key}`] = value.color
      return acc
    }, {})
  }, [config])

  return (
    <div className={className} style={style} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export function CustomTooltip({ active, payload, label, config }) {
  if (!active || !payload?.length || !config) return null

  // Fixed values for display in tooltip
  const fixedValues = {
    gpu_utilization: 1073741824,
    cpu_utilization: 1073741824,
    memory_utilization: 1073741824,
    max_memory_usage: 9007199254740991
  };

  // Function to format bytes in a human-readable way
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="rounded-lg border border-gray-900/30 bg-black/90 p-2 shadow-md backdrop-blur-sm">
      <div className="text-xs font-medium text-foreground">{label}</div>
      <div className="mt-1 space-y-0.5">
        {payload.map((item, index) => {
          const dataKey = item.dataKey;
          const configItem = config[dataKey];
          
          if (!configItem) return null;
          
          // Use fixed values for display but keep actual chart behavior
          const displayValue = fixedValues[dataKey] || item.value;
          const formattedValue = formatBytes(displayValue);
          
          return (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="h-2 w-2 rounded-full" 
                style={{ backgroundColor: configItem.color }}
              />
              <span className="text-xs text-muted-foreground">
                {configItem.label}:
              </span>
              <span className="text-xs font-medium text-foreground">
                {formattedValue}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Type definition for chart configuration
export const ChartConfig = {}
