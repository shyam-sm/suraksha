import { SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from './Navbar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/lib/auth';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import Map from '@/pages/admin/Map';
import Reviews from '@/pages/admin/Reviews';
import Reports from '@/pages/admin/Reports';
import Broadcast from '@/pages/admin/Broadcast';
import TouristManagement from '@/pages/admin/TouristManagement';
import Analytics from '@/pages/admin/Analytics';
import NewsScraper from '@/pages/admin/NewsScraper';
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
      <Route path="/map" element={<Map />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/broadcast" element={<Broadcast />} />
      <Route path="/tourists" element={<TouristManagement />} />
      <Route path="/alerts" element={<div className="p-8 text-center">Alerts & Incidents - Coming Soon</div>} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/news-scraper" element={<NewsScraper />} />
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