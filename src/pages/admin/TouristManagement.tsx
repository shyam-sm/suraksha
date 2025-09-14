import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Shield, 
  Eye, 
  EyeOff, 
  Clock, 
  MapPin,
  Phone,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DevPanel from '@/components/admin/DevPanel';

interface Tourist {
  id: string;
  name: string;
  nationality: string;
  tripDates: { start: string; end: string };
  status: 'active' | 'expired' | 'revoked';
  lastLocation: string;
  blockchainTx: string;
  lastCheckIn: string;
  emergencyContacts: number;
  riskScore: number;
}

const mockTourists: Tourist[] = [
  {
    id: 'TRP-2024-001',
    name: '****** ******** (Masked)',
    nationality: 'USA',
    tripDates: { start: '2024-01-10', end: '2024-01-25' },
    status: 'active',
    lastLocation: 'Red Fort, Delhi',
    blockchainTx: '0x7a9f...c3b2',
    lastCheckIn: '2 hours ago',
    emergencyContacts: 2,
    riskScore: 15
  },
  {
    id: 'TRP-2024-002',
    name: '****** **** (Masked)',
    nationality: 'Germany',
    tripDates: { start: '2024-01-05', end: '2024-01-20' },
    status: 'active',
    lastLocation: 'Gateway of India, Mumbai',
    blockchainTx: '0x9b1f...d4e3',
    lastCheckIn: '30 min ago',
    emergencyContacts: 1,
    riskScore: 8
  },
  {
    id: 'TRP-2024-003',
    name: '****** ***** (Masked)',
    nationality: 'Japan',
    tripDates: { start: '2023-12-15', end: '2024-01-05' },
    status: 'expired',
    lastLocation: 'Mysore Palace, Karnataka',
    blockchainTx: '0x2c8e...f5a1',
    lastCheckIn: '5 days ago',
    emergencyContacts: 2,
    riskScore: 45
  }
];

export default function TouristManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [showPII, setShowPII] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'revoked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 20) return 'text-green-600';
    if (score < 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const handleRevealPII = (tourist: Tourist) => {
    setSelectedTourist(tourist);
    setShowPasswordModal(true);
  };

  const verifyPassword = () => {
    // Mock password verification
    if (adminPassword === 'admin123') {
      setShowPII(true);
      setShowPasswordModal(false);
      setAdminPassword('');
    }
  };

  const filteredTourists = mockTourists.filter(tourist =>
    tourist.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sampleResponse = `{
  "tourists": [
    {
      "id": "TRP-2024-001",
      "maskedName": "****** ******** (Masked)",
      "nationality": "USA",
      "status": "active",
      "lastLocation": "Red Fort, Delhi",
      "blockchainTx": "0x7a9f...c3b2",
      "riskScore": 15
    }
  ],
  "total": 847,
  "page": 1
}`;

  const revealResponse = `{
  "tourist": {
    "id": "TRP-2024-001",
    "fullName": "John Alexander Smith",
    "email": "john.smith@email.com",
    "phone": "+1-555-0123",
    "passportNumber": "US123456789",
    "emergencyContacts": [
      {
        "name": "Jane Smith",
        "relationship": "Spouse", 
        "phone": "+1-555-0124"
      }
    ],
    "itinerary": [...],
    "auditLog": "Access logged for Admin-001"
  }
}`;

  return (
    <div className="space-y-6">
      <DevPanel
        title="Tourist Management"
        defaultEndpoint="/api/tourists"
        defaultMethod="GET"
        sampleResponse={sampleResponse}
        todos={[
          "Implement server-side password verification",
          "Add audit logging for PII access", 
          "Connect to blockchain verification endpoint",
          "Set up real-time location tracking",
          "Implement automated risk scoring"
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Tourist Management</h1>
          <p className="text-subtext">Blockchain-backed digital identity management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Shield className="w-3 h-3 mr-1" />
            Blockchain Verified
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            {filteredTourists.filter(t => t.status === 'active').length} Active
          </Badge>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Tourist ID, phone, passport, or Aadhaar hash"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tourists Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Registered Tourists ({filteredTourists.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tourist ID</TableHead>
                <TableHead>Name (Masked)</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Trip Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Location</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Blockchain</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTourists.map((tourist, index) => (
                <motion.tr
                  key={tourist.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-mono text-sm">{tourist.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {tourist.nationality.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{tourist.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{tourist.nationality}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{tourist.tripDates.start}</div>
                      <div className="text-muted-foreground">to {tourist.tripDates.end}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(tourist.status)}>
                      {tourist.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{tourist.lastLocation}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getRiskColor(tourist.riskScore)}`}>
                      {tourist.riskScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {tourist.blockchainTx}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevealPII(tourist)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Lock className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Password Modal for PII Access */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-amber-700">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Security Verification Required
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                <strong>Warning:</strong> You are about to access Personally Identifiable Information (PII). 
                This action will be logged and audited. Enter your admin password to proceed.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                <strong>TODO:</strong> Implement server-side password verification and audit logging:
              </p>
              <pre className="text-xs mt-2 bg-blue-100 p-2 rounded">
{`POST /api/tourists/{id}/reveal-request
{
  "adminId": "A-001",
  "reason": "view details", 
  "password": "enteredPassword"
}`}
              </pre>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button onClick={verifyPassword}>
                Verify & Access
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tourist Details Modal (with revealed PII) */}
      {showPII && selectedTourist && (
        <Dialog open={showPII} onOpenChange={setShowPII}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Tourist Details - {selectedTourist.id}
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <Shield className="w-3 h-3 mr-1" />
                    PII Access Granted
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPII(false)}
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">Full Name</Label>
                      <p className="font-medium">John Alexander Smith</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Email</Label>
                      <p className="font-medium">john.smith@email.com</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Phone</Label>
                      <p className="font-medium">+1-555-0123</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Passport</Label>
                      <p className="font-medium">US123456789</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trip Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">Duration</Label>
                      <p className="font-medium">{selectedTourist.tripDates.start} - {selectedTourist.tripDates.end}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Last Check-in</Label>
                      <p className="font-medium">{selectedTourist.lastCheckIn}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Current Location</Label>
                      <p className="font-medium">{selectedTourist.lastLocation}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Jane Smith</p>
                        <p className="text-sm text-muted-foreground">Spouse</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">+1-555-0124</p>
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Extend Validity
                </Button>
                <Button variant="outline">
                  <Unlock className="w-4 h-4 mr-2" />
                  Force Logout
                </Button>
                <Button variant="destructive">
                  <Lock className="w-4 h-4 mr-2" />
                  Revoke ID
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Blockchain Verification Panel */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Blockchain Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Sample Blockchain Verification:</h4>
            <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// Verify tourist on blockchain
const verification = await fetch('/api/blockchain/tourist/TRP-2024-001', {
  headers: { 'Authorization': 'Bearer TOKEN' }
});

// Response example:
{
  "valid": true,
  "transactionHash": "0x7a9f...c3b2",
  "blockNumber": 18450123,
  "timestamp": "2024-01-15T10:30:00Z",
  "issuer": "tourism-authority"
}

// TODO: Connect to actual blockchain network
// TODO: Implement smart contract verification`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}