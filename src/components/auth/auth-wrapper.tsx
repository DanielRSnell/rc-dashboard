import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';

interface AuthWrapperProps {
  children: React.ReactNode;
  publicPaths?: string[];
}

export default function AuthWrapper({ 
  children, 
  publicPaths = ['/login', '/register', '/forgot-password'] 
}: AuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the current path is public
    const isPublicPath = publicPaths.includes(pathname);
    
    // Check if user is authenticated
    const isAuthenticated = checkAuth();
    
    if (!isAuthenticated && !isPublicPath) {
      // Redirect to login if not authenticated and not on a public path
      router.push('/login');
    } else if (isAuthenticated && pathname === '/login') {
      // Redirect to dashboard if already authenticated and trying to access login
      router.push('/dashboard');
    }
    
    setIsLoading(false);
  }, [pathname, router, checkAuth, publicPaths]);

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
} 

export { AuthWrapper };