import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Eye, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Tourist {
  id: string;
  name: string;
  country: string;
  state: string;
  district: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'expired';
  registrationDate: string;
  lastActivity: string;
}

const mockTourists: Tourist[] = [
  {
    id: 'TID-001',
    name: 'John Smith',
    country: 'USA',
    state: 'Assam',
    district: 'Guwahati',
    phone: '+1-555-0123',
    email: 'john.smith@email.com',
    status: 'active',
    registrationDate: '2024-01-10',
    lastActivity: '2024-01-15 14:30'
  },
  {
    id: 'TID-002',
    name: 'Maria Garcia',
    country: 'Spain',
    state: 'Kerala',
    district: 'Kochi',
    phone: '+34-600-123456',
    email: 'maria.garcia@email.com',
    status: 'active',
    registrationDate: '2024-01-08',
    lastActivity: '2024-01-15 12:15'
  },
  {
    id: 'TID-003',
    name: 'Hans Mueller',
    country: 'Germany',
    state: 'Rajasthan',
    district: 'Jaipur',
    phone: '+49-151-12345678',
    email: 'hans.mueller@email.com',
    status: 'inactive',
    registrationDate: '2024-01-05',
    lastActivity: '2024-01-12 09:45'
  },
  {
    id: 'TID-004',
    name: 'Sarah Johnson',
    country: 'UK',
    state: 'Goa',
    district: 'Panaji',
    phone: '+44-7700-900123',
    email: 'sarah.j@email.com',
    status: 'active',
    registrationDate: '2024-01-12',
    lastActivity: '2024-01-15 16:20'
  },
  {
    id: 'TID-005',
    name: 'Akira Tanaka',
    country: 'Japan',
    state: 'Tamil Nadu',
    district: 'Chennai',
    phone: '+81-90-1234-5678',
    email: 'akira.tanaka@email.com',
    status: 'expired',
    registrationDate: '2023-12-20',
    lastActivity: '2024-01-01 10:30'
  }
];

export default function TouristManagement() {
  const [tourists] = useState<Tourist[]>(mockTourists);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterState, setFilterState] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = 
      tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = filterCountry === 'all' || tourist.country === filterCountry;
    const matchesState = filterState === 'all' || tourist.state === filterState;
    const matchesStatus = filterStatus === 'all' || tourist.status === filterStatus;

    return matchesSearch && matchesCountry && matchesState && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-success text-success-foreground',
      inactive: 'bg-warning text-warning-foreground',
      expired: 'bg-danger text-danger-foreground'
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  const uniqueCountries = [...new Set(tourists.map(t => t.country))];
  const uniqueStates = [...new Set(tourists.map(t => t.state))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Tourist Management</h1>
          <p className="text-subtext">Monitor and manage registered tourists</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Tourists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heading">{tourists.length}</div>
            <p className="text-xs text-subtext">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {tourists.filter(t => t.status === 'active').length}
            </div>
            <p className="text-xs text-subtext">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heading">{uniqueCountries.length}</div>
            <p className="text-xs text-subtext">Represented</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">States Visited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heading">{uniqueStates.length}</div>
            <p className="text-xs text-subtext">Across India</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Tourist Database</CardTitle>
          <CardDescription>
            Search and filter tourists by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label>Country</Label>
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {uniqueCountries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tourist ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTourists.map((tourist) => (
                  <TableRow key={tourist.id}>
                    <TableCell className="font-medium">{tourist.id}</TableCell>
                    <TableCell>{tourist.name}</TableCell>
                    <TableCell>{tourist.country}</TableCell>
                    <TableCell>{tourist.state}</TableCell>
                    <TableCell>{tourist.district}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{tourist.phone}</div>
                        <div className="text-muted-foreground text-xs">{tourist.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(tourist.status)}>
                        {tourist.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tourist.lastActivity}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Export Data
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTourists.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No tourists found matching your criteria.
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Showing {filteredTourists.length} of {tourists.length} tourists
          </div>
        </CardContent>
      </Card>
    </div>
  );
}