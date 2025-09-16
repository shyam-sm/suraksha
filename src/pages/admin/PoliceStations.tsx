import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  Edit2, 
  Trash2,
  Shield,
  Users,
  Clock
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PoliceStation {
  id: string;
  name: string;
  stationId: string;
  address: string;
  coordinates: string;
  contact: string;
  officers: number;
  status: 'active' | 'inactive';
  coverage: string;
}

const mockStations: PoliceStation[] = [
  {
    id: '1',
    name: 'Marina Bay Police Station',
    stationId: 'PS001',
    address: '123 Marina Bay Drive, Singapore 018956',
    coordinates: '1.2830, 103.8607',
    contact: '+65 6555-0123',
    officers: 45,
    status: 'active',
    coverage: 'Marina Bay, CBD'
  },
  {
    id: '2',
    name: 'Orchard Road Police Station',
    stationId: 'PS002',
    address: '456 Orchard Road, Singapore 238882',
    coordinates: '1.3048, 103.8318',
    contact: '+65 6555-0456',
    officers: 38,
    status: 'active',
    coverage: 'Orchard, Somerset'
  },
  {
    id: '3',
    name: 'Sentosa Police Post',
    stationId: 'PS003',
    address: '789 Sentosa Gateway, Singapore 098138',
    coordinates: '1.2494, 103.8303',
    contact: '+65 6555-0789',
    officers: 22,
    status: 'active',
    coverage: 'Sentosa Island'
  }
];

export default function PoliceStations() {
  const [stations, setStations] = useState<PoliceStation[]>(mockStations);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.stationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Police Station Management</h1>
          <p className="text-muted-foreground">Manage police stations and their coverage areas</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Station
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Police Station</DialogTitle>
              <DialogDescription>
                Create a new police station with coverage area details
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Station Name</Label>
                <Input id="name" placeholder="Enter station name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stationId">Station ID</Label>
                <Input id="stationId" placeholder="PS001" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter complete address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coordinates">Coordinates</Label>
                <Input id="coordinates" placeholder="1.2830, 103.8607" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" placeholder="+65 6555-0000" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="coverage">Coverage Areas</Label>
                <Input id="coverage" placeholder="Area 1, Area 2, Area 3" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Station
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stations.length}</p>
                <p className="text-sm text-muted-foreground">Total Stations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stations.reduce((acc, station) => acc + station.officers, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Officers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <MapPin className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{stations.filter(s => s.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Stations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Clock className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Station Directory</CardTitle>
          <CardDescription>View and manage all police stations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, ID, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Station Details</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Officers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStations.map((station, index) => (
                  <motion.tr
                    key={station.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{station.name}</p>
                        <p className="text-sm text-muted-foreground">{station.stationId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{station.address}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {station.coordinates}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {station.contact}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">{station.officers}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(station.status)}>
                        {station.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{station.coverage}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}