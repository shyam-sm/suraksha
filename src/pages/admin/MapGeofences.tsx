import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Map as MapIcon, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Download,
  Upload,
  Eye,
  Settings as SettingsIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import DevPanel from '@/components/admin/DevPanel';
import dashboardMap from '@/assets/dashboard-map.png';

interface Geofence {
  id: string;
  name: string;
  type: 'safe' | 'risky' | 'danger' | 'official';
  priority: 'low' | 'medium' | 'high';
  description: string;
  tags: string[];
  lastUpdated: string;
  createdBy: string;
  status: 'active' | 'draft' | 'disabled';
}

const mockGeofences: Geofence[] = [
  {
    id: 'GF-001',
    name: 'Red Fort Safe Zone',
    type: 'safe',
    priority: 'high',
    description: 'Main tourist area with security coverage',
    tags: ['heritage', 'monitored'],
    lastUpdated: '2024-01-15',
    createdBy: 'Admin-001',
    status: 'active'
  },
  {
    id: 'GF-002',
    name: 'Kashmir Border Restricted',
    type: 'danger',
    priority: 'high',
    description: 'Military area - no tourist access',
    tags: ['restricted', 'military'],
    lastUpdated: '2024-01-14',
    createdBy: 'Security-002',
    status: 'active'
  },
  {
    id: 'GF-003',
    name: 'Mumbai Monsoon Risk',
    type: 'risky',
    priority: 'medium',
    description: 'Flood-prone area during monsoon',
    tags: ['weather', 'seasonal'],
    lastUpdated: '2024-01-13',
    createdBy: 'Admin-003',
    status: 'active'
  }
];

export default function MapGeofences() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGeofence, setNewGeofence] = useState({
    name: '',
    type: 'safe',
    priority: 'medium',
    description: '',
    tags: '',
    autoAlert: false
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'risky': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      case 'official': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredGeofences = mockGeofences.filter(gf => {
    const matchesType = selectedType === 'all' || gf.type === selectedType;
    const matchesSearch = gf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gf.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const sampleCreatePayload = `{
  "name": "Kaziranga - Flood Prone",
  "type": "risky",
  "polygon": {
    "type": "Polygon",
    "coordinates": [[[93.5,26.5],[93.6,26.5],[93.6,26.6],[93.5,26.6],[93.5,26.5]]]
  },
  "priority": "high",
  "autoAlert": true,
  "description": "National park area with seasonal flooding risk",
  "tags": ["wildlife", "seasonal", "flooding"]
}`;

  const sampleResponse = `{
  "id": "GF-004",
  "name": "Kaziranga - Flood Prone",
  "type": "risky",
  "status": "active",
  "createdAt": "2024-01-16T10:30:00Z",
  "createdBy": "admin-001"
}`;

  return (
    <div className="space-y-6">
      <DevPanel
        title="Map & Geofences"
        defaultEndpoint="/api/geofences"
        defaultMethod="GET"
        sampleResponse={`[${sampleResponse}]`}
        todos={[
          "Implement POST /api/geofences for creation",
          "Add polygon drawing validation",
          "Set up GeoJSON import functionality", 
          "Connect to mapping service (Mapbox/Google Maps)",
          "Add real-time geofence breach detection"
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Map & Geofences</h1>
          <p className="text-subtext">Manage safety zones and geographic boundaries</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import GeoJSON
          </Button>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Geofence
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Geofence</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newGeofence.name}
                      onChange={(e) => setNewGeofence({...newGeofence, name: e.target.value})}
                      placeholder="Enter geofence name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={newGeofence.type} onValueChange={(value) => setNewGeofence({...newGeofence, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safe">Safe Zone</SelectItem>
                        <SelectItem value="risky">Risky Area</SelectItem>
                        <SelectItem value="danger">Danger Zone</SelectItem>
                        <SelectItem value="official">Official Zone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newGeofence.description}
                    onChange={(e) => setNewGeofence({...newGeofence, description: e.target.value})}
                    placeholder="Describe this geofence area"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoAlert"
                    checked={newGeofence.autoAlert}
                    onCheckedChange={(checked) => setNewGeofence({...newGeofence, autoAlert: !!checked})}
                  />
                  <Label htmlFor="autoAlert">Enable auto-alerts for this geofence</Label>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>TODO:</strong> Connect polygon drawing tools and coordinate input. 
                    Sample API call: POST /api/geofences
                  </p>
                  <pre className="text-xs mt-2 bg-blue-100 p-2 rounded overflow-x-auto">
                    {sampleCreatePayload}
                  </pre>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowCreateModal(false)}>
                    Create Geofence
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapIcon className="w-5 h-5 mr-2" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg overflow-hidden bg-muted h-96">
                <img 
                  src={dashboardMap} 
                  alt="Geofence Map" 
                  className="w-full h-full object-cover"
                />
                {/* Map Controls Overlay */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="bg-white/90 backdrop-blur rounded-lg p-2 space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Safe Zones</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span>Risky Areas</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Danger Zones</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Official Zones</span>
                    </div>
                  </div>
                </div>

                {/* Drawing Tools */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur rounded-lg p-2 space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Draw Polygon
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Draw Circle
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Draw Rectangle
                    </Button>
                  </div>
                </div>

                {/* Sample Geofence Overlays */}
                <motion.div
                  className="absolute top-20 left-32 w-16 h-16 border-4 border-green-500 rounded-full bg-green-500/20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-32 right-28 w-20 h-12 border-4 border-red-500 bg-red-500/20"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls & List */}
        <div className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters & Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Search Geofences</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Filter by Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="safe">Safe Zones</SelectItem>
                    <SelectItem value="risky">Risky Areas</SelectItem>
                    <SelectItem value="danger">Danger Zones</SelectItem>
                    <SelectItem value="official">Official Zones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Geofences List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Geofences ({filteredGeofences.length})
                <Button variant="ghost" size="sm">
                  <SettingsIcon className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {filteredGeofences.map((geofence, index) => (
                <motion.div
                  key={geofence.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-sm">{geofence.name}</h4>
                        <Badge variant="outline" className={getTypeColor(geofence.type)}>
                          {geofence.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {geofence.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {geofence.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Updated: {geofence.lastUpdated}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Integration Console */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Integration Console</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Base API URL</Label>
              <Input placeholder="https://api.yourdomain.com" className="bg-white" />
            </div>
            <div>
              <Label>Auth Token</Label>
              <Input placeholder="Bearer token..." type="password" className="bg-white" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Sample Integration Code:</h4>
            <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// Fetch geofences
const geofences = await fetch('/api/geofences', {
  headers: { 'Authorization': 'Bearer TOKEN' }
});

// Create geofence 
const newGeofence = await fetch('/api/geofences', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(geofenceData)
});

// TODO: Add polygon drawing integration
// TODO: Connect to mapping service
// TODO: Implement real-time breach detection`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}