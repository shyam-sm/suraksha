import { SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from './Navbar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/lib/auth';
import { Routes, Route, Navigate } from 'react-router-dom';

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import TouristManagement from '@/pages/admin/TouristManagement';
import Analytics from '@/pages/admin/Analytics';
import Reviews from '@/pages/admin/Reviews';

// Police Pages
import PoliceDashboard from '@/pages/admin/PoliceDashboard';
import PoliceStations from '@/pages/admin/PoliceStations';
import OfficerManagement from '@/pages/admin/OfficerManagement';
import IncidentReports from '@/pages/admin/IncidentReports';
import PanicAlerts from '@/pages/admin/PanicAlerts';
import AnalyticsLogs from '@/pages/admin/AnalyticsLogs';
import PoliceSettings from '@/pages/admin/PoliceSettings';
import TouristHome from '@/pages/tourist/Home';
import MyDigitalId from '@/pages/tourist/MyDigitalId';
import TripDetails from '@/pages/tourist/TripDetails';
import DailyLogs from '@/pages/tourist/DailyLogs';
import Settings from '@/pages/tourist/Settings';
import NotFound from '@/pages/NotFound';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/tourist-management" element={<TouristManagement />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function PoliceRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<PoliceDashboard />} />
      <Route path="/stations" element={<PoliceStations />} />
      <Route path="/officers" element={<OfficerManagement />} />
      <Route path="/incidents" element={<IncidentReports />} />
      <Route path="/alerts" element={<PanicAlerts />} />
      <Route path="/analytics" element={<AnalyticsLogs />} />
      <Route path="/settings" element={<PoliceSettings />} />
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
            {user?.role === 'admin' ? <AdminRoutes /> : 
             user?.role === 'police' ? <PoliceRoutes /> : <TouristRoutes />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}