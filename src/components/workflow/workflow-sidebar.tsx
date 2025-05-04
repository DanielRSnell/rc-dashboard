// Link import removed - use <a> tags instead;
// usePathname import removed;
import { cn } from '@/lib/utils';
import { 
  Plus, 
  List, 
  Clock, 
  Star, 
  Archive, 
  Settings 
} from 'lucide-react';

interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const workflowNavItems: SidebarNavItem[] = [
  {
    title: 'All Workflows',
    href: '/workflow',
    icon: <List className="h-5 w-5" />,
  },
  {
    title: 'Create Workflow',
    href: '/workflow/create',
    icon: <Plus className="h-5 w-5" />,
  },
  // {
  //   title: 'Recent',
  //   href: '/workflow/recent',
  //   icon: <Clock className="h-5 w-5" />,
  // },
  // {
  //   title: 'Starred',
  //   href: '/workflow/starred',
  //   icon: <Star className="h-5 w-5" />,
  // },
  // {
  //   title: 'Archived',
  //   href: '/workflow/archived',
  //   icon: <Archive className="h-5 w-5" />,
  // },
  // {
  //   title: 'Settings',
  //   href: '/workflow/settings',
  //   icon: <Settings className="h-5 w-5" />,
  // },
];

export function WorkflowSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-800 bg-gray-900/10 backdrop-blur-md /40">
      <div className="flex h-16 items-center border-b border-gray-800 px-4">
        <h2 className="text-lg font-semibold text-white">Workflows</h2>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {workflowNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
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
    </div>
  );
} 