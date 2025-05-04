'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, CustomTooltip } from "@/components/ui/chart";

export function OverviewChart({ chartData, className }) {
  // Calculate a fixed height to match the RecentWorkflows component
  // RecentWorkflows uses 5 items * 60px + 24px padding
  const fixedContainerHeight = 5 * 60 + 24; // 324px
  // Default data if none provided
  const defaultData = {
    title: 'System Resource Utilization',
    subtitle: 'Real-time resource metrics',
    yAxisLabel: 'Bytes',
    series: [
      {
        name: 'GPU Utilization',
        color: 'rgba(56, 189, 248, 1)',
        baseValue: 650,
        variance: 30
      },
      {
        name: 'CPU Utilization',
        color: 'rgba(62, 207, 142, 1)',
        baseValue: 450,
        variance: 25
      },
      {
        name: 'Memory Utilization',
        color: 'rgba(255, 220, 50, 1)',
        baseValue: 300,
        variance: 20
      },
      {
        name: 'Max Memory Usage',
        color: 'rgba(255, 65, 105, 1)',
        baseValue: 200,
        variance: 15
      }
    ]
  };

  // Use provided data or fallback to default
  const { title, subtitle, yAxisLabel } = chartData || defaultData;
  // If chartData has series with data property, convert to our new format
  const seriesConfig = useMemo(() => {
    if (chartData?.series && chartData.series[0]?.data) {
      // Convert old format to new format
      return chartData.series.map(s => ({
        name: s.name,
        color: s.color,
        baseValue: s.data[s.data.length - 1]?.value || 500,
        variance: Math.floor(s.baseValue * 0.05) || 25
      }));
    }
    return defaultData.series;
  }, [chartData]);
  
  // State for time-series data
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const maxDataPoints = 60; // Show last 60 seconds
  
  // Generate random fluctuation around a base value
  const generateRandomFluctuation = (base, variance) => {
    return base + Math.random() * variance * 2 - variance;
  };
  
  // Map series names to data keys for the tooltip
  const seriesNameToDataKey = {
    'GPU Utilization': 'gpu_utilization',
    'CPU Utilization': 'cpu_utilization',
    'Memory Utilization': 'memory_utilization',
    'Max Memory Usage': 'max_memory_usage'
  };
  
  // Initialize time series data
  useEffect(() => {
    // Create initial data points
    const initialData = [];
    const now = new Date();
    
    // Generate data for the last 60 seconds
    for (let i = 59; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 1000);
      const dataPoint = {
        time: timestamp.toISOString(),
        displayTime: `${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp.getSeconds().toString().padStart(2, '0')}`
      };
      
      // Add values for each series
      seriesConfig.forEach(s => {
        // Use the mapping for consistent keys with the tooltip
        const key = seriesNameToDataKey[s.name] || s.name.toLowerCase().replace(/\s+/g, '_');
        dataPoint[key] = generateRandomFluctuation(s.baseValue, s.variance);
      });
      
      initialData.push(dataPoint);
    }
    
    setTimeSeriesData(initialData);
    
    // Log for debugging
    console.log('Initial data created:', initialData[0]);
  }, [seriesConfig]); // Add seriesConfig as dependency
  
  // Update data every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Create new data point
      const newDataPoint = {
        time: now.toISOString(),
        displayTime: `${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      };
      
      // Add values for each series
      seriesConfig.forEach(s => {
        // Use the mapping for consistent keys with the tooltip
        const key = seriesNameToDataKey[s.name] || s.name.toLowerCase().replace(/\s+/g, '_');
        newDataPoint[key] = generateRandomFluctuation(s.baseValue, s.variance);
      });
      
      // Update time series data, keeping only the last maxDataPoints
      setTimeSeriesData(prevData => {
        const newData = [...prevData, newDataPoint];
        if (newData.length > maxDataPoints) {
          return newData.slice(newData.length - maxDataPoints);
        }
        return newData;
      });
      
      // Log for debugging
      console.log('New data point added:', newDataPoint);
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, [seriesConfig]);
  
  // Create chart config for shadcn/ui chart
  const chartConfig = useMemo(() => {
    return seriesConfig.reduce((config, s) => {
      // Use the mapping for consistent keys with the tooltip
      const key = seriesNameToDataKey[s.name] || s.name.toLowerCase().replace(/\s+/g, '_');
      config[key] = {
        label: s.name,
        color: s.color
      };
      return config;
    }, {});
  }, [seriesConfig]);

  return (
    <div className={`bg-black border-2border-gray-900/30 shadow-lg rounded-lg p-6 relative overflow-hidden ${className}`}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30 pointer-events-none"></div>
      
      <div className="space-y-2 relative z-10">
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        
        <div 
          className="relative overflow-hidden mt-6" 
          style={{ height: `${fixedContainerHeight}px`, minHeight: `${fixedContainerHeight}px` }}
        >
          <ChartContainer config={chartConfig} className="w-full h-full">
            <AreaChart 
              data={timeSeriesData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              className="chart-container"
            >
              <defs>
                {seriesConfig.map((s) => {
                  // Use the mapping for consistent keys with the tooltip
                  const dataKey = seriesNameToDataKey[s.name] || s.name.toLowerCase().replace(/\s+/g, '_');
                  return (
                    <linearGradient key={`gradient-${dataKey}`} id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={s.color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={s.color} stopOpacity={0.1}/>
                    </linearGradient>
                  );
                })}
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="var(--chart-grid)" 
                className="chart-grid"
              />
              <XAxis 
                dataKey="displayTime" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--chart-text)' }}
                dy={10}
                fontSize={12}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--chart-text)' }}
                width={40}
                fontSize={12}
                tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)}
              />
              <Tooltip 
                content={({ active, payload, label }) => (
                  <CustomTooltip active={active} payload={payload} label={label} config={chartConfig} />
                )}
                cursor={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              />
              
              {/* Debug information */}
              {timeSeriesData.length === 0 && (
                <text x="50%" y="50%" textAnchor="middle" fill="white">
                  Loading data...
                </text>
              )}
              
              {/* Render an Area for each series */}
              {seriesConfig.map((s, index) => {
                // Use the mapping for consistent keys with the tooltip
                const dataKey = seriesNameToDataKey[s.name] || s.name.toLowerCase().replace(/\s+/g, '_');
                return (
                  <Area 
                    key={dataKey}
                    type="monotone"
                    dataKey={dataKey} 
                    stroke={s.color}
                    fillOpacity={1}
                    fill={`url(#gradient-${dataKey})`}
                    stackId="1"
                    animationDuration={300}
                    animationEasing="ease-out"
                    isAnimationActive={true}
                  />
                );
              })}
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
