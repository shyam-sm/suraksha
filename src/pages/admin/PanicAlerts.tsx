import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock,
  User,
  FileAudio,
  Camera,
  Send,
  UserCheck,
  CheckCircle,
  Volume2,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PanicAlert {
  id: string;
  touristId: string;
  touristName: string;
  lastKnownLocation: string;
  coordinates: string;
  timestamp: string;
  tripDetails: {
    hotel: string;
    checkIn: string;
    checkOut: string;
    groupSize: number;
  };
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
  attachedFiles: {
    type: 'audio' | 'photo' | 'video';
    filename: string;
    timestamp: string;
  }[];
  status: 'active' | 'responding' | 'resolved';
  priority: 'high' | 'critical';
  responseTeam?: string;
}

const mockAlerts: PanicAlert[] = [
  {
    id: 'PA001',
    touristId: 'T001234',
    touristName: 'John Anderson',
    lastKnownLocation: 'Marina Bay Sands, Level 57 Observation Deck',
    coordinates: '1.2830, 103.8607',
    timestamp: '2024-01-15 18:45:23',
    tripDetails: {
      hotel: 'Marina Bay Sands Hotel',
      checkIn: '2024-01-14',
      checkOut: '2024-01-18',
      groupSize: 2
    },
    emergencyContacts: [
      {
        name: 'Sarah Anderson',
        relationship: 'Spouse',
        phone: '+1 555-0123'
      },
      {
        name: 'Mike Anderson',
        relationship: 'Brother',
        phone: '+1 555-0124'
      }
    ],
    attachedFiles: [
      {
        type: 'audio',
        filename: 'panic_audio_001.mp3',
        timestamp: '2024-01-15 18:45:23'
      },
      {
        type: 'photo',
        filename: 'location_photo_001.jpg',
        timestamp: '2024-01-15 18:45:25'
      }
    ],
    status: 'active',
    priority: 'critical'
  },
  {
    id: 'PA002',
    touristId: 'T001567',
    touristName: 'Emma Chen',
    lastKnownLocation: 'Sentosa Beach Walk, Section C',
    coordinates: '1.2494, 103.8303',
    timestamp: '2024-01-15 20:12:45',
    tripDetails: {
      hotel: 'Resorts World Sentosa',
      checkIn: '2024-01-15',
      checkOut: '2024-01-20',
      groupSize: 4
    },
    emergencyContacts: [
      {
        name: 'David Chen',
        relationship: 'Father',
        phone: '+86 138-0013-8000'
      }
    ],
    attachedFiles: [
      {
        type: 'audio',
        filename: 'emergency_call_002.mp3',
        timestamp: '2024-01-15 20:12:45'
      }
    ],
    status: 'responding',
    priority: 'high',
    responseTeam: 'Team Alpha - Sentosa Unit'
  },
  {
    id: 'PA003',
    touristId: 'T001890',
    touristName: 'Robert Smith',
    lastKnownLocation: 'Clarke Quay Central',
    coordinates: '1.2884, 103.8465',
    timestamp: '2024-01-15 22:30:12',
    tripDetails: {
      hotel: 'Swissotel The Stamford',
      checkIn: '2024-01-13',
      checkOut: '2024-01-17',
      groupSize: 1
    },
    emergencyContacts: [
      {
        name: 'Linda Smith',
        relationship: 'Wife',
        phone: '+44 20 7946 0958'
      }
    ],
    attachedFiles: [],
    status: 'resolved',
    priority: 'high'
  }
];

export default function PanicAlerts() {
  const [alerts, setAlerts] = useState<PanicAlert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<PanicAlert | null>(null);

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

  const getPriorityColor = (priority: string) => {
    return priority === 'critical' 
      ? 'bg-red-100 text-red-800 border-red-200'
      : 'bg-orange-100 text-orange-800 border-orange-200';
  };

  const dispatchTeam = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'responding', responseTeam: 'Emergency Response Team' }
        : alert
    ));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' }
        : alert
    ));
  };

  const activeAlerts = alerts.filter(a => a.status === 'active');
  const respondingAlerts = alerts.filter(a => a.status === 'responding');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return FileAudio;
      case 'photo':
        return Camera;
      case 'video':
        return Camera;
      default:
        return FileAudio;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panic Alerts</h1>
          <p className="text-muted-foreground">Real-time tourist emergency alerts and response management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 animate-pulse">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {activeAlerts.length} Active Alerts
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{activeAlerts.length}</p>
                <p className="text-sm text-red-700">Active Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{respondingAlerts.length}</p>
                <p className="text-sm text-orange-700">Responding</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</p>
                <p className="text-sm text-green-700">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="text-red-600 data-[state=active]:bg-red-100">
            Active ({activeAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="responding" className="text-orange-600 data-[state=active]:bg-orange-100">
            Responding ({respondingAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="text-green-600 data-[state=active]:bg-green-100">
            Resolved ({resolvedAlerts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">PANIC ALERT - {alert.id}</CardTitle>
                        <CardDescription className="flex items-center text-red-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {alert.timestamp} - {Math.floor((Date.now() - new Date(alert.timestamp).getTime()) / 60000)} minutes ago
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                        {alert.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tourist Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{alert.touristName}</span>
                        <span className="text-sm text-muted-foreground">({alert.touristId})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{alert.lastKnownLocation}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Coordinates: {alert.coordinates}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm">Trip Details</h4>
                        <p className="text-sm text-muted-foreground">{alert.tripDetails.hotel}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.tripDetails.checkIn} to {alert.tripDetails.checkOut} • {alert.tripDetails.groupSize} people
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contacts */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Emergency Contacts</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {alert.emergencyContacts.map((contact, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{contact.name}</p>
                            <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{contact.phone}</span>
                            <Button size="sm" variant="outline">
                              <Phone className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attached Files */}
                  {alert.attachedFiles.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Attached Files</h4>
                      <div className="flex flex-wrap gap-2">
                        {alert.attachedFiles.map((file, idx) => {
                          const FileIcon = getFileIcon(file.type);
                          return (
                            <div key={idx} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                              <FileIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{file.filename}</span>
                              <Button size="sm" variant="ghost">
                                {file.type === 'audio' ? <Volume2 className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 pt-4 border-t">
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => dispatchTeam(alert.id)}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Dispatch Team
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Tourist
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {activeAlerts.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Active Alerts</h3>
                <p className="text-muted-foreground">All panic alerts have been addressed</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="responding" className="space-y-4">
          {respondingAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Send className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{alert.touristName} - {alert.id}</h3>
                        <p className="text-sm text-muted-foreground">{alert.lastKnownLocation}</p>
                        <p className="text-sm text-orange-600 font-medium">
                          Response Team: {alert.responseTeam}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => resolveAlert(alert.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-green-200 opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{alert.touristName} - {alert.id}</h3>
                      <p className="text-sm text-muted-foreground">{alert.lastKnownLocation}</p>
                      <Badge variant="outline" className={getStatusColor(alert.status)}>
                        Resolved
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}