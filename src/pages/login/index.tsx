import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // In our static export, we don't actually use the credentials
      // but we're keeping the form for UI consistency
      login('mock-token', {
        id: '1',
        name: 'Test User',
        email: username,
      });
      
      // In a real app with routing, we would navigate to the dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <Card className="custom-border border-gray-900/30/40 shadow-md">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative h-16 w-[75%] mx-auto mb-4">
                <img 
                  src="/assets/logo-dark-bg.svg" 
                  alt="Nightcrawler Logo" 
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-foreground/90 mb-1.5">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground/90 mb-1.5">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-destructive text-sm p-2 bg-destructive/10 rounded border border-destructive/20"
                >
                  {error}
                </motion.div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading} 
              className="w-full font-medium"
              variant="default"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-t-2 border-primary-foreground animate-spin rounded-full"></span>
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-1">
              For demo purposes, any username and password will work.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
