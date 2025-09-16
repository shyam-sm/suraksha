import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  MapPin,
  Users,
  Shield,
  AlertTriangle,
  Activity,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AnalyticsData {
  period: string;
  incidents: number;
  responseTime: number;
  resolved: number;
  officerActivity: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  officer: string;
  details: string;
  type: 'incident' | 'alert' | 'system' | 'officer';
}

interface HeatmapData {
  area: string;
  incidents: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  coordinates: string;
}

const analyticsData: AnalyticsData[] = [
  { period: 'Jan', incidents: 45, responseTime: 4.2, resolved: 42, officerActivity: 89 },
  { period: 'Feb', incidents: 52, responseTime: 3.8, resolved: 49, officerActivity: 92 },
  { period: 'Mar', incidents: 38, responseTime: 4.1, resolved: 36, officerActivity: 87 },
  { period: 'Apr', incidents: 41, responseTime: 3.9, resolved: 39, officerActivity: 90 },
  { period: 'May', incidents: 48, responseTime: 4.0, resolved: 45, officerActivity: 88 },
  { period: 'Jun', incidents: 35, responseTime: 3.7, resolved: 34, officerActivity: 91 }
];

const recentLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15 18:45:23',
    action: 'Incident Report Created',
    officer: 'Sgt. John Smith',
    details: 'Tourist bag theft at Marina Bay - INC001',
    type: 'incident'
  },
  {
    id: '2',
    timestamp: '2024-01-15 18:40:12',
    action: 'Panic Alert Received',
    officer: 'System',
    details: 'Emergency alert from Tourist T001234',
    type: 'alert'
  },
  {
    id: '3',
    timestamp: '2024-01-15 18:35:45',
    action: 'Officer Status Changed',
    officer: 'Officer Jane Doe',
    details: 'Status changed from Off-Duty to On-Duty',
    type: 'officer'
  },
  {
    id: '4',
    timestamp: '2024-01-15 18:30:18',
    action: 'Response Team Dispatched',
    officer: 'Inspector Mike Chen',
    details: 'Team Alpha dispatched to Sentosa Beach',
    type: 'incident'
  },
  {
    id: '5',
    timestamp: '2024-01-15 18:25:33',
    action: 'System Backup Completed',
    officer: 'System',
    details: 'Daily backup completed successfully',
    type: 'system'
  }
];

const heatmapData: HeatmapData[] = [
  {
    area: 'Marina Bay',
    incidents: 23,
    riskLevel: 'high',
    coordinates: '1.2830, 103.8607'
  },
  {
    area: 'Orchard Road',
    incidents: 18,
    riskLevel: 'medium',
    coordinates: '1.3048, 103.8318'
  },
  {
    area: 'Clarke Quay',
    incidents: 31,
    riskLevel: 'critical',
    coordinates: '1.2884, 103.8465'
  },
  {
    area: 'Sentosa Island',
    incidents: 12,
    riskLevel: 'medium',
    coordinates: '1.2494, 103.8303'
  },
  {
    area: 'Chinatown',
    incidents: 8,
    riskLevel: 'low',
    coordinates: '1.2813, 103.8434'
  },
  {
    area: 'Little India',
    incidents: 15,
    riskLevel: 'medium',
    coordinates: '1.3063, 103.8518'
  }
];

export default function AnalyticsLogs() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [logFilter, setLogFilter] = useState('all');

  const filteredLogs = recentLogs.filter(log => 
    logFilter === 'all' || log.type === logFilter
  );

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'incident':
        return AlertTriangle;
      case 'alert':
        return Shield;
      case 'officer':
        return Users;
      case 'system':
        return Activity;
      default:
        return Activity;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'incident':
        return 'text-red-500';
      case 'alert':
        return 'text-orange-500';
      case 'officer':
        return 'text-blue-500';
      case 'system':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalIncidents = analyticsData.reduce((sum, data) => sum + data.incidents, 0);
  const avgResponseTime = (analyticsData.reduce((sum, data) => sum + data.responseTime, 0) / analyticsData.length).toFixed(1);
  const totalResolved = analyticsData.reduce((sum, data) => sum + data.resolved, 0);
  const resolutionRate = ((totalResolved / totalIncidents) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Logs</h1>
          <p className="text-muted-foreground">Performance metrics, crime analysis, and system logs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{totalIncidents}</p>
                <p className="text-sm text-muted-foreground">Total Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{avgResponseTime}m</p>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{resolutionRate}%</p>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">89%</p>
                <p className="text-sm text-muted-foreground">Officer Efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">Performance Charts</TabsTrigger>
          <TabsTrigger value="heatmap">Crime Heatmap</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Incident Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Incident Trends
                </CardTitle>
                <CardDescription>Monthly incident reports and resolution rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 p-4">
                    {analyticsData.map((data, index) => (
                      <motion.div
                        key={data.period}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-end justify-between mb-4"
                      >
                        <div className="flex-1 mr-4">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>{data.period}</span>
                            <span className="font-medium">{data.incidents}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-blue-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(data.incidents / 60) * 100}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Response Time Analysis
                </CardTitle>
                <CardDescription>Average response times by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 p-4">
                    {analyticsData.map((data, index) => (
                      <motion.div
                        key={data.period}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between mb-4"
                      >
                        <span className="text-sm font-medium w-12">{data.period}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <motion.div
                              className="bg-green-500 h-3 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(data.responseTime / 5) * 100}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12">{data.responseTime}m</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Officer Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Officer Activity & Performance
              </CardTitle>
              <CardDescription>Monthly officer performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {analyticsData.map((data, index) => (
                  <motion.div
                    key={data.period}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-blue-600">{data.officerActivity}%</div>
                    <div className="text-sm text-muted-foreground">{data.period}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Crime-Prone Areas Heatmap
              </CardTitle>
              <CardDescription>Incident concentration by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heatmapData.map((area, index) => (
                  <motion.div
                    key={area.area}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{area.area}</h3>
                      <Badge variant="outline" className={getRiskColor(area.riskLevel)}>
                        {area.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{area.incidents} incidents</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{area.coordinates}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            area.riskLevel === 'critical' ? 'bg-red-500' :
                            area.riskLevel === 'high' ? 'bg-orange-500' :
                            area.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(area.incidents / 35) * 100}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    System Activity Logs
                  </CardTitle>
                  <CardDescription>Real-time system and officer activity tracking</CardDescription>
                </div>
                <Select value={logFilter} onValueChange={setLogFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Logs</SelectItem>
                    <SelectItem value="incident">Incidents</SelectItem>
                    <SelectItem value="alert">Alerts</SelectItem>
                    <SelectItem value="officer">Officers</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLogs.map((log, index) => {
                  const LogIcon = getLogIcon(log.type);
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <LogIcon className={`w-4 h-4 ${getLogColor(log.type)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{log.action}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {log.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">Officer: {log.officer}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline">
                  Load More Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}