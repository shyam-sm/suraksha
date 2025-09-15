import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Plus, Settings, Play, Pause, MapPin, Clock, Globe, Shield, DollarSign, UserX } from 'lucide-react';

export default function NewsScraper() {
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);
  const [selectedIncidentType, setSelectedIncidentType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Sample sources data
  const sources = [
    {
      id: 1,
      domain: 'timesofindia.indiatimes.com',
      rule: '.story-content',
      lastRun: '2 hours ago',
      status: 'Active',
      fetchCount: 23,
      schedule: 'Every 4 hours'
    },
    {
      id: 2,
      domain: 'hindustantimes.com',
      rule: '.story-element-text',
      lastRun: '4 hours ago',
      status: 'Active',
      fetchCount: 18,
      schedule: 'Every 6 hours'
    },
    {
      id: 3,
      domain: 'indianexpress.com',
      rule: '.ie-custom-caption',
      lastRun: '1 day ago',
      status: 'Paused',
      fetchCount: 7,
      schedule: 'Every 12 hours'
    },
    {
      id: 4,
      domain: 'deccanherald.com',
      rule: '.articleBody',
      lastRun: '6 hours ago',
      status: 'Active',
      fetchCount: 12,
      schedule: 'Every 8 hours'
    }
  ];

  // Sample scraped incidents data
  const incidents = [
    {
      id: 1,
      type: 'Theft',
      title: 'Tourist robbed near Gateway of India',
      location: 'Mumbai, Maharashtra',
      source: 'timesofindia.indiatimes.com',
      timestamp: '1 hour ago',
      severity: 'High',
      coordinates: { lat: 18.9220, lng: 72.8347 }
    },
    {
      id: 2,
      type: 'Pickpocket',
      title: 'Multiple pickpocketing incidents reported at Red Fort',
      location: 'Delhi',
      source: 'hindustantimes.com',
      timestamp: '3 hours ago',
      severity: 'Medium',
      coordinates: { lat: 28.6562, lng: 77.2410 }
    },
    {
      id: 3,
      type: 'Scammer',
      title: 'Fake tour guide scam targeting foreign tourists',
      location: 'Jaipur, Rajasthan',
      source: 'indianexpress.com',
      timestamp: '5 hours ago',
      severity: 'Medium',
      coordinates: { lat: 26.9124, lng: 75.7873 }
    },
    {
      id: 4,
      type: 'Harassment',
      title: 'Female tourist harassment case in Goa beaches',
      location: 'Goa',
      source: 'deccanherald.com',
      timestamp: '8 hours ago',
      severity: 'High',
      coordinates: { lat: 15.2993, lng: 74.1240 }
    },
    {
      id: 5,
      type: 'Theft',
      title: 'Camera stolen from tourist at Taj Mahal',
      location: 'Agra, Uttar Pradesh',
      source: 'timesofindia.indiatimes.com',
      timestamp: '12 hours ago',
      severity: 'Low',
      coordinates: { lat: 27.1751, lng: 78.0421 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Paused': return 'bg-amber-100 text-amber-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'Theft': return Shield;
      case 'Pickpocket': return DollarSign;
      case 'Scammer': return AlertCircle;
      case 'Harassment': return UserX;
      default: return AlertCircle;
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    return (selectedIncidentType === 'all' || incident.type === selectedIncidentType) &&
           (selectedRegion === 'all' || incident.location.includes(selectedRegion));
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">News Scraper</h1>
            <p className="text-muted-foreground">Manage news sources and monitor incidents</p>
          </div>
          <Dialog open={isAddSourceModalOpen} onOpenChange={setIsAddSourceModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Source
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add News Source</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input id="domain" placeholder="example.com" />
                </div>
                <div>
                  <Label htmlFor="selector">CSS/XPath Selector</Label>
                  <Input id="selector" placeholder=".article-content" />
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="bn">Bengali</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="schedule">Schedule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="4hours">Every 4 Hours</SelectItem>
                      <SelectItem value="6hours">Every 6 Hours</SelectItem>
                      <SelectItem value="12hours">Every 12 Hours</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="tourism, safety, crime" />
                </div>
                <div>
                  <Label htmlFor="location-rules">Location Parsing Rules</Label>
                  <Textarea id="location-rules" placeholder="Describe how to extract location from articles" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Add Source</Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddSourceModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-6">
        {/* Sources Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>News Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>CSS Rule</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Fetch Count</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        {source.domain}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{source.rule}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {source.lastRun}
                      </div>
                    </TableCell>
                    <TableCell>{source.fetchCount} items</TableCell>
                    <TableCell>{source.schedule}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(source.status)}>
                        {source.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          {source.status === 'Active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter Incidents:</span>
          </div>
          
          <Select value={selectedIncidentType} onValueChange={setSelectedIncidentType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Incident Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Theft">Theft</SelectItem>
              <SelectItem value="Pickpocket">Pickpocket</SelectItem>
              <SelectItem value="Scammer">Scammer</SelectItem>
              <SelectItem value="Harassment">Harassment</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Goa">Goa</SelectItem>
              <SelectItem value="Rajasthan">Rajasthan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Scraped Incidents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Incidents ({filteredIncidents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredIncidents.map((incident) => {
                    const IconComponent = getIncidentIcon(incident.type);
                    return (
                      <div key={incident.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 rounded-full bg-gray-100">
                            <IconComponent className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className={`w-2 h-2 rounded-full ${getSeverityColor(incident.severity)}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {incident.type}
                            </Badge>
                            <Badge className={`text-xs ${getSeverityColor(incident.severity)} text-white`}>
                              {incident.severity}
                            </Badge>
                          </div>
                          
                          <h3 className="font-medium text-foreground mb-1">
                            {incident.title}
                          </h3>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {incident.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {incident.source}
                            </div>
                            <span>{incident.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Incident Map */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Incident Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Map placeholder with incident markers */}
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive map showing</p>
                    <p className="text-sm text-muted-foreground">incident locations</p>
                  </div>
                  
                  {/* Sample incident markers */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse" title="High severity incident" />
                  <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-amber-500 rounded-full animate-pulse" title="Medium severity incident" />
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" title="Low severity incident" />
                  <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-amber-500 rounded-full animate-pulse" title="Medium severity incident" />
                </div>
                
                {/* Legend */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Incident Types</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span>Theft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full" />
                      <span>Pickpocket</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span>Scammer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      <span>Harassment</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}