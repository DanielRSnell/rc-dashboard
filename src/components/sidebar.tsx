import { cn } from "@/lib/utils";
import { AuthenticationStatus } from "@/components/dashboard/AuthenticationStatus";
import { Home, Settings, Play, BarChart, Server, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: 'Workflows',
    href: '/workflow',
    icon: <Play className="h-5 w-5" />,
  },
  {
    title: 'Silicon Allocation',
    href: '/silicon',
    icon: <Server className="h-5 w-5" />,
  },
  {
    title: 'Compute Pools',
    href: '/pools',
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: 'Team Management',
    href: '/teams',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  // Use React Router's useLocation hook to get the current path
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-800 bg-gray-950">
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <Link to="/dashboard" className="flex items-center gap-2">
           <img 
                  src="/assets/logo-dark-bg.svg" 
                  alt="Nightcrawler Logo" 
                  className="h-6 w-full"
                />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-6">
        <nav className="space-y-1 px-4">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  ? 'bg-gray-800/50 /50 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 /50 hover:text-white'
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-800 p-4">
        <AuthenticationStatus />
      
      </div>
    </div>
  );
}
