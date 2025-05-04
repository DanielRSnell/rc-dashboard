"use client";

import React, { useState, useEffect } from 'react';
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';

const ClientOnlyChart = ({ chartData, className }) => {
  // Fixed height for the chart
  const fixedContainerHeight = 5 * 60 + 24; // 324px
  
  // State for time series data
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const maxDataPoints = 60; // Show last 60 seconds
  
  // Generate a more noticeable random variation for the data
  const generateVariation = (baseValue, percent = 0.25) => {
    const variation = baseValue * percent;
    return baseValue + (Math.random() * variation * 2 - variation);
  };
  
  // Use logarithmic values for display while preserving the original values for tooltip
  const scaleForDisplay = (value, type) => {
    // Store original value for tooltip display
    const originalValue = value;
    
    // For visualization purposes, we'll use dynamic scaling with better separation
    if (type === 'max_memory_usage') {
      // For max memory usage, we want to show it's much larger but still within visible range
      // Add significant randomness to make it visibly change
      const randomFactor = 0.85 + (Math.random() * 0.3); // Between 0.85 and 1.15
      return { displayValue: 4 * 1073741824 * randomFactor, originalValue }; // Display at ~4GB level
    } else if (type === 'gpu_utilization') {
      // Stagger the metrics for better visibility with randomness
      const randomFactor = 0.7 + (Math.random() * 0.6); // Between 0.7 and 1.3
      return { displayValue: 3 * 1073741824 * randomFactor, originalValue }; // Display at ~3GB
    } else if (type === 'cpu_utilization') {
      const randomFactor = 0.6 + (Math.random() * 0.8); // Between 0.6 and 1.4
      return { displayValue: 2 * 1073741824 * randomFactor, originalValue }; // Display at ~2GB
    } else if (type === 'memory_utilization') {
      const randomFactor = 0.5 + (Math.random() * 1.0); // Between 0.5 and 1.5
      return { displayValue: 1 * 1073741824 * randomFactor, originalValue }; // Display at ~1GB
    }
    
    return { displayValue: value, originalValue };
  };
  
  // Generate a data point for a specific time
  const generateDataPoint = (data, timestamp) => {
    const dataPoint = {
      time: timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timestamp: timestamp
    };
    
    // Add each metric to the data point with significant variations
    data.metrics.forEach(metric => {
      const metricKey = metric.name.toLowerCase().replace(/ /g, '_');
      
      // Create more significant variations for real-time effect
      // Use the variance from the chartData if available
      const variancePercent = metric.variance ? (metric.variance / metric.baseValue) * 2 : 0.25;
      const originalValue = generateVariation(metric.baseValue, variancePercent);
      
      // For max memory usage, occasionally show spikes
      if (metricKey === 'max_memory_usage' && Math.random() > 0.9) {
        // Create occasional spikes (10% chance)
        const spikeValue = originalValue * (1.2 + Math.random() * 0.3); // 20-50% spike
        const { displayValue } = scaleForDisplay(spikeValue, metricKey);
        dataPoint[metricKey] = displayValue;
        dataPoint[`${metricKey}_original`] = spikeValue;
      } else {
        const { displayValue } = scaleForDisplay(originalValue, metricKey);
        dataPoint[metricKey] = displayValue;
        dataPoint[`${metricKey}_original`] = originalValue;
      }
    });
    
    return dataPoint;
  };
  
  // Generate time series data for the last 60 seconds
  const generateTimeSeriesData = (data) => {
    const result = [];
    const now = new Date();
    
    // Generate data for the last 60 seconds with a trend pattern
    for (let i = maxDataPoints - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 1000);
      
      // Create a wave pattern in the historical data
      // This makes the initial chart look more interesting
      const trendFactor = 1 + 0.2 * Math.sin(i / 10 * Math.PI);
      const dataPoint = generateDataPoint(data, timestamp);
      
      // Apply the trend factor to each metric
      Object.keys(dataPoint).forEach(key => {
        if (key.includes('utilization') || key.includes('usage')) {
          if (!key.includes('original')) {
            dataPoint[key] = dataPoint[key] * trendFactor;
          }
        }
      });
      
      result.push(dataPoint);
    }
    
    return result;
  };

  // Format bytes to human-readable format
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const base = 1024;
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
    const formattedValue = bytes / Math.pow(base, unitIndex);
    
    // For values less than 10, show one decimal place
    // For values 10 or greater, show no decimal places
    return `${formattedValue.toFixed(1)} ${units[unitIndex]}`;
  };

  // Mark when component is mounted on client
  useEffect(() => {
    setMounted(true);
    
    // Generate initial data only after mounting
    if (chartData) {
      const initialData = generateTimeSeriesData(chartData);
      setTimeSeriesData(initialData);
      
      // Set up interval to update data every second
      const intervalId = setInterval(() => {
        // Force a completely new data point each second
        const newDataPoint = generateDataPoint(chartData, new Date());
        
        setTimeSeriesData(prevData => {
          // Add the new data point and remove oldest if we exceed max points
          const updatedData = [...prevData, newDataPoint];
          if (updatedData.length > maxDataPoints) {
            return updatedData.slice(updatedData.length - maxDataPoints);
          }
          return updatedData;
        });
      }, 1000); // Update every second
      
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []);

  // If not mounted yet, show loading state
  if (!mounted || !chartData) {
    return (
      <div className={`${className || ''} overflow-hidden rounded-lg bg-card`}>
        <div className="p-6">
          <div className="flex flex-col space-y-1.5 pb-4">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">System Resource Utilization</h3>
            <p className="text-sm text-muted-foreground">Loading chart...</p>
          </div>
          <div style={{ height: fixedContainerHeight }} className="mt-4 flex items-center justify-center">
            <p>Initializing chart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-black border-2 border-gray-900/30 shadow-lg rounded-lg p-6 relative overflow-hidden ${className || ''}`}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent pointer-events-none"></div>
      
      <div className="flex flex-col space-y-1.5 mb-6">
        <h3 className="text-2xl font-semibold text-white">{chartData.title}</h3>
        <p className="text-sm text-gray-400">{chartData.subtitle}</p>
      </div>
      
      <div style={{ height: fixedContainerHeight }} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={timeSeriesData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            {/* Gradient definitions for each area */}
            <defs>
              <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(255, 220, 50, 0.9)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="rgba(255, 220, 50, 0.2)" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(62, 207, 142, 0.9)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="rgba(62, 207, 142, 0.2)" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(56, 189, 248, 0.9)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="rgba(56, 189, 248, 0.2)" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorMaxMem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(255, 65, 105, 0.9)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="rgba(255, 65, 105, 0.2)" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            
            {/* Dark grid for better readability */}
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            
            {/* X-axis showing time */}
            <XAxis 
              dataKey="time" 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              minTickGap={30}
            />
            
            {/* Y-axis with logarithmic scale */}
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              width={60}
              fontSize={12}
              domain={[0.5 * 1073741824, 5 * 1073741824]} // Expanded domain for more visible changes
              tickFormatter={formatBytes}
            />
            
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '10px' }}
              formatter={(value, name, props) => {
                // Extract the metric name without the '_original' suffix if present
                const baseName = name.replace('_original', '');
                
                // Normalize the metric names
                const normalizedNames = {
                  'gpu_utilization': 'GPU',
                  'cpu_utilization': 'CPU',
                  'memory_utilization': 'Memory',
                  'max_memory_usage': 'Max Memory'
                };
                
                const formattedName = normalizedNames[baseName] || 
                  baseName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                
                // Get the original value from the data point
                const dataPoint = props.payload;
                const originalValueKey = `${baseName}_original`;
                const originalValue = dataPoint[originalValueKey] || value;
                
                // Show formatted value first, then raw value in smaller text
                return [
                  <span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'bold' }}>{formatBytes(originalValue)}</span>
                    <br />
                    <span style={{ fontSize: '0.7em', color: 'rgba(255, 255, 255, 0.5)' }}>{originalValue.toString()}</span>
                  </span>, 
                  formattedName
                ];
              }}
              labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
            />
            
            {/* Display a message if no data is available */}
            {timeSeriesData.length === 0 && (
              <text x="50%" y="50%" textAnchor="middle" fill="white" dominantBaseline="middle">
                Loading data...
              </text>
            )}
            
            <Area 
              type="monotone" 
              dataKey="memory_utilization" 
              name="Memory Utilization"
              stroke="rgba(255, 220, 50, 1)" 
              strokeWidth={2}
              fillOpacity={0.7}
              fill="url(#colorMem)" 
              isAnimationActive={true}
              animationDuration={300}
              stackId="1"
            />
            
            <Area 
              type="monotone" 
              dataKey="cpu_utilization" 
              name="CPU Utilization"
              stroke="rgba(62, 207, 142, 1)" 
              strokeWidth={2}
              fillOpacity={0.7}
              fill="url(#colorCpu)" 
              isAnimationActive={true}
              animationDuration={300}
              stackId="2"
            />
            
            <Area 
              type="monotone" 
              dataKey="gpu_utilization" 
              name="GPU Utilization"
              stroke="rgba(56, 189, 248, 1)" 
              strokeWidth={2}
              fillOpacity={0.7}
              fill="url(#colorGpu)" 
              isAnimationActive={true}
              animationDuration={300}
              stackId="3"
            />
            
            <Area 
              type="monotone" 
              dataKey="max_memory_usage" 
              name="Max Memory Usage"
              stroke="rgba(255, 65, 105, 1)" 
              strokeWidth={2}
              fillOpacity={0.7}
              fill="url(#colorMaxMem)"
              isAnimationActive={true}
              animationDuration={300}
              dot={false}
              stackId="4"
            />
            
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ 
                paddingTop: '10px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px'
              }}
              formatter={(value) => {
                // Normalize the long metric names
                const normalizedNames = {
                  'GPU Utilization': 'GPU',
                  'CPU Utilization': 'CPU',
                  'Memory Utilization': 'Memory',
                  'Max Memory Usage': 'Max Memory'
                };
                return <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{normalizedNames[value] || value}</span>;
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* "Now" indicator */}
      <div className="absolute right-6 bottom-6 text-xs text-gray-400 flex items-center">
        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
        Now
      </div>
    </div>
  );
};

export default ClientOnlyChart;
