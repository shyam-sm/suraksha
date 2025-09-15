import { SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from './Navbar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/lib/auth';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import TouristHome from '@/pages/tourist/Home';
import MyDigitalId from '@/pages/tourist/MyDigitalId';
import TripDetails from '@/pages/tourist/TripDetails';
import DailyLogs from '@/pages/tourist/DailyLogs';
import Settings from '@/pages/tourist/Settings';
import NotFound from '@/pages/NotFound';

function AuthorityRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/tourists" element={<div className="p-8 text-center">Tourist Management - Coming Soon</div>} />
      <Route path="/alerts" element={<div className="p-8 text-center">Alerts & Incidents - Coming Soon</div>} />
      <Route path="/analytics" element={<div className="p-8 text-center">Analytics - Coming Soon</div>} />
      <Route path="/reports" element={<div className="p-8 text-center">Reports - Coming Soon</div>} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function TouristRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<TouristHome />} />
      <Route path="/my-id" element={<MyDigitalId />} />
      <Route path="/trip-details" element={<TripDetails />} />
      <Route path="/daily-logs" element={<DailyLogs />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function MainLayout() {
  const { user } = useAuth();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 bg-background">
            {AuthService.isAuthority(user) ? <AuthorityRoutes /> : <TouristRoutes />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}