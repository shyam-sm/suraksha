import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Map as MapIcon, Plus, Upload, Edit, Trash2, Save, X, FileUp } from 'lucide-react';

interface Geofence {
  id: string;
  name: string;
  type: 'safe' | 'risky' | 'danger';
  state: string;
  district: string;
  coordinates: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

const mockGeofences: Geofence[] = [
  {
    id: 'GF-001',
    name: 'Kaziranga Safe Zone',
    type: 'safe',
    state: 'Assam',
    district: 'Golaghat',
    coordinates: '26.5774, 93.1723',
    createdAt: '2024-01-10',
    status: 'active'
  },
  {
    id: 'GF-002', 
    name: 'Flood Prone Area - Brahmaputra',
    type: 'danger',
    state: 'Assam',
    district: 'Guwahati',
    coordinates: '26.1445, 91.7362',
    createdAt: '2024-01-08',
    status: 'active'
  },
  {
    id: 'GF-003',
    name: 'Restricted Military Zone',
    type: 'risky',
    state: 'Arunachal Pradesh',
    district: 'Tawang',
    coordinates: '27.5858, 91.8644',
    createdAt: '2024-01-05',
    status: 'active'
  }
];

export default function Map() {
  const [geofences, setGeofences] = useState<Geofence[]>(mockGeofences);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingGeofence, setEditingGeofence] = useState<Geofence | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    type: 'safe' | 'risky' | 'danger';
    state: string;
    district: string;
    coordinates: string;
  }>({
    name: '',
    type: 'safe',
    state: '',
    district: '',
    coordinates: '',
  });

  const handleCreateGeofence = () => {
    setEditingGeofence(null);
    setFormData({
      name: '',
      type: 'safe',
      state: '',
      district: '',
      coordinates: '',
    });
    setIsDrawerOpen(true);
  };

  const handleEditGeofence = (geofence: Geofence) => {
    setEditingGeofence(geofence);
    setFormData({
      name: geofence.name,
      type: geofence.type,
      state: geofence.state,
      district: geofence.district,
      coordinates: geofence.coordinates,
    });
    setIsDrawerOpen(true);
  };

  const handleSaveGeofence = () => {
    if (editingGeofence) {
      setGeofences(prev => prev.map(g => 
        g.id === editingGeofence.id 
          ? { ...g, ...formData }
          : g
      ));
    } else {
      const newGeofence: Geofence = {
        id: `GF-${String(geofences.length + 1).padStart(3, '0')}`,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setGeofences(prev => [...prev, newGeofence]);
    }
    setIsDrawerOpen(false);
  };

  const handleDeleteGeofence = (id: string) => {
    setGeofences(prev => prev.filter(g => g.id !== id));
  };

  const getTypeColor = (type: string) => {
    const colors = {
      safe: 'bg-success text-success-foreground',
      risky: 'bg-warning text-warning-foreground',
      danger: 'bg-danger text-danger-foreground'
    };
    return colors[type as keyof typeof colors] || colors.safe;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Geofence Management</h1>
          <p className="text-subtext">Manage safety zones and restricted areas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
          </Button>
          <Button onClick={handleCreateGeofence}>
            <Plus className="h-4 w-4 mr-2" />
            Create Geofence
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Canvas */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="h-5 w-5" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center space-y-2">
                  <MapIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive Map View</p>
                  <p className="text-sm text-muted-foreground">Mapbox integration will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Geofences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-heading">{geofences.length}</div>
              <p className="text-xs text-subtext">Active zones</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Safe Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {geofences.filter(g => g.type === 'safe').length}
              </div>
              <p className="text-xs text-subtext">Protected areas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Danger Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-danger">
                {geofences.filter(g => g.type === 'danger').length}
              </div>
              <p className="text-xs text-subtext">High risk areas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Risky Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {geofences.filter(g => g.type === 'risky').length}
              </div>
              <p className="text-xs text-subtext">Caution zones</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Geofences List */}
      <Card>
        <CardHeader>
          <CardTitle>Geofence List</CardTitle>
          <CardDescription>
            Manage all created geofences and their properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Coordinates</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {geofences.map((geofence) => (
                <TableRow key={geofence.id}>
                  <TableCell className="font-medium">{geofence.name}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(geofence.type)}>
                      {geofence.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{geofence.state}, {geofence.district}</TableCell>
                  <TableCell className="font-mono text-sm">{geofence.coordinates}</TableCell>
                  <TableCell>{geofence.createdAt}</TableCell>
                  <TableCell>
                    <Badge variant={geofence.status === 'active' ? 'default' : 'secondary'}>
                      {geofence.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditGeofence(geofence)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteGeofence(geofence.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Geofence Editor Sheet */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {editingGeofence ? 'Edit Geofence' : 'Create New Geofence'}
            </SheetTitle>
            <SheetDescription>
              Configure the geofence properties and coordinates
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter geofence name"
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: 'safe' | 'risky' | 'danger') => 
                  setFormData(prev => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="safe">Safe Zone</SelectItem>
                  <SelectItem value="risky">Risky Area</SelectItem>
                  <SelectItem value="danger">Danger Zone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="Enter state"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                  placeholder="Enter district"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordinates">Coordinates (Lat, Lng)</Label>
              <Input
                id="coordinates"
                value={formData.coordinates}
                onChange={(e) => setFormData(prev => ({ ...prev, coordinates: e.target.value }))}
                placeholder="26.1445, 91.7362"
              />
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={handleSaveGeofence} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Geofence
              </Button>
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}