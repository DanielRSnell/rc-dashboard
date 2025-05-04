'use client';

import { useAuthStore } from '@/lib/store/auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthenticationStatus() {
  const { user } = useAuthStore();
  
  // Calculate a mock expiration time (5 minutes from now)
  const expiresIn = "5:00 minutes";
  
  return (
    <Card className="custom-border border-gray-900/30/40">
      <CardHeader>
        <CardTitle>Authentication Status</CardTitle>
        <CardDescription>Keycloak session info</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Status:</span>
            <span className="flex items-center gap-1 text-emerald-500">
              Authenticated <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Token Type:</span>
            <span className="font-mono">{user?.token_type || 'Bearer'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Expires In:</span>
            <span className="font-mono">{expiresIn}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Token will be refreshed automatically
      </CardFooter>
    </Card>
  );
}
