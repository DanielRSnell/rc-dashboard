'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card';
import { Gauge, GaugeProps } from "@/components/ui/gauge';
import { cn } from "@/lib/utils";

interface GaugeCardProps extends GaugeProps {
  title?: string;
  description?: string;
  className?: string;
  cardClassName?: string;
}

export function GaugeCard({
  title,
  description,
  className,
  cardClassName,
  ...gaugeProps
}: GaugeCardProps) {
  return (
    <Card className={cn("custom-border border-gray-900/30/40 bg-black", cardClassName)}>
      {(title || description) && (
        <CardHeader className="pb-0">
          {title && <CardTitle className="text-lg font-medium">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("flex justify-center pt-2 pb-4", className)}>
        <Gauge {...gaugeProps} />
      </CardContent>
    </Card>
  );
} 