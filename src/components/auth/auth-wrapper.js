import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { motion } from 'framer-motion';

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password'];

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the current route is a public route
    const isPublicRoute = publicRoutes.includes(pathname);
    
    // If not authenticated and not on a public route, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login');
    } 
    // If authenticated and on a login page, redirect to dashboard
    else if (isAuthenticated && pathname === '/login') {
      router.push('/dashboard');
    }
    
    // Set loading to false after authentication check
    setIsLoading(false);
  }, [isAuthenticated, pathname, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="h-16 w-16 border-t-2 border-primary animate-spin rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // If on a public route or authenticated, render children
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
