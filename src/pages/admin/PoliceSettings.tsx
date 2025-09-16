import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Shield, 
  Users,
  AlertTriangle,
  Clock,
  Mail,
  Phone,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface NotificationSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  alertPsychology: string;
  escalationTime: number;
}

interface EscalationRule {
  id: string;
  condition: string;
  action: string;
  timeLimit: number;
  priority: string;
}

interface RolePermission {
  role: string;
  permissions: {
    viewIncidents: boolean;
    createIncidents: boolean;
    assignOfficers: boolean;
    escalateIncidents: boolean;
    viewAnalytics: boolean;
    manageStations: boolean;
    manageOfficers: boolean;
    systemSettings: boolean;
  };
}

const mockEscalationRules: EscalationRule[] = [
  {
    id: '1',
    condition: 'Panic Alert > 5 minutes unresponded',
    action: 'Auto-escalate to Inspector',
    timeLimit: 5,
    priority: 'critical'
  },
  {
    id: '2',
    condition: 'High Priority Incident > 15 minutes',
    action: 'Notify Station Commander',
    timeLimit: 15,
    priority: 'high'
  },
  {
    id: '3',
    condition: 'Tourist Emergency > 3 minutes',
    action: 'Dispatch nearest team',
    timeLimit: 3,
    priority: 'critical'
  }
];

const mockRolePermissions: RolePermission[] = [
  {
    role: 'Officer',
    permissions: {
      viewIncidents: true,
      createIncidents: true,
      assignOfficers: false,
      escalateIncidents: false,
      viewAnalytics: false,
      manageStations: false,
      manageOfficers: false,
      systemSettings: false
    }
  },
  {
    role: 'Sergeant',
    permissions: {
      viewIncidents: true,
      createIncidents: true,
      assignOfficers: true,
      escalateIncidents: true,
      viewAnalytics: true,
      manageStations: false,
      manageOfficers: false,
      systemSettings: false
    }
  },
  {
    role: 'Inspector',
    permissions: {
      viewIncidents: true,
      createIncidents: true,
      assignOfficers: true,
      escalateIncidents: true,
      viewAnalytics: true,
      manageStations: true,
      manageOfficers: true,
      systemSettings: false
    }
  },
  {
    role: 'Superintendent',
    permissions: {
      viewIncidents: true,
      createIncidents: true,
      assignOfficers: true,
      escalateIncidents: true,
      viewAnalytics: true,
      manageStations: true,
      manageOfficers: true,
      systemSettings: true
    }
  }
];

export default function PoliceSettings() {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    alertPsychology: 'immediate',
    escalationTime: 10
  });

  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>(mockEscalationRules);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(mockRolePermissions);

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean | string | number) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateRolePermission = (role: string, permission: string, value: boolean) => {
    setRolePermissions(prev =>
      prev.map(roleData =>
        roleData.role === role
          ? {
              ...roleData,
              permissions: {
                ...roleData.permissions,
                [permission]: value
              }
            }
          : roleData
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Police Panel Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and access controls</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="escalation">Escalation Rules</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alert Preferences */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Alert Preferences
                  </CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive incident notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailAlerts}
                      onCheckedChange={(value) => updateNotificationSetting('emailAlerts', value)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsAlerts}
                      onCheckedChange={(value) => updateNotificationSetting('smsAlerts', value)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(value) => updateNotificationSetting('pushNotifications', value)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Alert Psychology</Label>
                    <Select
                      value={notificationSettings.alertPsychology}
                      onValueChange={(value) => updateNotificationSetting('alertPsychology', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="batched">Batched (5 min)</SelectItem>
                        <SelectItem value="digest">Daily Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Contacts
                  </CardTitle>
                  <CardDescription>Configure emergency contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Station Commander</Label>
                    <Input placeholder="+65 6555-0001" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Emergency Services</Label>
                    <Input placeholder="+65 995" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tourist Hotline</Label>
                    <Input placeholder="+65 1800-TOURIST" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Hospital Emergency</Label>
                    <Input placeholder="+65 6321-4377" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fire Department</Label>
                    <Input placeholder="+65 995" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Email Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Templates
                </CardTitle>
                <CardDescription>Customize email notification templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Incident Alert Template</Label>
                  <Textarea
                    placeholder="New incident reported: {incident_title} at {location}. Priority: {priority}. Click here to view details."
                    className="min-h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Panic Alert Template</Label>
                  <Textarea
                    placeholder="URGENT: Panic alert from {tourist_name} at {location}. Immediate response required."
                    className="min-h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Resolution Template</Label>
                  <Textarea
                    placeholder="Incident {incident_id} has been resolved. Officer: {officer_name}. Resolution time: {duration}."
                    className="min-h-20"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="escalation" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Escalation Rules
                </CardTitle>
                <CardDescription>Define automatic escalation conditions and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {escalationRules.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Rule {index + 1}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            rule.priority === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {rule.priority}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm">Condition</Label>
                          <p className="text-sm text-muted-foreground">{rule.condition}</p>
                        </div>
                        <div>
                          <Label className="text-sm">Action</Label>
                          <p className="text-sm text-muted-foreground">{rule.action}</p>
                        </div>
                        <div>
                          <Label className="text-sm">Time Limit</Label>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{rule.timeLimit} minutes</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Add New Rule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Role-Based Access Control
                </CardTitle>
                <CardDescription>Configure permissions for different officer ranks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {rolePermissions.map((roleData, index) => (
                    <motion.div
                      key={roleData.role}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg space-y-4"
                    >
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <h4 className="text-lg font-medium">{roleData.role}</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(roleData.permissions).map(([permission, enabled]) => (
                          <div key={permission} className="flex items-center justify-between">
                            <Label className="text-sm">
                              {permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </Label>
                            <Switch
                              checked={enabled}
                              onCheckedChange={(value) => updateRolePermission(roleData.role, permission, value)}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}