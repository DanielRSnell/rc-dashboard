'use client';

import { Button } from "@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card';

export function QuickActions() {
  return (
    <Card className="custom-border border-gray-900/30/40">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common dashboard tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="ghost" className="w-full justify-start text-sm font-normal">
          View All Clusters
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sm font-normal">
          Workflow Queue
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sm font-normal">
          Resource Allocation
        </Button>
      </CardContent>
    </Card>
  );
}
