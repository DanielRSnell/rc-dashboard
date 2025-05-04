'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { 
  Server, 
  Cpu, 
  Activity, 
  Network, 
  CircleDashed 
} from 'lucide-react';

// Function to generate random changes for the stats
const generateStatChange = (baseValue, percentRange) => {
  const changePercent = Math.random() * percentRange - (percentRange / 2);
  return {
    value: Math.floor(baseValue * (1 + changePercent / 100)),
    trend: changePercent.toFixed(1)
  };
};

export function StatsCards({ stats: initialStats }) {
  const [stats, setStats] = useState(initialStats || []);
  // Track individual update counters for each stat
  const [updateCounters, setUpdateCounters] = useState(() => 
    initialStats ? initialStats.map(() => 0) : []
  );

  // Update local state when props change
  useEffect(() => {
    if (initialStats) {
      setStats(initialStats);
    }
  }, [initialStats]);

  useEffect(() => {
    // Set up individual intervals for each stat
    const intervals = stats.map((stat, index) => {
      // Different base update intervals for each type of metric
      const baseInterval = 
        stat.title.includes('Demand') ? 5000 : // 5 seconds
        stat.title.includes('Nodes') ? 7000 : // 7 seconds
        stat.title.includes('Workflows') ? 3000 : // 3 seconds
        stat.title.includes('Utilization') ? 2000 : // 2 seconds
        4000; // Default 4 seconds
      
      // Add randomness to prevent predictable patterns
      const updateInterval = baseInterval + (Math.random() * 2000 - 1000); // +/- 1 second
      
      return setInterval(() => {
        // Different fluctuation rates for different metrics
        const fluctuationRate = 
          stat.title.includes('Demand') ? 3 : 
          stat.title.includes('Nodes') ? 2 :
          stat.title.includes('Workflows') ? 8 :
          stat.title.includes('Utilization') ? 1.5 : 5;
          
        const change = generateStatChange(stat.value, fluctuationRate);
        
        // Update only this specific stat
        setStats(prevStats => 
          prevStats.map((s, i) => 
            i === index ? {
              ...s,
              value: change.value,
              trend: change.trend > 0 ? `+${change.trend}` : change.trend
            } : s
          )
        );
        
        // Update only this stat's counter
        setUpdateCounters(prev => 
          prev.map((counter, i) => i === index ? counter + 1 : counter)
        );
      }, updateInterval);
    });
    
    // Clear all intervals on cleanup
    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  // Format number with commas and handle decimals appropriately
  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: num % 1 === 0 ? 0 : 1,
        maximumFractionDigits: num % 1 === 0 ? 0 : 1
      });
    }
    return num;
  };

  // Get the appropriate icon component based on name
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Server': return Server;
      case 'Cpu': return Cpu;
      case 'Activity': return Activity;
      case 'Network': return Network;
      default: return CircleDashed;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        // Get the icon component directly
        const IconComponent = getIconComponent(stat.iconName);
        
        return (
          <Card 
            key={`${stat.title}-${index}`}
            className="bg-black border-2border-gray-900/30 shadow-lg overflow-hidden relative"
          >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30 pointer-events-none"></div>
            
            <div className="p-6 flex flex-col relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                <IconComponent className="h-5 w-5 text-white" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`value-${stat.title}-${updateCounters[index]}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-white"
                >
                  {stat.prefix}{formatNumber(stat.value)}{stat.suffix}
                </motion.div>
              </AnimatePresence>
              
              <div className="mt-1 flex items-center text-xs">
                <span className={parseFloat(stat.trend) >= 0 ? "text-green-400" : "text-red-400"}>
                  {stat.trend}%
                </span>
                <span className="ml-1 text-gray-400">{stat.period}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
