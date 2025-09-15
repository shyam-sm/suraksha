import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, AlertTriangle, Phone, FileText, Clock, MapPin, User } from 'lucide-react';

interface IncidentReport {
  id: string;
  state: string;
  district: string;
  incidentType: 'theft' | 'medical' | 'accident' | 'harassment' | 'lost' | 'fraud' | 'emergency';
  date: string;
  time: string;
  details: string;
  reportedBy: string;
  touristId?: string;
  location: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const mockReports: IncidentReport[] = [
  {
    id: 'INC-001',
    state: 'Assam',
    district: 'Guwahati',
    incidentType: 'theft',
    date: '2024-01-15',
    time: '14:30',
    details: 'Tourist reported theft of passport and wallet near Kamakhya Temple. Local authorities notified.',
    reportedBy: 'Tourist Services',
    touristId: 'TID-001',
    location: 'Kamakhya Temple Area',
    status: 'investigating',
    priority: 'high'
  },
  {
    id: 'INC-002',
    state: 'Kerala',
    district: 'Kochi',
    incidentType: 'medical',
    date: '2024-01-14',
    time: '18:45',
    details: 'Tourist experienced food poisoning after dining at local restaurant. Taken to nearby hospital.',
    reportedBy: 'Emergency Services',
    touristId: 'TID-002',
    location: 'Fort Kochi',
    status: 'resolved',
    priority: 'medium'
  },
  {
    id: 'INC-003',
    state: 'Rajasthan',
    district: 'Jaipur',
    incidentType: 'harassment',
    date: '2024-01-13',
    time: '20:15',
    details: 'Female tourist reported harassment by local vendors in Hawa Mahal area. Police complaint filed.',
    reportedBy: 'Tourist Police',
    touristId: 'TID-003',
    location: 'Hawa Mahal',
    status: 'open',
    priority: 'high'
  },
  {
    id: 'INC-004',
    state: 'Goa',
    district: 'North Goa',
    incidentType: 'accident',
    date: '2024-01-12',
    time: '16:30',
    details: 'Tourist injured in water sports accident at Baga Beach. Hospitalized with minor injuries.',
    reportedBy: 'Beach Safety',
    touristId: 'TID-004',
    location: 'Baga Beach',
    status: 'closed',
    priority: 'medium'
  },
  {
    id: 'INC-005',
    state: 'Tamil Nadu',
    district: 'Chennai',
    incidentType: 'lost',
    date: '2024-01-11',
    time: '12:20',
    details: 'Tourist lost contact with tour group at Marina Beach. Found safe after 2 hours.',
    reportedBy: 'Tour Guide',
    touristId: 'TID-005',
    location: 'Marina Beach',
    status: 'resolved',
    priority: 'low'
  }
];

export default function Reports() {
  const [reports] = useState<IncidentReport[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);
  const [showPanicAlert, setShowPanicAlert] = useState(false);

  // Simulate panic button trigger
  useState(() => {
    const timer = setTimeout(() => {
      setShowPanicAlert(true);
    }, 3000); // Show panic alert after 3 seconds for demo
    return () => clearTimeout(timer);
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = filterState === 'all' || report.state === filterState;
    const matchesType = filterType === 'all' || report.incidentType === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;

    return matchesSearch && matchesState && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-blue-100 text-blue-800',
      investigating: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || variants.open;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      theft: 'bg-red-100 text-red-800',
      medical: 'bg-blue-100 text-blue-800',
      accident: 'bg-orange-100 text-orange-800',
      harassment: 'bg-purple-100 text-purple-800',
      lost: 'bg-yellow-100 text-yellow-800',
      fraud: 'bg-pink-100 text-pink-800',
      emergency: 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || colors.emergency;
  };

  const uniqueStates = [...new Set(reports.map(r => r.state))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Incident Reports</h1>
          <p className="text-subtext">Monitor and manage tourist safety incidents</p>
        </div>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heading">{reports.length}</div>
            <p className="text-xs text-subtext">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Open Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {reports.filter(r => r.status === 'open').length}
            </div>
            <p className="text-xs text-subtext">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Investigating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {reports.filter(r => r.status === 'investigating').length}
            </div>
            <p className="text-xs text-subtext">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {reports.filter(r => r.status === 'resolved').length}
            </div>
            <p className="text-xs text-subtext">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Critical Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">
              {reports.filter(r => r.priority === 'critical').length}
            </div>
            <p className="text-xs text-subtext">Urgent cases</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Incident Database
          </CardTitle>
          <CardDescription>
            Track and manage all reported incidents by state and type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label>State</Label>
              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {uniqueStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="theft">Theft</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="fraud">Fraud</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedReport(report)}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.state}, {report.district}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(report.incidentType)}>
                        {report.incidentType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {report.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {report.date} {report.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadge(report.priority)}>
                        {report.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No incidents found matching your criteria.
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Showing {filteredReports.length} of {reports.length} incidents
          </div>
        </CardContent>
      </Card>

      {/* Incident Details Modal */}
      <Dialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Incident Details - {selectedReport?.id}</DialogTitle>
            <DialogDescription>
              Comprehensive information about the reported incident
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-muted-foreground">{selectedReport.state}, {selectedReport.district}</p>
                  <p className="text-sm text-muted-foreground">{selectedReport.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date & Time</Label>
                  <p className="text-sm text-muted-foreground">{selectedReport.date} at {selectedReport.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <Badge className={getTypeColor(selectedReport.incidentType)}>
                    {selectedReport.incidentType}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <Badge className={getPriorityBadge(selectedReport.priority)}>
                    {selectedReport.priority}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getStatusBadge(selectedReport.status)}>
                    {selectedReport.status}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Details</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedReport.details}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Reported By</Label>
                  <p className="text-sm text-muted-foreground">{selectedReport.reportedBy}</p>
                </div>
                {selectedReport.touristId && (
                  <div>
                    <Label className="text-sm font-medium">Tourist ID</Label>
                    <p className="text-sm text-muted-foreground">{selectedReport.touristId}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button>Update Status</Button>
                <Button variant="outline">Assign Officer</Button>
                <Button variant="outline">Add Note</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Panic Alert Modal */}
      <Dialog open={showPanicAlert} onOpenChange={setShowPanicAlert}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-danger flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              PANIC ALERT!
            </DialogTitle>
          </DialogHeader>
          
          <Alert className="border-danger bg-danger/10">
            <AlertTriangle className="h-4 w-4 text-danger" />
            <AlertDescription className="text-danger font-medium">
              Emergency panic button pressed by Tourist ID: TID-006
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Sarah Williams (UK Citizen)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Last known location: Old Delhi Market, Delhi</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Alert triggered: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1 bg-danger hover:bg-danger/90">
              <Phone className="h-4 w-4 mr-2" />
              Call Tourist
            </Button>
            <Button variant="outline" className="flex-1">
              Dispatch Unit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}