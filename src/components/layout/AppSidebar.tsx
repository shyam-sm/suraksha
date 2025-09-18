import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  Home,
  MapPin,
  Settings,
  Shield,
  Users,
  AlertTriangle,
  Calendar,
  User,
  QrCode,
  Radio,
  Star,
  TrendingUp,
  Globe,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/lib/auth';

// Navigation items for admin panel
const adminNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Map & Geofences', url: '/map', icon: MapPin },
  { title: 'Reviews', url: '/reviews', icon: Star },
  { title: 'Reports', url: '/reports', icon: FileText },
  { title: 'Broadcast', url: '/broadcast', icon: Radio },
  { title: 'Tourist Management', url: '/tourist-management', icon: Users },
  { title: 'Alerts & Incidents', url: '/incidents', icon: AlertTriangle },
  { title: 'News Scraper', url: '/news-scraper', icon: Globe },
  { title: 'Analytics', url: '/analytics', icon: TrendingUp },
];

// Navigation items for police panel
const policeNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Police Stations', url: '/stations', icon: Shield },
  { title: 'Officer Management', url: '/officers', icon: Users },
  { title: 'Incident Reports', url: '/incidents', icon: FileText },
  { title: 'Panic Alerts', url: '/alerts', icon: AlertTriangle },
  { title: 'Analytics & Logs', url: '/analytics', icon: TrendingUp },
];

const touristNavItems = [
  { title: 'Home', url: '/home', icon: Home },
  { title: 'My Digital ID', url: '/my-id', icon: QrCode },
  { title: 'Trip Details', url: '/trip-details', icon: MapPin },
  { title: 'Daily Logs', url: '/daily-logs', icon: Calendar },
];

const sharedNavItems = [
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;
  
  const getNavItems = () => {
    if (!user) return [];
    
    if (user.role === 'admin') {
      return [...adminNavItems, ...sharedNavItems];
    } else if (user.role === 'police') {
      return [...policeNavItems, ...sharedNavItems];
    } else {
      return [...touristNavItems, ...sharedNavItems];
    }
  };

  const navItems = getNavItems();

  const getNavClassName = (isActive: boolean) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-xs font-medium text-sidebar-foreground/70">
              {user?.role === 'admin' ? 'Admin Panel' : 
               user?.role === 'police' ? 'Police Panel' : 'Tourist Portal'}
            </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) => getNavClassName(isActive)}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role Badge */}
        {!isCollapsed && (
          <div className="mt-auto p-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-sidebar-accent">
              <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                {AuthService.isAuthority(user) ? (
                  <Shield className="w-4 h-4 text-sidebar-primary-foreground" />
                ) : (
                  <User className="w-4 h-4 text-sidebar-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">
                  {user?.name}
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  {user?.department || `Tourist ID: ${user?.tripId}`}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}