'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface GaugeProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: string;
  unit?: string;
  className?: string;
  colorMode?: 'auto' | 'success' | 'warning' | 'danger' | 'info';
}

export function Gauge({
  value,
  max = 100,
  size = 'md',
  showValue = true,
  label,
  unit = '',
  className,
  colorMode = 'auto',
}: GaugeProps) {
  // Calculate percentage
  const percentage = Math.min(Math.max(0, value), max) / max * 100;
  
  // Determine color based on percentage or forced colorMode
  const getColor = (opacity = 1) => {
    let color;
    if (colorMode !== 'auto') {
      // Update colors to use RGBA values
      switch (colorMode) {
        case 'success': color = 'rgba(16, 185, 129, 1)'; break;
        case 'warning': color = 'rgba(245, 158, 11, 1)'; break;
        case 'danger': color = 'rgba(239, 68, 68, 1)'; break;
        case 'info': color = 'var(--info, #3b82f6)'; break;
        default: color = 'var(--primary, #6366f1)';
      }
    } else {
      // Auto color based on percentage
      if (percentage < 30) color = 'rgba(239, 68, 68, 1)';
      else if (percentage < 70) color = 'rgba(245, 158, 11, 1)';
      else color = 'rgba(16, 185, 129, 1)';
    }
    
    // If opacity is not 1, convert to rgba
    if (opacity !== 1) {
      // Handle CSS variables
      if (color.startsWith('var(')) {
        return `var(--${colorMode}-translucent, rgba(255, 255, 255, ${opacity}))`;
      }
      // Handle hex colors
      return color.replace(/^#/, '').match(/.{2}/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];
    }
    
    return color;
  };
  
  // Size configurations
  const sizeConfig = {
    sm: {
      width: 120,
      strokeWidth: 12,
      fontSize: 'text-xl',
      labelSize: 'text-xs',
      valueOffset: 0,
      labelOffset: 2,
    },
    md: {
      width: 160,
      strokeWidth: 16,
      fontSize: 'text-3xl',
      labelSize: 'text-sm',
      valueOffset: 0,
      labelOffset: 4,
    },
    lg: {
      width: 220,
      strokeWidth: 24,
      fontSize: 'text-4xl',
      labelSize: 'text-base',
      valueOffset: 0,
      labelOffset: 6,
    },
  };
  
  const { width, strokeWidth, fontSize, labelSize, valueOffset, labelOffset } = sizeConfig[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Only half circle (180 degrees)
  
  // Calculate SVG path for the arc (semi-circle)
  const pathD = [
    `M ${strokeWidth / 2}`,
    `${width / 2}`,
    `A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2}`,
    `${width / 2}`,
  ].join(' ');
  
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative" style={{ width: `${width}px`, height: `${width / 2 + 30}px` }}>
        {/* Background track */}
        <svg
          width={width}
          height={width / 2}
          viewBox={`0 0 ${width} ${width / 2}`}
          className="transform rotate-0"
        >
          {/* Background track with translucent color */}
          <path
            d={pathD}
            fill="none"
            stroke={getColor(0.2)} // Use same color with opacity
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Colored progress */}
          <path
            d={pathD}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
            strokeDashoffset="0"
          />
        </svg>
        
        {/* Value display */}
        {showValue && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center pt-[23px]"
          >
            <motion.div 
              className={cn("font-bold", fontSize)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {value}{unit}
            </motion.div>
            {label && (
              <motion.div 
                className={cn("text-muted-foreground", labelSize)}
                style={{ marginTop: `${labelOffset}px` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {label}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 