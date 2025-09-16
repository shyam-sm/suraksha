import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  FileText,
  TrendingUp,
  Activity,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface StatsCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

interface Alert {
  id: string;
  touristId: string;
  location: string;
  time: string;
  type: 'panic' | 'emergency' | 'incident';
  status: 'active' | 'responding' | 'resolved';
}

const statsCards: StatsCard[] = [
  {
    title: 'Active Incidents',
    value: '7',
    change: '+2',
    trend: 'up',
    icon: AlertTriangle,
    color: 'text-red-500'
  },
  {
    title: 'Panic Alerts Today',
    value: '3',
    change: '+1',
    trend: 'up',
    icon: Phone,
    color: 'text-orange-500'
  },
  {
    title: 'Avg Response Time',
    value: '4.2 min',
    change: '-0.8 min',
    trend: 'down',
    icon: Clock,
    color: 'text-green-500'
  },
  {
    title: 'Officers on Duty',
    value: '24',
    change: '+4',
    trend: 'up',
    icon: Users,
    color: 'text-blue-500'
  }
];

const recentAlerts: Alert[] = [
  {
    id: '1',
    touristId: 'T001245',
    location: 'Marina Bay, Singapore',
    time: '2 min ago',
    type: 'panic',
    status: 'active'
  },
  {
    id: '2',
    touristId: 'T001321',
    location: 'Sentosa Island',
    time: '15 min ago',
    type: 'emergency',
    status: 'responding'
  },
  {
    id: '3',
    touristId: 'T001098',
    location: 'Orchard Road',
    time: '32 min ago',
    type: 'incident',
    status: 'resolved'
  }
];

export default function PoliceDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'responding':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'panic':
        return AlertTriangle;
      case 'emergency':
        return Phone;
      case 'incident':
        return FileText;
      default:
        return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Police Command Center</h1>
          <p className="text-muted-foreground">Real-time monitoring and incident management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
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
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' && stat.title.includes('Response') ? 'text-red-500' : stat.trend === 'down' && stat.title.includes('Response') ? 'text-green-500' : stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from yesterday
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
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Live Incident & Alert Map
              </CardTitle>
              <CardDescription>
                Real-time visualization of incidents and panic alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Map Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Active Alerts (3)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs mt-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>In Progress (4)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Resolved (12)</span>
                    </div>
                  </div>
                  
                  {/* Sample markers */}
                  <div className="absolute top-24 left-32 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute top-48 right-24 w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute bottom-32 left-24 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                </div>
                <div className="text-center z-10">
                  <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Interactive Map Integration</p>
                  <p className="text-sm text-slate-500">Live incident tracking and geofencing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Alert Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-red-500" />
                Live Alert Feed
              </CardTitle>
              <CardDescription>Latest panic alerts and incident reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert, index) => {
                const TypeIcon = getTypeIcon(alert.type);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <TypeIcon className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">Tourist ID: {alert.touristId}</p>
                          <Badge variant="outline" className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {alert.location}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        {alert.status === 'active' && (
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="default" className="text-xs">
                              Dispatch
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs">
                              Contact
                            </Button>
                          </div>
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
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Station Management</h3>
                <p className="text-sm opacity-90">Manage police stations and coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Officer Management</h3>
                <p className="text-sm opacity-90">Track duty status and assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Analytics Dashboard</h3>
                <p className="text-sm opacity-90">Performance metrics and insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}