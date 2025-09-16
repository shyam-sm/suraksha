import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter,
  AlertTriangle, 
  Clock, 
  User,
  MapPin,
  Eye,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface IncidentReport {
  id: string;
  type: 'theft' | 'assault' | 'vandalism' | 'disturbance' | 'medical' | 'accident';
  title: string;
  description: string;
  reportedBy: string;
  location: string;
  dateTime: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedOfficer?: string;
}

const mockIncidents: IncidentReport[] = [
  {
    id: 'INC001',
    type: 'theft',
    title: 'Tourist Bag Theft at Marina Bay',
    description: 'Tourist reported bag stolen while taking photos at Marina Bay Sands',
    reportedBy: 'Tourist ID: T001234',
    location: 'Marina Bay Sands, Singapore',
    dateTime: '2024-01-15 14:30',
    status: 'in-progress',
    priority: 'high',
    assignedOfficer: 'Sgt. John Smith'
  },
  {
    id: 'INC002',
    type: 'medical',
    title: 'Tourist Medical Emergency',
    description: 'Tourist collapsed at Sentosa Beach, requiring medical attention',
    reportedBy: 'Emergency Services',
    location: 'Sentosa Beach, Singapore',
    dateTime: '2024-01-15 16:45',
    status: 'resolved',
    priority: 'critical',
    assignedOfficer: 'Officer Jane Doe'
  },
  {
    id: 'INC003',
    type: 'disturbance',
    title: 'Noise Complaint at Clarke Quay',
    description: 'Multiple noise complaints from nearby hotel guests',
    reportedBy: 'Hotel Management',
    location: 'Clarke Quay, Singapore',
    dateTime: '2024-01-15 23:15',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'INC004',
    type: 'assault',
    title: 'Verbal Altercation at Orchard Road',
    description: 'Dispute between street vendor and tourist escalated',
    reportedBy: 'Witness Report',
    location: 'Orchard Road, Singapore',
    dateTime: '2024-01-14 19:20',
    status: 'escalated',
    priority: 'high',
    assignedOfficer: 'Inspector Mike Chen'
  }
];

export default function IncidentReports() {
  const [incidents, setIncidents] = useState<IncidentReport[]>(mockIncidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesType = typeFilter === 'all' || incident.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || incident.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'escalated':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theft':
        return '🎒';
      case 'assault':
        return '⚡';
      case 'vandalism':
        return '🔨';
      case 'disturbance':
        return '📢';
      case 'medical':
        return '🏥';
      case 'accident':
        return '🚗';
      default:
        return '📋';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'in-progress':
        return AlertCircle;
      case 'resolved':
        return CheckCircle;
      case 'escalated':
        return XCircle;
      default:
        return Clock;
    }
  };

  const assignOfficer = (incidentId: string) => {
    // Logic to assign officer
    console.log('Assigning officer to incident:', incidentId);
  };

  const escalateIncident = (incidentId: string) => {
    setIncidents(incidents.map(incident => 
      incident.id === incidentId 
        ? { ...incident, status: 'escalated', priority: 'critical' }
        : incident
    ));
  };

  const closeIncident = (incidentId: string) => {
    setIncidents(incidents.map(incident => 
      incident.id === incidentId 
        ? { ...incident, status: 'resolved' }
        : incident
    ));
  };

  const pendingCount = incidents.filter(i => i.status === 'pending').length;
  const inProgressCount = incidents.filter(i => i.status === 'in-progress').length;
  const resolvedCount = incidents.filter(i => i.status === 'resolved').length;
  const escalatedCount = incidents.filter(i => i.status === 'escalated').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Incident Reports</h1>
          <p className="text-muted-foreground">Track and manage incident reports and investigations</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{escalatedCount}</p>
                <p className="text-sm text-muted-foreground">Escalated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
          <CardDescription>View and manage all incident reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="assault">Assault</SelectItem>
                <SelectItem value="vandalism">Vandalism</SelectItem>
                <SelectItem value="disturbance">Disturbance</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="accident">Accident</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned Officer</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident, index) => {
                  const StatusIcon = getStatusIcon(incident.status);
                  return (
                    <motion.tr
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">{getTypeIcon(incident.type)}</span>
                          <div>
                            <p className="font-medium">{incident.title}</p>
                            <p className="text-sm text-muted-foreground">{incident.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{incident.reportedBy}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{incident.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{incident.dateTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(incident.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(incident.priority)}>
                          {incident.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {incident.assignedOfficer ? (
                          <span className="text-sm">{incident.assignedOfficer}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Incident Details - {incident.id}</DialogTitle>
                                <DialogDescription>Full incident report and details</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold">Description</h4>
                                  <p className="text-sm text-muted-foreground">{incident.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold">Type</h4>
                                    <p className="text-sm">{incident.type}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">Priority</h4>
                                    <Badge variant="outline" className={getPriorityColor(incident.priority)}>
                                      {incident.priority}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          {incident.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => assignOfficer(incident.id)}
                            >
                              <UserCheck className="w-4 h-4" />
                            </Button>
                          )}
                          
                          {incident.status !== 'escalated' && incident.status !== 'resolved' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => escalateIncident(incident.id)}
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </Button>
                          )}
                          
                          {incident.status !== 'resolved' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => closeIncident(incident.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}