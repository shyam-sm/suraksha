import { useState } from 'react';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
// import { NavLink, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import appLogo from '@/assets/app-logo.png';

const roleDisplayMap: Record<string, string> = {
  admin: 'Administrator',
  police: 'Police Officer',
  tourism: 'Tourism Officer',
  tourist: 'Tourist',
};

const roleBadgeMap: Record<string, 'default' | 'secondary' | 'outline'> = {
  admin: 'default',
  police: 'default',
  tourism: 'secondary',
  tourist: 'outline',
};

const roleRoutes: Record<string, { home: string; settings: string }> = {
  admin: {
    home: '/dashboard',         // ✅ matches AdminRoutes
    settings: '/settings',      // ✅ matches AdminRoutes
  },
  police: {
    home: '/dashboard',         // ✅ matches PoliceRoutes
    settings: '/settings',      // ✅ matches PoliceRoutes
  },
  tourist: {
    home: '/home',              // ✅ matches TouristRoutes
    settings: '/settings',      // ✅ matches TouristRoutes
  },
};


export function Navbar() {
  const { user, logout } = useAuth();
  const [notifications] = useState(3);
  const navigate = useNavigate();

  const role = user?.role || 'tourist';
  const displayName = roleDisplayMap[role] || role;
  const badgeVariant = roleBadgeMap[role] || 'outline';
  const homeRoute = roleRoutes[role]?.home || '/';
  const settingsRoute = roleRoutes[role]?.settings || '/settings';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="lg:hidden" />
          <div className="flex items-center space-x-3">
            <img src={appLogo} alt="Tourism Safety" className="w-8 h-8" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-heading">Tourism Safety Portal</h1>
              <p className="text-xs text-subtext">Government of India</p>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-authority flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  <Badge variant={badgeVariant} className="w-fit mt-1">
                    {displayName}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => navigate(homeRoute)}>
                <User className="mr-2 h-4 w-4" />
                <span>Home</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate(settingsRoute)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
