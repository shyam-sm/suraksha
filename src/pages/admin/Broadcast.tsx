import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Map, 
  Users, 
  Clock, 
  Settings as SettingsIcon,
  Smartphone,
  Mail,
  Phone,
  MessageCircle,
  History,
  TestTube,
  Target,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import DevPanel from '@/components/admin/DevPanel';
import dashboardMap from '@/assets/dashboard-map.png';

interface BroadcastMessage {
  id: string;
  message: string;
  targets: {
    country?: string;
    state?: string;
    district?: string;
    geofence?: string;
    radius?: { lat: number; lng: number; km: number };
  };
  channels: string[];
  schedule?: string;
  severity: 'info' | 'warning' | 'alert' | 'emergency';
  ttl: number; // hours
  sentAt?: string;
  recipientCount?: number;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
}

const mockTemplates = [
  {
    id: 'T1',
    name: 'Entering Risky Zone',
    message: 'Warning: You are entering {{place}} which has been marked as a risky area. Please exercise caution and stay alert.',
    variables: ['{{place}}']
  },
  {
    id: 'T2', 
    name: 'Weather Alert',
    message: 'Weather Alert: {{severity}} weather conditions expected in {{location}}. ETA: {{eta}}. Please take necessary precautions.',
    variables: ['{{severity}}', '{{location}}', '{{eta}}']
  },
  {
    id: 'T3',
    name: 'Emergency Evacuation',
    message: 'EMERGENCY: Immediate evacuation required from {{area}}. Follow local authority instructions. Emergency helpline: {{helpline}}',
    variables: ['{{area}}', '{{helpline}}']
  }
];

const mockHistory: BroadcastMessage[] = [
  {
    id: 'BC-001',
    message: 'Flood warning for Munnar region. Tourists advised to avoid low-lying areas.',
    targets: { state: 'Kerala', district: 'Idukki' },
    channels: ['push', 'sms'],
    severity: 'warning',
    ttl: 24,
    sentAt: '2024-01-16 10:30:00',
    recipientCount: 1847,
    status: 'sent'
  },
  {
    id: 'BC-002',
    message: 'Heavy traffic expected at Red Fort due to festival. Plan accordingly.',
    targets: { geofence: 'Red Fort Area' },
    channels: ['push'],
    severity: 'info',
    ttl: 12,
    sentAt: '2024-01-16 08:15:00',
    recipientCount: 324,
    status: 'sent'
  }
];

export default function Broadcast() {
  const [activeTab, setActiveTab] = useState('compose');
  const [message, setMessage] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['push']);
  const [targetType, setTargetType] = useState('state');
  const [severity, setSeverity] = useState('info');
  const [ttl, setTtl] = useState([24]);
  const [schedule, setSchedule] = useState('immediate');

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const insertTemplate = (template: typeof mockTemplates[0]) => {
    setMessage(template.message);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'alert': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const samplePayload = `{
  "message": "Weather Alert: Heavy rain expected in Mumbai. ETA: 2 hours. Please take necessary precautions.",
  "targets": {
    "state": "Maharashtra",
    "district": "Mumbai"
  },
  "channels": ["push", "sms", "email"],
  "severity": "warning",
  "schedule": null,
  "ttl": 24,
  "variables": {
    "place": "Mumbai",
    "severity": "Heavy rain", 
    "eta": "2 hours"
  }
}`;

  const sampleResponse = `{
  "broadcastId": "BC-003",
  "status": "queued",
  "estimatedRecipients": 2547,
  "scheduledFor": "2024-01-16T15:30:00Z",
  "channels": {
    "push": { "queued": 2547 },
    "sms": { "queued": 2547 },
    "email": { "queued": 1823 }
  }
}`;

  return (
    <div className="space-y-6">
      <DevPanel
        title="Broadcast & Messaging"
        defaultEndpoint="/api/broadcast"
        defaultMethod="POST"
        defaultBody={samplePayload}
        sampleResponse={sampleResponse}
        todos={[
          "Connect to SMS provider (Twilio, AWS SNS)",
          "Set up WhatsApp Business API integration",
          "Implement email template system",
          "Add recipient targeting refinement",
          "Set up delivery status tracking"
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Broadcast & Messaging</h1>
          <p className="text-subtext">Geo-targeted alerts and communication system</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Users className="w-3 h-3 mr-1" />
            4,283 Active Recipients
          </Badge>
          <Button variant="outline" size="sm">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Provider Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose Broadcast</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message Composer */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Compose Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Message Content</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your broadcast message..."
                      className="min-h-32"
                    />
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Variables: {{place}}, {{severity}}, {{eta}}</span>
                      <span>•</span>
                      <span>{message.length}/500 characters</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Severity Level</Label>
                      <Select value={severity} onValueChange={setSeverity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Information</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="alert">Alert</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Message TTL (hours)</Label>
                      <div className="px-3">
                        <Slider
                          value={ttl}
                          onValueChange={setTtl}
                          max={72}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>1h</span>
                          <span>{ttl[0]}h</span>
                          <span>72h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Targeting */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Target Audience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Targeting Method</Label>
                    <Select value={targetType} onValueChange={setTargetType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="country">Country</SelectItem>
                        <SelectItem value="state">State</SelectItem>
                        <SelectItem value="district">District</SelectItem>
                        <SelectItem value="geofence">Geofence</SelectItem>
                        <SelectItem value="radius">Radius (Lat/Lng)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {targetType === 'state' && (
                    <div className="space-y-2">
                      <Label>Select State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose state..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="mumbai">Maharashtra</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>Estimated Recipients:</strong> 2,547 tourists
                    </p>
                    <div className="text-xs text-blue-600">
                      <p>• Active tourists in selected area: 2,547</p>
                      <p>• Push notification enabled: 2,547</p>
                      <p>• SMS enabled: 2,102</p>
                      <p>• Email enabled: 1,823</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Channels & Scheduling */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Delivery Channels</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'push', label: 'Push Notification', icon: Smartphone },
                        { id: 'sms', label: 'SMS', icon: Phone },
                        { id: 'email', label: 'Email', icon: Mail },
                        { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle }
                      ].map(({ id, label, icon: Icon }) => (
                        <div key={id} className="flex items-center space-x-2">
                          <Checkbox
                            id={id}
                            checked={selectedChannels.includes(id)}
                            onCheckedChange={() => handleChannelToggle(id)}
                          />
                          <Icon className="w-4 h-4" />
                          <Label htmlFor={id} className="text-sm">{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Schedule</Label>
                    <Select value={schedule} onValueChange={setSchedule}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Send Immediately</SelectItem>
                        <SelectItem value="scheduled">Schedule for Later</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Send
                    </Button>
                    <Button className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Send Broadcast
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview & Map */}
            <div className="space-y-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Message Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">TravelSafe Alert</p>
                        <p className="text-xs text-muted-foreground">Now</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <Badge variant="outline" className={`mb-2 ${getSeverityColor(severity)}`}>
                        {severity.toUpperCase()}
                      </Badge>
                      <p className="text-sm">{message || 'Your message will appear here...'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Target Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Map className="w-4 h-4 mr-2" />
                    Target Area
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-lg overflow-hidden bg-muted h-48">
                    <img 
                      src={dashboardMap} 
                      alt="Target Area Map" 
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay highlight */}
                    <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 border-dashed" />
                    <div className="absolute bottom-2 left-2 bg-white/90 rounded px-2 py-1">
                      <p className="text-xs font-medium">Target: Maharashtra State</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTemplates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => insertTemplate(template)}
                      >
                        Use Template
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.message}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map(variable => (
                        <Badge key={variable} variant="secondary" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                Broadcast History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistory.map((broadcast, index) => (
                  <motion.div
                    key={broadcast.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getSeverityColor(broadcast.severity)}>
                          {broadcast.severity}
                        </Badge>
                        <span className="font-mono text-sm">{broadcast.id}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{broadcast.sentAt}</span>
                    </div>
                    <p className="text-sm mb-2">{broadcast.message}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Recipients: {broadcast.recipientCount?.toLocaleString()}</span>
                      <span>Channels: {broadcast.channels.join(', ')}</span>
                      <span>TTL: {broadcast.ttl}h</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Integration Console */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Integration Console</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Provider Configuration:</h4>
            <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// Webhook URLs for external providers
const providers = {
  sms: 'https://api.twilio.com/v1/messages',
  email: 'https://api.sendgrid.com/v3/mail/send',
  whatsapp: 'https://graph.facebook.com/v17.0/{phone-id}/messages',
  push: 'https://fcm.googleapis.com/fcm/send'
};

// TODO: Configure provider API keys in secrets
// TODO: Set up delivery status webhooks
// TODO: Implement message template variables
// TODO: Add A/B testing for message effectiveness`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}