import { useAuthStore } from '@/lib/store/auth';
import { Button } from "@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
export function AuthenticationStatus() {
  const { user, logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    // Navigate to login page
    window.history.pushState({}, '', '/login');
    // Dispatch a custom event that App.tsx can listen for
    window.dispatchEvent(new Event('locationchange'));
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <span className="text-gray-400 text-xs">Logged in as </span>
        <span className="font-medium text-white text-xs">{user.name}</span>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLogout}
        className="h-8 border-gray-700 bg-gray-800/50 /50 hover:bg-gray-700 hover:text-white"
      >
        {/* Use a Lucide Icon for the logout button */}
        <LogOutIcon className="h-4 w-4" />
      </Button>
    </div>
  );
} 