import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Users, MapPin, Globe, MessageSquare, Clock } from 'lucide-react';

interface BroadcastMessage {
  id: string;
  message: string;
  targetType: 'area' | 'country';
  targetValue: string;
  timestamp: string;
  status: 'sent' | 'pending' | 'failed';
  recipientCount: number;
}

const mockMessages: BroadcastMessage[] = [
  {
    id: '1',
    message: 'Weather alert: Heavy rainfall expected in your area. Please stay indoors and avoid outdoor activities.',
    targetType: 'area',
    targetValue: 'Kaziranga National Park',
    timestamp: '2024-01-15 14:30',
    status: 'sent',
    recipientCount: 156
  },
  {
    id: '2', 
    message: 'Tourist safety reminder: Please register with local authorities upon arrival at your destination.',
    targetType: 'country',
    targetValue: 'India',
    timestamp: '2024-01-15 09:15',
    status: 'sent',
    recipientCount: 2840
  },
  {
    id: '3',
    message: 'Traffic advisory: Road closure on NH-37 due to maintenance work. Alternative routes available.',
    targetType: 'area',
    targetValue: 'Guwahati City',
    timestamp: '2024-01-14 16:45',
    status: 'sent',
    recipientCount: 427
  }
];

export default function Broadcast() {
  const [message, setMessage] = useState('');
  const [targetType, setTargetType] = useState<'area' | 'country'>('area');
  const [targetValue, setTargetValue] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [messages] = useState<BroadcastMessage[]>(mockMessages);

  const handleSend = () => {
    if (!message || !targetValue) return;
    
    // Simulate sending message
    console.log('Sending broadcast:', { message, targetType, targetValue, priority });
    
    // Reset form
    setMessage('');
    setTargetValue('');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: 'bg-emerald-100 text-emerald-800',
      pending: 'bg-amber-100 text-amber-800',
      failed: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.sent;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-red-100 text-red-800'
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Broadcast Messages</h1>
          <p className="text-subtext">Send alerts and notifications to tourists</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose Message Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Compose Broadcast
              </CardTitle>
              <CardDescription>
                Send messages to tourists in specific areas or countries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your broadcast message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {message.length}/500 characters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Target Type</Label>
                  <Select value={targetType} onValueChange={(value: 'area' | 'country') => setTargetType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="area">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Specific Area
                        </div>
                      </SelectItem>
                      <SelectItem value="country">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Country
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target" className="text-sm font-medium">
                    {targetType === 'area' ? 'Area Name' : 'Country Name'}
                  </Label>
                  <Input
                    id="target"
                    placeholder={targetType === 'area' ? 'e.g., Kaziranga National Park' : 'e.g., India'}
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority Level</Label>
                <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        Low Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Medium Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        High Priority
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Message Preview</h4>
                <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Tourist Safety Alert</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {message || 'Your message will appear here...'}
                      </p>
                      {targetValue && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Target: {targetType === 'area' ? 'Area' : 'Country'} - {targetValue}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSend}
                disabled={!message || !targetValue}
                className="w-full"
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Today's Broadcasts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-heading">12</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Recipients Reached</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-heading">3,248</div>
              <p className="text-xs text-muted-foreground">Across all messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Delivery Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">98.5%</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs"
                onClick={() => setMessage('Weather alert: Please stay safe and follow local advisories.')}
              >
                Weather Alert
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs"
                onClick={() => setMessage('Safety reminder: Please register with local authorities.')}
              >
                Safety Reminder
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs"
                onClick={() => setMessage('Traffic advisory: Alternative routes recommended.')}
              >
                Traffic Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Broadcasts
          </CardTitle>
          <CardDescription>
            History of sent messages and their delivery status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1 flex-1">
                  <p className="font-medium text-heading line-clamp-2">{msg.message}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {msg.targetType === 'area' ? <MapPin className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                      {msg.targetValue}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {msg.recipientCount} recipients
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusBadge(msg.status)}>
                    {msg.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}