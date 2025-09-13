import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  Shield, 
  MapPin,
  Activity,
  TrendingUp,
  Clock,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import dashboardMap from '@/assets/dashboard-map.png';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

interface Alert {
  id: string;
  type: 'emergency' | 'warning' | 'info';
  message: string;
  location: string;
  time: string;
  touristId?: string;
}

const statCards: StatCard[] = [
  {
    title: 'Active Tourists',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-primary'
  },
  {
    title: 'Alerts Today',
    value: '23',
    change: '-8%',
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-warning'
  },
  {
    title: 'Safety Score',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: Shield,
    color: 'text-success'
  },
  {
    title: 'High-Risk Zones',
    value: '4',
    change: '0',
    trend: 'up',
    icon: MapPin,
    color: 'text-danger'
  }
];

const recentAlerts: Alert[] = [
  {
    id: '1',
    type: 'emergency',
    message: 'Panic button activated',
    location: 'Red Fort, Delhi',
    time: '2 min ago',
    touristId: 'TRP-2024-001'
  },
  {
    id: '2',
    type: 'warning',
    message: 'Tourist in restricted area',
    location: 'Border Zone, Kashmir',
    time: '15 min ago',
    touristId: 'TRP-2024-089'
  },
  {
    id: '3',
    type: 'info',
    message: 'Large group detected',
    location: 'Gateway of India, Mumbai',
    time: '1 hour ago'
  },
  {
    id: '4',
    type: 'warning',
    message: 'Weather alert - Heavy rain',
    location: 'Munnar, Kerala',
    time: '2 hours ago'
  }
];

export default function AdminDashboard() {
  const [selectedView, setSelectedView] = useState<'tourists' | 'alerts' | 'routes'>('tourists');

  const getAlertBadgeVariant = (type: Alert['type']) => {
    switch (type) {
      case 'emergency':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'info':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'emergency':
        return Phone;
      case 'warning':
        return AlertTriangle;
      case 'info':
        return Activity;
      default:
        return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Authority Dashboard</h1>
          <p className="text-subtext">Real-time tourism safety monitoring and management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <Activity className="w-3 h-3 mr-1" />
            System Online
          </Badge>
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Last updated: {new Date().toLocaleTimeString()}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-elevated transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                  {stat.change} from last period
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Tourism Map</CardTitle>
                  <CardDescription>
                    Real-time tourist locations and safety zones
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  {(['tourists', 'alerts', 'routes'] as const).map((view) => (
                    <Button
                      key={view}
                      variant={selectedView === view ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedView(view)}
                      className="capitalize"
                    >
                      {view}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg overflow-hidden bg-muted h-96">
                <img 
                  src={dashboardMap} 
                  alt="Tourism Safety Map" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay indicators */}
                <div className="absolute inset-0 p-4">
                  <div className="flex space-x-4 mb-4">
                    <div className="flex items-center space-x-2 bg-background/90 rounded-lg px-3 py-1">
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                      <span className="text-xs">Safe Zones</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-background/90 rounded-lg px-3 py-1">
                      <div className="w-3 h-3 rounded-full bg-warning"></div>
                      <span className="text-xs">Caution Areas</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-background/90 rounded-lg px-3 py-1">
                      <div className="w-3 h-3 rounded-full bg-danger"></div>
                      <span className="text-xs">Restricted Zones</span>
                    </div>
                  </div>
                  
                  {/* Simulated location pins */}
                  <motion.div
                    className="absolute top-20 left-32 w-4 h-4 bg-primary rounded-full shadow-glow"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-40 right-28 w-4 h-4 bg-success rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-32 left-20 w-4 h-4 bg-danger rounded-full animate-pulse-danger"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Alerts Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                Live Alerts Feed
              </CardTitle>
              <CardDescription>Recent incidents and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert, index) => {
                const AlertIcon = getAlertIcon(alert.type);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'emergency' 
                        ? 'border-danger bg-danger/5' 
                        : alert.type === 'warning'
                        ? 'border-warning bg-warning/5'
                        : 'border-primary bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertIcon className="w-4 h-4" />
                          <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-subtext">
                          <span>{alert.location}</span>
                          <span>{alert.time}</span>
                        </div>
                        {alert.touristId && (
                          <p className="text-xs text-primary mt-1">ID: {alert.touristId}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <Button variant="outline" className="w-full mt-4">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-gradient-authority text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Tourist Management</h3>
                <p className="text-sm opacity-90">View and verify tourist IDs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-safety text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Analytics Dashboard</h3>
                <p className="text-sm opacity-90">View trends and insights</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-alert text-danger-foreground">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Emergency Response</h3>
                <p className="text-sm opacity-90">Manage critical incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}