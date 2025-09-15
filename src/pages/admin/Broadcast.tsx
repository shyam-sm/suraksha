import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Users, MapPin, Globe } from 'lucide-react';

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
    message: 'Weather alert: Heavy rainfall expected in your area. Please stay indoors.',
    targetType: 'area',
    targetValue: 'Kaziranga National Park',
    timestamp: '2024-01-15 14:30',
    status: 'sent',
    recipientCount: 156
  },
  {
    id: '2', 
    message: 'Tourist safety reminder: Register with local authorities upon arrival.',
    targetType: 'country',
    targetValue: 'India',
    timestamp: '2024-01-15 09:15',
    status: 'sent',
    recipientCount: 2840
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
      sent: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground', 
      failed: 'bg-danger text-danger-foreground'
    };
    return variants[status as keyof typeof variants] || variants.sent;
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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your broadcast message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Type</Label>
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
                  <Label htmlFor="target">
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
                <Label>Priority Level</Label>
                <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <Button 
                onClick={handleSend}
                disabled={!message || !targetValue}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast
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
              <p className="text-xs text-subtext">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Recipients Reached</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-heading">3,248</div>
              <p className="text-xs text-subtext">Across all messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Delivery Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">98.5%</div>
              <p className="text-xs text-subtext">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Broadcasts</CardTitle>
          <CardDescription>
            History of sent messages and their delivery status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="space-y-1 flex-1">
                  <p className="font-medium text-heading">{msg.message}</p>
                  <div className="flex items-center gap-4 text-sm text-subtext">
                    <div className="flex items-center gap-1">
                      {msg.targetType === 'area' ? <MapPin className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                      {msg.targetValue}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {msg.recipientCount} recipients
                    </div>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
                <Badge className={getStatusBadge(msg.status)}>
                  {msg.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}