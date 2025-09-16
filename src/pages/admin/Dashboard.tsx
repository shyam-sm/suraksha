import { motion } from 'framer-motion';
import { 
  Users, 
  Shield, 
  Activity,
  TrendingUp,
  Clock,
  Server,
  Database,
  Wifi,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Monitor,
  Globe,
  MapPin,
  FileText,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SystemMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  status: 'healthy' | 'warning' | 'critical';
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const systemMetrics: SystemMetric[] = [
  {
    title: 'System Uptime',
    value: '99.9%',
    change: '+0.1%',
    trend: 'up',
    icon: Server,
    color: 'text-success',
    status: 'healthy'
  },
  {
    title: 'Active Users',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-primary',
    status: 'healthy'
  },
  {
    title: 'Database Performance',
    value: '98.5%',
    change: '+2.1%',
    trend: 'up',
    icon: Database,
    color: 'text-success',
    status: 'healthy'
  },
  {
    title: 'Network Latency',
    value: '12ms',
    change: '-5ms',
    trend: 'up',
    icon: Wifi,
    color: 'text-success',
    status: 'healthy'
  }
];

const chartData: ChartData[] = [
  { name: 'Tourism Portal', value: 65, color: 'hsl(var(--primary))' },
  { name: 'ID Verification', value: 88, color: 'hsl(var(--success))' },
  { name: 'Safety Monitoring', value: 94, color: 'hsl(var(--warning))' },
  { name: 'Review System', value: 76, color: 'hsl(var(--secondary))' }
];

const systemReports = [
  {
    id: '1',
    title: 'Daily System Health Report',
    description: 'All systems operating normally',
    timestamp: '2 hours ago',
    status: 'healthy',
    icon: CheckCircle,
    details: 'CPU: 23%, Memory: 67%, Storage: 45%'
  },
  {
    id: '2', 
    title: 'Performance Analytics',
    description: 'System performance within optimal range',
    timestamp: '4 hours ago',
    status: 'healthy',
    icon: BarChart3,
    details: 'Response time: 120ms, Throughput: 1.2k/sec'
  },
  {
    id: '3',
    title: 'Database Backup Complete',
    description: 'Automated backup completed successfully',
    timestamp: '6 hours ago',
    status: 'healthy',
    icon: Database,
    details: 'Size: 2.3GB, Duration: 3min 45sec'
  },
  {
    id: '4',
    title: 'Security Scan',
    description: 'No vulnerabilities detected',
    timestamp: '8 hours ago',
    status: 'healthy',
    icon: Shield,
    details: 'Scanned: 15,432 files, Threats: 0'
  },
  {
    id: '5',
    title: 'Tourist Registration Spike',
    description: 'Higher than normal registration activity',
    timestamp: '1 hour ago',
    status: 'warning',
    icon: AlertTriangle,
    details: '+45% increase from yesterday'
  },
  {
    id: '6',
    title: 'Geolocation Services',
    description: 'All location services operational',
    timestamp: '3 hours ago',
    status: 'healthy',
    icon: MapPin,
    details: '99.8% accuracy rate maintained'
  }
];

const additionalMetrics = [
  {
    title: 'Total Tourists',
    value: '15,642',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'text-primary',
    status: 'healthy'
  },
  {
    title: 'Reviews Processed',
    value: '1,234',
    change: '+15%',
    trend: 'up',
    icon: FileText,
    color: 'text-secondary',
    status: 'healthy'
  },
  {
    title: 'Locations Monitored',
    value: '89',
    change: '+2',
    trend: 'up',
    icon: Globe,
    color: 'text-warning',
    status: 'healthy'
  },
  {
    title: 'Data Sync Rate',
    value: '99.7%',
    change: '+0.3%',
    trend: 'up',
    icon: RefreshCw,
    color: 'text-success',
    status: 'healthy'
  }
];

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-danger';
      default:
        return 'text-subtext';
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

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-elevated transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  <div className={`w-2 h-2 rounded-full ${
                    metric.status === 'healthy' ? 'bg-success' : 
                    metric.status === 'warning' ? 'bg-warning' : 'bg-danger'
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {additionalMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card className="hover:shadow-elevated transition-shadow bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Performance Chart */}
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
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    System Performance Overview
                  </CardTitle>
                  <CardDescription>
                    Real-time monitoring of all system functions
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  <Monitor className="w-3 h-3 mr-1" />
                  All Systems Operational
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {chartData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Performance Summary */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">98.2%</div>
                  <div className="text-sm text-muted-foreground">Overall Performance</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">System Availability</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Reports Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-primary" />
                System Reports
              </CardTitle>
              <CardDescription>Latest system health reports and analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {systemReports.map((report, index) => {
                const ReportIcon = report.icon;
                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`p-2 rounded-full ${
                          report.status === 'healthy' ? 'bg-success/10' : 
                          report.status === 'warning' ? 'bg-warning/10' : 'bg-danger/10'
                        }`}>
                          <ReportIcon className={`w-4 h-4 ${getStatusColor(report.status)}`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="text-sm font-medium">{report.title}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              report.status === 'healthy' ? 'bg-success/10 text-success border-success/20' : 
                              report.status === 'warning' ? 'bg-warning/10 text-warning border-warning/20' :
                              'bg-danger/10 text-danger border-danger/20'
                            }`}
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{report.description}</p>
                        {report.details && (
                          <p className="text-xs text-primary font-medium mb-1">{report.details}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{report.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <Button variant="outline" className="w-full mt-4">
                View All Reports
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
              <Monitor className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">System Monitoring</h3>
                <p className="text-sm opacity-90">Real-time system health tracking</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}