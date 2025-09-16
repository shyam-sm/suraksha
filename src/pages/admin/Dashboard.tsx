import { motion } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  Shield, 
  TrendingUp,
  Activity,
  Calendar,
  MapPin,
  FileText,
  Radio
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
    title: 'Total Tourists',
    value: '12,847',
    change: '+15%',
    trend: 'up',
    icon: Users,
    color: 'text-primary'
  },
  {
    title: 'Geofences Active',
    value: '247',
    change: '+5%',
    trend: 'up',
    icon: MapPin,
    color: 'text-success'
  },
  {
    title: 'Reviews Processed',
    value: '1,432',
    change: '+23%',
    trend: 'up',
    icon: FileText,
    color: 'text-warning'
  },
  {
    title: 'Broadcasts Sent',
    value: '89',
    change: '+8%',
    trend: 'up',
    icon: Radio,
    color: 'text-accent'
  },
  {
    title: 'System Health',
    value: '99.2%',
    change: '+0.5%',
    trend: 'up',
    icon: Activity,
    color: 'text-success'
  },
  {
    title: 'Response Time',
    value: '1.2s',
    change: '-15%',
    trend: 'down',
    icon: TrendingUp,
    color: 'text-success'
  }
];

const chartData = [
  { name: 'Mon', tourists: 180, alerts: 12, reviews: 45 },
  { name: 'Tue', tourists: 220, alerts: 8, reviews: 52 },
  { name: 'Wed', tourists: 350, alerts: 15, reviews: 67 },
  { name: 'Thu', tourists: 280, alerts: 6, reviews: 48 },
  { name: 'Fri', tourists: 450, alerts: 18, reviews: 89 },
  { name: 'Sat', tourists: 520, alerts: 22, reviews: 112 },
  { name: 'Sun', tourists: 390, alerts: 14, reviews: 78 }
];

const performanceData = [
  { name: 'Tourists', value: 85, color: 'hsl(var(--primary))' },
  { name: 'Reviews', value: 92, color: 'hsl(var(--success))' },
  { name: 'Geofences', value: 88, color: 'hsl(var(--warning))' },
  { name: 'Broadcasts', value: 95, color: 'hsl(var(--accent))' }
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--accent))'];

const recentActivities = [
  { id: 1, type: 'tourist', action: 'New tourist registration', time: '2 min ago', status: 'success' },
  { id: 2, type: 'geofence', action: 'Geofence "Safe Zone Delhi" updated', time: '5 min ago', status: 'info' },
  { id: 3, type: 'review', action: '3 new reviews pending approval', time: '8 min ago', status: 'warning' },
  { id: 4, type: 'broadcast', action: 'Emergency alert sent to 500 tourists', time: '12 min ago', status: 'error' },
  { id: 5, type: 'system', action: 'Daily backup completed', time: '1 hour ago', status: 'success' }
];

export default function AdminDashboard() {

  const getStatusColor = (status: string) => {
    const colors = {
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-danger',
      info: 'text-primary'
    };
    return colors[status as keyof typeof colors] || colors.info;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">System Overview Dashboard</h1>
          <p className="text-subtext">Complete monitoring and management of all system functions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <Activity className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last sync: {new Date().toLocaleTimeString()}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tourist Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Overview</CardTitle>
              <CardDescription>Tourist activity, alerts, and reviews trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="tourists" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="reviews" stroke="hsl(var(--success))" strokeWidth={2} />
                    <Line type="monotone" dataKey="alerts" stroke="hsl(var(--warning))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>All functions working optimally</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent System Activities
            </CardTitle>
            <CardDescription>Latest actions across all modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
                    <span className="text-sm font-medium">{activity.action}</span>
                  </div>
                  <span className="text-xs text-subtext">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

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