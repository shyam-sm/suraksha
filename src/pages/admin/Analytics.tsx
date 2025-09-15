import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalendarIcon, Download, Save, Filter, TrendingUp, MapPin, AlertTriangle, Users, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function Analytics() {
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date());
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('incidents');

  // Sample KPI data
  const kpiData = [
    {
      title: 'Total Geofences',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: MapPin,
      color: 'text-emerald-600'
    },
    {
      title: 'Active Reports',
      value: '89',
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-amber-600'
    },
    {
      title: 'Tourist Reviews',
      value: '4,567',
      change: '+23%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Incidents',
      value: '156',
      change: '-8%',
      trend: 'down',
      icon: FileText,
      color: 'text-red-600'
    }
  ];

  // Sample chart data
  const incidentTrendData = [
    { month: 'Jan', incidents: 45, resolved: 42 },
    { month: 'Feb', incidents: 38, resolved: 35 },
    { month: 'Mar', incidents: 52, resolved: 48 },
    { month: 'Apr', incidents: 41, resolved: 39 },
    { month: 'May', incidents: 35, resolved: 34 },
    { month: 'Jun', incidents: 28, resolved: 27 }
  ];

  const regionData = [
    { region: 'Mumbai', reports: 45, tourists: 1200 },
    { region: 'Delhi', reports: 38, tourists: 980 },
    { region: 'Goa', reports: 22, tourists: 756 },
    { region: 'Kerala', reports: 18, tourists: 645 },
    { region: 'Rajasthan', reports: 35, tourists: 890 }
  ];

  // Sample recent items data
  const recentItems = [
    {
      id: 1,
      type: 'Report',
      title: 'Tourist assistance required in Connaught Place',
      location: 'Delhi',
      timestamp: '2 hours ago',
      status: 'Active',
      priority: 'High'
    },
    {
      id: 2,
      type: 'Review',
      title: 'Excellent safety measures at Gateway of India',
      location: 'Mumbai',
      timestamp: '4 hours ago',
      status: 'Published',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'Geofence',
      title: 'New safety zone created in Cyber City',
      location: 'Gurgaon',
      timestamp: '6 hours ago',
      status: 'Active',
      priority: 'Low'
    },
    {
      id: 4,
      type: 'Report',
      title: 'Lost tourist near Red Fort',
      location: 'Delhi',
      timestamp: '8 hours ago',
      status: 'Resolved',
      priority: 'Medium'
    },
    {
      id: 5,
      type: 'Review',
      title: 'Poor lighting in Marina Beach area',
      location: 'Chennai',
      timestamp: '1 day ago',
      status: 'Under Review',
      priority: 'High'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Resolved': return 'bg-blue-100 text-blue-800';
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Monitor key metrics and trends</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Template
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="goa">Goa</SelectItem>
              <SelectItem value="kerala">Kerala</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="incidents">Incidents</SelectItem>
              <SelectItem value="reviews">Reviews</SelectItem>
              <SelectItem value="tourists">Tourists</SelectItem>
              <SelectItem value="geofences">Geofences</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange ? format(dateRange, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                      <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className={`h-4 w-4 ${kpi.color}`} />
                        <span className={`text-sm font-medium ${kpi.color}`}>{kpi.change}</span>
                      </div>
                    </div>
                    <div className={`rounded-full p-3 ${kpi.color.replace('text-', 'bg-').replace('600', '100')}`}>
                      <IconComponent className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Incident Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Incident Trends (Last 6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={incidentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="incidents" stroke="#dc2626" strokeWidth={2} />
                    <Line type="monotone" dataKey="resolved" stroke="#059669" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regional Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Report Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reports" fill="#f59e0b" />
                    <Bar dataKey="tourists" fill="#1e3a8a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Items */}
          <div>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(item.priority)}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item.location}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}