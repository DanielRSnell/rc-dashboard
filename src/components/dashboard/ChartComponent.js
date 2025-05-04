"use client";

import React, { useState, useEffect } from 'react';
import {
  ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const ChartComponent = ({ chartData, className }) => {
  // Fixed height for the chart
  const fixedContainerHeight = 324; // 5 * 60 + 24 = 324px
  
  // State for time series data
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const maxDataPoints = 60; // Show last 60 seconds
  
  // Generate a variation for the data
  const generateVariation = (baseValue, percent = 0.25) => {
    const variation = baseValue * percent;
    return baseValue + (Math.random() * variation * 2 - variation);
  };
  
  // Scale values for display while preserving the original values for tooltip
  const scaleForDisplay = (value, type) => {
    const originalValue = value;
    
    // For visualization purposes, use fixed levels with some randomness
    if (type === 'max_memory_usage') {
      return { 
        displayValue: 4 * 1073741824 * (0.9 + Math.random() * 0.2), 
        originalValue 
      };
    } else if (type === 'gpu_utilization') {
      return { 
        displayValue: 3 * 1073741824 * (0.8 + Math.random() * 0.4), 
        originalValue 
      };
    } else if (type === 'cpu_utilization') {
      return { 
        displayValue: 2 * 1073741824 * (0.7 + Math.random() * 0.6), 
        originalValue 
      };
    } else if (type === 'memory_utilization') {
      return { 
        displayValue: 1 * 1073741824 * (0.6 + Math.random() * 0.8), 
        originalValue 
      };
    }
    
    return { displayValue: value, originalValue };
  };
  
  // Generate a data point for a specific time
  const generateDataPoint = (data, timestamp) => {
    const dataPoint = {
      time: timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }),
      timestamp: timestamp
    };
    
    // Add each metric to the data point
    data.metrics.forEach(metric => {
      const metricKey = metric.name.toLowerCase().replace(/ /g, '_');
      const variancePercent = metric.variance ? (metric.variance / metric.baseValue) * 2 : 0.25;
      const originalValue = generateVariation(metric.baseValue, variancePercent);
      
      // For max memory usage, occasionally show spikes
      if (metricKey === 'max_memory_usage' && Math.random() > 0.9) {
        const spikeValue = originalValue * (1.2 + Math.random() * 0.3);
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
    
    // Generate data for the last 60 seconds with a wave pattern
    for (let i = maxDataPoints - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 1000);
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
    
    return `${formattedValue.toFixed(1)} ${units[unitIndex]}`;
  };

  // Initialize and update time series data
  useEffect(() => {
    // Generate initial data
    const initialData = generateTimeSeriesData(chartData);
    setTimeSeriesData(initialData);
    
    // Set up interval to update data every second
    const intervalId = setInterval(() => {
      const newDataPoint = generateDataPoint(chartData, new Date());
      
      setTimeSeriesData(prevData => {
        const updatedData = [...prevData, newDataPoint];
        if (updatedData.length > maxDataPoints) {
          return updatedData.slice(updatedData.length - maxDataPoints);
        }
        return updatedData;
      });
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [chartData]);

  return (
    <div className={`bg-black border-2 border-gray-900/30 shadow-lg rounded-lg p-6 relative overflow-hidden ${className || ''}`}>
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
            
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            
            <XAxis 
              dataKey="time" 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              minTickGap={30}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              width={60}
              fontSize={12}
              domain={[0.5 * 1073741824, 5 * 1073741824]}
              tickFormatter={formatBytes}
            />
            
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                border: '1px solid rgba(255, 255, 255, 0.2)', 
                padding: '10px' 
              }}
              formatter={(value, name, props) => {
                const baseName = name.replace('_original', '');
                
                const normalizedNames = {
                  'gpu_utilization': 'GPU',
                  'cpu_utilization': 'CPU',
                  'memory_utilization': 'Memory',
                  'max_memory_usage': 'Max Memory'
                };
                
                const formattedName = normalizedNames[baseName] || 
                  baseName.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ');
                
                const dataPoint = props.payload;
                const originalValueKey = `${baseName}_original`;
                const originalValue = dataPoint[originalValueKey] || value;
                
                return [
                  <span key="value">
                    <span style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: 'bold' 
                    }}>
                      {formatBytes(originalValue)}
                    </span>
                    <br />
                    <span style={{ 
                      fontSize: '0.7em', 
                      color: 'rgba(255, 255, 255, 0.5)' 
                    }}>
                      {originalValue.toString()}
                    </span>
                  </span>, 
                  formattedName
                ];
              }}
              labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
            />
            
            {timeSeriesData.length === 0 && (
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                fill="white" 
                dominantBaseline="middle"
              >
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
                const normalizedNames = {
                  'GPU Utilization': 'GPU',
                  'CPU Utilization': 'CPU',
                  'Memory Utilization': 'Memory',
                  'Max Memory Usage': 'Max Memory'
                };
                return (
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {normalizedNames[value] || value}
                  </span>
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="absolute right-6 bottom-6 text-xs text-gray-400 flex items-center">
        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
        Now
      </div>
    </div>
  );
};

export default ChartComponent;
