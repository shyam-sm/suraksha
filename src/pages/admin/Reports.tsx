import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  User, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Phone,
  Shield,
  Eye,
  Download,
  MessageSquare,
  Paperclip
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DevPanel from '@/components/admin/DevPanel';

interface Report {
  id: string;
  type: 'emergency' | 'incident' | 'medical' | 'theft' | 'lost';
  touristId?: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  timestamp: string;
  assignedUnit?: string;
  description: string;
  evidence: string[];
}

const mockReports: Report[] = [
  {
    id: 'RPT-2024-001',
    type: 'emergency',
    touristId: 'TRP-2024-001',
    location: 'Red Fort, Delhi',
    severity: 'critical',
    status: 'in-progress',
    timestamp: '2024-01-16 14:30:00',
    assignedUnit: 'Unit-Delhi-03',
    description: 'Tourist panic button activated, no response to calls',
    evidence: ['audio_recording.mp3', 'last_known_location.json']
  },
  {
    id: 'RPT-2024-002',
    type: 'theft',
    touristId: 'TRP-2024-045',
    location: 'Gateway of India, Mumbai',
    severity: 'medium',
    status: 'open',
    timestamp: '2024-01-16 12:15:00',
    description: 'Tourist reports bag stolen with passport and money',
    evidence: ['incident_photo_1.jpg', 'witness_statement.pdf']
  },
  {
    id: 'RPT-2024-003',
    type: 'medical',
    location: 'Mysore Palace, Karnataka',
    severity: 'high',
    status: 'resolved',
    timestamp: '2024-01-16 09:45:00',
    assignedUnit: 'Ambulance-KAR-02',
    description: 'Tourist collapsed, heat exhaustion suspected',
    evidence: ['medical_report.pdf']
  }
];

export default function Reports() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return Phone;
      case 'incident': return AlertTriangle;
      case 'medical': return Shield;
      case 'theft': return User;
      case 'lost': return MapPin;
      default: return FileText;
    }
  };

  const filteredReports = mockReports.filter(report => {
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'all' || report.severity === selectedSeverity;
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const sampleResponse = `{
  "reports": [
    {
      "id": "RPT-2024-001",
      "type": "emergency",
      "touristId": "TRP-2024-001",
      "location": "Red Fort, Delhi",
      "severity": "critical",
      "status": "in-progress",
      "timestamp": "2024-01-16T14:30:00Z",
      "assignedUnit": "Unit-Delhi-03",
      "description": "Tourist panic button activated",
      "evidence": ["audio_recording.mp3", "last_known_location.json"]
    }
  ],
  "total": 156,
  "page": 1
}`;

  const actionPayload = `{
  "action": "assign",
  "unit": "Station-3",
  "notes": "Dispatching unit immediately",
  "priority": "high",
  "estimatedResponse": "15 minutes"
}`;

  return (
    <div className="space-y-6">
      <DevPanel
        title="Reports & Incidents"
        defaultEndpoint="/api/reports"
        defaultMethod="GET"
        sampleResponse={sampleResponse}
        todos={[
          "Implement POST /api/reports/{id}/actions for workflow",
          "Add SMS & push notification integration",
          "Connect to E-FIR generation system",
          "Set up evidence chain-of-custody tracking",
          "Add webhook endpoints for unit dispatch"
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Reports & Incidents</h1>
          <p className="text-subtext">Incident reporting and action workflow management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {filteredReports.filter(r => r.severity === 'critical').length} Critical
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            {filteredReports.filter(r => r.status === 'open').length} Open
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Incident Reports ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Tourist ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Unit</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report, index) => {
                const TypeIcon = getTypeIcon(report.type);
                return (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <TableCell className="font-mono text-sm">{report.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-4 h-4" />
                        <span className="capitalize">{report.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {report.touristId || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{report.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSeverityColor(report.severity)}>
                        {report.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.assignedUnit || 'Unassigned'}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(report.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Report Detail Modal */}
      {selectedReport && (
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                Report Details - {selectedReport.id}
                <Badge variant="outline" className={`ml-2 ${getSeverityColor(selectedReport.severity)}`}>
                  {selectedReport.severity}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Report Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Incident Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">Type</Label>
                      <p className="font-medium capitalize">{selectedReport.type}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Location</Label>
                      <p className="font-medium">{selectedReport.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Timestamp</Label>
                      <p className="font-medium">{new Date(selectedReport.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Description</Label>
                      <p className="text-sm">{selectedReport.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Response Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">Status</Label>
                      <Badge variant="outline" className={getStatusColor(selectedReport.status)}>
                        {selectedReport.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Assigned Unit</Label>
                      <p className="font-medium">{selectedReport.assignedUnit || 'Unassigned'}</p>
                    </div>
                    {selectedReport.touristId && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Tourist ID</Label>
                        <p className="font-medium font-mono">{selectedReport.touristId}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Evidence */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Evidence & Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedReport.evidence.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-sm">{item}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Assign Unit
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Notify Family
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate E-FIR
                  </Button>
                </div>
                <Button>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>

              {/* API Integration Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-blue-900">Action API Integration:</h4>
                <pre className="text-sm bg-blue-100 p-3 rounded overflow-x-auto">
{`POST /api/reports/{id}/action
${actionPayload}

// TODO: Add SMS & push notification integration
// TODO: Connect to E-FIR generation system
// TODO: Implement webhook for unit dispatch`}
                </pre>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}