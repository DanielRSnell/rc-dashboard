'use client';

import * as React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface UtilizationGridProps {
  title?: string;
  description?: string;
  data?: number[];
  days?: number;
  columns?: number;
  className?: string;
  cardClassName?: string;
  showTooltip?: boolean;
}

export function UtilizationGrid({
  title = 'CPU Core Utilization',
  description = 'Daily utilization for the past year',
  data,
  days = 364,
  columns = 52, // 52 weeks in a year (7 rows x 52 columns = 364 days)
  className,
  cardClassName,
  showTooltip = true
}: UtilizationGridProps) {
  // Generate random data if none provided
  const [utilizationData, setUtilizationData] = React.useState<number[]>([]);
  const [hoveredDay, setHoveredDay] = React.useState<number | null>(null);
  
  React.useEffect(() => {
    if (data) {
      setUtilizationData(data);
    } else {
      // Generate random utilization data for the past 365 days with a more realistic pattern
      const newData = Array.from({ length: days }, () => {
        // 40% chance of very low or no utilization (0-5%)
        if (Math.random() < 0.4) {
          return Math.floor(Math.random() * 5);
        }
        
        // 40% chance of low to medium utilization (5-40%)
        if (Math.random() < 0.7) {
          return Math.floor(Math.random() * 35) + 5;
        }
        
        // 20% chance of medium to high utilization (40-100%)
        return Math.floor(Math.random() * 60) + 40;
      });
      
      setUtilizationData(newData);
    }
  }, [data, days]);

  // Calculate level for each cell (0-5)
  const getLevelForValue = (value: number) => {
    if (value < 5) return 0;   // Almost no activity (dark gray)
    if (value < 25) return 1;  // Low activity (green)
    if (value < 50) return 2;  // Medium-low activity (light green-yellow)
    if (value < 75) return 3;  // Medium activity (yellow)
    if (value < 85) return 4;  // High activity (orange-red)
    return 5;                  // Very high activity (bright red)
  };

  // Get Tailwind color class based on level
  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-green-300/10';
      case 1: return 'bg-green-300/30';
      case 2: return 'bg-green-300/50';
      case 3: return 'bg-green-300/60';
      case 4: return 'bg-green-300/80';
      case 5: return 'bg-green-300';
      default: return 'bg-green-50/10';
    }
  };

  // Generate date for a specific day (counting backwards from today)
  const getDateForDay = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
  };

  // Format date for tooltip
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <Card className={cn("custom-border border-gray-900/30/40 bg-black", cardClassName)}>
      <CardHeader className="pb-2">
        {title && <CardTitle className="text-2xl font-medium">{title}</CardTitle>}
        {description && <CardDescription className="text-gray-400 text-base">{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="flex flex-col space-y-6 gap-3">
          {/* Responsive container - only scrollable on smaller screens */}
          <div className="w-full md:overflow-visible overflow-x-auto pb-2 custom-scrollbar">
            <div className="min-w-[800px] md:w-full md:min-w-0">
              <div 
                className="grid gap-1" 
                style={{ 
                  gridTemplateColumns: `repeat(${columns}, minmax(10px, 1fr))`,
                  gridTemplateRows: 'repeat(7, 1fr)',
                  height: '120px'
                }}
              >
                {utilizationData.map((value, index) => {
                  const level = getLevelForValue(value);
                  const colorClass = getColorClass(level);
                  
                  return (
                    <div 
                      key={index}
                      className={cn(
                        "aspect-square rounded-sm border border-gray-800/50 transition-all duration-200",
                        colorClass,
                        "hover:scale-110 hover:z-10 hover:shadow-md hover:border-gray-600 relative"
                      )}
                      onMouseEnter={() => setHoveredDay(index)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {showTooltip && hoveredDay === index && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/10 backdrop-blur-md  text-white text-xs px-2 py-1 rounded pointer-events-none opacity-100 whitespace-nowrap z-20 border border-gray-700 shadow-lg">
                          {formatDate(getDateForDay(days - index - 1))}: {value}% utilized
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Legend - fixed at bottom with more spacing */}
          <div className="flex justify-center md:justify-end pt-2 border-t border-gray-800/30">
            <div className="flex items-center">
              <span className="mr-2 text-xs text-gray-400">Low</span>
              {[0, 1, 2, 3, 4, 5].map((level) => (
                <div 
                  key={level} 
                  className={cn(
                    "w-2.5 h-2.5 rounded-sm mx-0.5 border border-gray-800/50",
                    getColorClass(level)
                  )}
                ></div>
              ))}
              <span className="ml-2 text-xs text-gray-400">High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 