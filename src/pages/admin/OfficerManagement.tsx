import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter,
  User, 
  Phone, 
  Badge as BadgeIcon,
  Clock,
  Edit2,
  MoreHorizontal,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Officer {
  id: string;
  name: string;
  policeId: string;
  phone: string;
  rank: string;
  station: string;
  dutyStatus: 'on-duty' | 'off-duty' | 'break';
  shift: string;
  joinDate: string;
}

const mockOfficers: Officer[] = [
  {
    id: '1',
    name: 'Sergeant John Smith',
    policeId: 'POL001',
    phone: '+65 9123-4567',
    rank: 'Sergeant',
    station: 'Marina Bay PS',
    dutyStatus: 'on-duty',
    shift: 'Day Shift (6 AM - 6 PM)',
    joinDate: '2020-03-15'
  },
  {
    id: '2',
    name: 'Officer Jane Doe',
    policeId: 'POL002',
    phone: '+65 9234-5678',
    rank: 'Officer',
    station: 'Orchard PS',
    dutyStatus: 'on-duty',
    shift: 'Night Shift (6 PM - 6 AM)',
    joinDate: '2021-07-22'
  },
  {
    id: '3',
    name: 'Inspector Mike Chen',
    policeId: 'POL003',
    phone: '+65 9345-6789',
    rank: 'Inspector',
    station: 'Marina Bay PS',
    dutyStatus: 'off-duty',
    shift: 'Day Shift (6 AM - 6 PM)',
    joinDate: '2019-01-10'
  },
  {
    id: '4',
    name: 'Officer Sarah Lee',
    policeId: 'POL004',
    phone: '+65 9456-7890',
    rank: 'Officer',
    station: 'Sentosa PP',
    dutyStatus: 'break',
    shift: 'Day Shift (6 AM - 6 PM)',
    joinDate: '2022-09-05'
  }
];

export default function OfficerManagement() {
  const [officers, setOfficers] = useState<Officer[]>(mockOfficers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [rankFilter, setRankFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.policeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || officer.dutyStatus === statusFilter;
    const matchesRank = rankFilter === 'all' || officer.rank === rankFilter;
    
    return matchesSearch && matchesStatus && matchesRank;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-duty':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'off-duty':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'break':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'Inspector':
        return '👮‍♂️';
      case 'Sergeant':
        return '🎖️';
      case 'Officer':
        return '👮';
      default:
        return '👮';
    }
  };

  const toggleDutyStatus = (officerId: string) => {
    setOfficers(officers.map(officer => 
      officer.id === officerId 
        ? { ...officer, dutyStatus: officer.dutyStatus === 'on-duty' ? 'off-duty' : 'on-duty' }
        : officer
    ));
  };

  const onDutyCount = officers.filter(o => o.dutyStatus === 'on-duty').length;
  const offDutyCount = officers.filter(o => o.dutyStatus === 'off-duty').length;
  const onBreakCount = officers.filter(o => o.dutyStatus === 'break').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Officer Management</h1>
          <p className="text-muted-foreground">Manage police officers and duty assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Officer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Officer</DialogTitle>
              <DialogDescription>
                Register a new police officer in the system
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="officerName">Full Name</Label>
                <Input id="officerName" placeholder="Enter officer name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policeId">Police ID</Label>
                <Input id="policeId" placeholder="POL001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+65 9000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rank">Rank</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="officer">Officer</SelectItem>
                    <SelectItem value="sergeant">Sergeant</SelectItem>
                    <SelectItem value="inspector">Inspector</SelectItem>
                    <SelectItem value="superintendent">Superintendent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="station">Assigned Station</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marina-bay">Marina Bay PS</SelectItem>
                    <SelectItem value="orchard">Orchard PS</SelectItem>
                    <SelectItem value="sentosa">Sentosa PP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift">Shift Assignment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day Shift (6 AM - 6 PM)</SelectItem>
                    <SelectItem value="night">Night Shift (6 PM - 6 AM)</SelectItem>
                    <SelectItem value="rotating">Rotating Shift</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Officer
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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{onDutyCount}</p>
                <p className="text-sm text-muted-foreground">On Duty</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">{offDutyCount}</p>
                <p className="text-sm text-muted-foreground">Off Duty</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BadgeIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{onBreakCount}</p>
                <p className="text-sm text-muted-foreground">On Break</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{officers.length}</p>
                <p className="text-sm text-muted-foreground">Total Officers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Officer Directory</CardTitle>
          <CardDescription>Manage officer information and duty status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, ID, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="on-duty">On Duty</SelectItem>
                <SelectItem value="off-duty">Off Duty</SelectItem>
                <SelectItem value="break">On Break</SelectItem>
              </SelectContent>
            </Select>
            <Select value={rankFilter} onValueChange={setRankFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranks</SelectItem>
                <SelectItem value="Officer">Officer</SelectItem>
                <SelectItem value="Sergeant">Sergeant</SelectItem>
                <SelectItem value="Inspector">Inspector</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Officer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>Duty Status</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOfficers.map((officer, index) => (
                  <motion.tr
                    key={officer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{officer.name}</p>
                          <p className="text-sm text-muted-foreground">{officer.policeId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {officer.phone}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{getRankIcon(officer.rank)}</span>
                        <span className="font-medium">{officer.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{officer.station}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getStatusColor(officer.dutyStatus)}>
                          {officer.dutyStatus}
                        </Badge>
                        <Switch
                          checked={officer.dutyStatus === 'on-duty'}
                          onCheckedChange={() => toggleDutyStatus(officer.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{officer.shift}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Assign Station</DropdownMenuItem>
                            <DropdownMenuItem>Change Shift</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Remove Officer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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