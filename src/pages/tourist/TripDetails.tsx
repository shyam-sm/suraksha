import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Edit, 
  Trash2, 
  Plus, 
  X, 
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Destination {
  id: string;
  name: string;
  date: string;
  status: 'upcoming' | 'visited';
  description: string;
}

export default function TripDetails() {
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: '1',
      name: 'Red Fort, Delhi',
      date: '2024-01-15',
      status: 'visited',
      description: 'Historic Mughal fortress'
    },
    {
      id: '2',
      name: 'India Gate, Delhi',
      date: '2024-01-16',
      status: 'visited',
      description: 'War memorial arch'
    },
    {
      id: '3',
      name: 'Taj Mahal, Agra',
      date: '2024-01-18',
      status: 'upcoming',
      description: 'Iconic marble mausoleum'
    },
    {
      id: '4',
      name: 'Amer Fort, Jaipur',
      date: '2024-01-20',
      status: 'upcoming',
      description: 'Hilltop fortress palace'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [cancelIdInput, setCancelIdInput] = useState('');
  const [extendDate, setExtendDate] = useState<Date>();
  
  const [newDestination, setNewDestination] = useState({
    name: '',
    date: '',
    description: ''
  });

  const { toast } = useToast();

  const handleAddDestination = () => {
    if (!newDestination.name || !newDestination.date) {
      toast({
        title: "Validation Error",
        description: "Please fill in destination name and date",
        variant: "destructive"
      });
      return;
    }

    const destination: Destination = {
      id: Date.now().toString(),
      name: newDestination.name,
      date: newDestination.date,
      status: new Date(newDestination.date) > new Date() ? 'upcoming' : 'visited',
      description: newDestination.description
    };

    setDestinations(prev => [...prev, destination]);
    setNewDestination({ name: '', date: '', description: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Destination Added",
      description: "New destination added to your itinerary",
      variant: "default"
    });
  };

  const handleDeleteDestination = (id: string) => {
    setDestinations(prev => prev.filter(dest => dest.id !== id));
    toast({
      title: "Destination Removed",
      description: "Destination removed from itinerary",
      variant: "default"
    });
  };

  const handleCancelTrip = () => {
    if (cancelIdInput !== 'TRP-2024-001') {
      toast({
        title: "Invalid Trip ID",
        description: "Please enter the correct Digital Trip ID",
        variant: "destructive"
      });
      return;
    }

    // Mock trip cancellation
    toast({
      title: "Trip Cancelled",
      description: "Your trip has been cancelled successfully",
      variant: "default"
    });
    setIsCancelDialogOpen(false);
    setCancelIdInput('');
  };

  const handleExtendTrip = () => {
    if (!extendDate) {
      toast({
        title: "Date Required",
        description: "Please select an extension date",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Trip Extended",
      description: `Trip extended until ${format(extendDate, 'PPP')}`,
      variant: "default"
    });
    setIsExtendDialogOpen(false);
    setExtendDate(undefined);
  };

  const getStatusIcon = (status: string) => {
    return status === 'visited' ? 
      <CheckCircle className="w-4 h-4 text-success" /> : 
      <Clock className="w-4 h-4 text-warning" />;
  };

  const getStatusBadge = (status: string) => {
    return status === 'visited' ? 
      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Visited</Badge> :
      <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Upcoming</Badge>;
  };

  if (destinations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="space-y-4">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground" />
            <div>
              <h1 className="text-2xl font-bold text-heading mb-2">No Trip Planned</h1>
              <p className="text-subtext">Add destinations to get started with your travel itinerary</p>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-safety hover:bg-secondary-hover transition-smooth shadow-elevated"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Destination
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header with Trip Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-heading">Trip Details</h1>
          <p className="text-subtext">Manage your travel itinerary</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Dialog open={isExtendDialogOpen} onOpenChange={setIsExtendDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Extend Trip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Extend Trip Duration</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select new end date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !extendDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {extendDate ? format(extendDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={extendDate}
                        onSelect={setExtendDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button onClick={handleExtendTrip} className="w-full">
                  Extend Trip
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-danger border-danger hover:bg-danger/10 animate-glow">
                <X className="w-4 h-4 mr-2" />
                Cancel Trip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center text-danger">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Cancel Trip
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-2 p-3 bg-danger/10 border border-danger/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  <p className="text-sm">This action cannot be undone. Enter your Digital Trip ID to confirm.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancelId">Digital Trip ID</Label>
                  <Input
                    id="cancelId"
                    value={cancelIdInput}
                    onChange={(e) => setCancelIdInput(e.target.value)}
                    placeholder="Enter TRP-2024-001"
                  />
                </div>
                <Button 
                  onClick={handleCancelTrip} 
                  variant="destructive" 
                  className="w-full"
                  disabled={!cancelIdInput}
                >
                  Confirm Cancellation
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Destination
          </Button>
        </div>
      </div>

      {/* Destinations List */}
      <div className="grid gap-4">
        <AnimatePresence>
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-elevated transition-smooth">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(destination.status)}
                      <div>
                        <CardTitle className="text-lg">{destination.name}</CardTitle>
                        <p className="text-sm text-subtext">{destination.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(destination.status)}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingDestination(destination)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteDestination(destination.id)}
                        className="text-danger hover:text-danger hover:bg-danger/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-subtext">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(destination.date), 'PPP')}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Destination Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Destination</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                value={newDestination.name}
                onChange={(e) => setNewDestination(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Taj Mahal, Agra"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Visit Date</Label>
              <Input
                id="date"
                type="date"
                value={newDestination.date}
                onChange={(e) => setNewDestination(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={newDestination.description}
                onChange={(e) => setNewDestination(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the destination"
              />
            </div>
            
            <Button onClick={handleAddDestination} className="w-full">
              Add Destination
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}