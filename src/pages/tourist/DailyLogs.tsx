import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Smartphone,
  Globe,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface SafetyLog {
  id: string;
  timestamp: string;
  type: 'login' | 'location' | 'ai_checkin' | 'manual_checkin';
  status: 'safe' | 'attention' | 'info';
  description: string;
  location?: string;
  platform?: 'web' | 'mobile';
}

export default function DailyLogs() {
  const [logs, setLogs] = useState<SafetyLog[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      type: 'login',
      status: 'info',
      description: 'Logged in to Tourist Portal',
      platform: 'web'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: 'ai_checkin',
      status: 'safe',
      description: 'AI Safety Check: All parameters normal',
      location: 'Red Fort, Delhi'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      type: 'location',
      status: 'info',
      description: 'Location updated',
      location: 'Connaught Place, Delhi'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      type: 'manual_checkin',
      status: 'safe',
      description: 'Manual safety check-in',
      location: 'India Gate, Delhi'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      type: 'ai_checkin',
      status: 'attention',
      description: 'AI Safety Check: Unusual activity pattern detected',
      location: 'Chandni Chowk, Delhi'
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleManualCheckin = () => {
    const newLog: SafetyLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'manual_checkin',
      status: 'safe',
      description: 'Manual safety check-in confirmed',
      location: 'Current Location'
    };

    setLogs(prev => [newLog, ...prev]);
    
    toast({
      title: "Safety Check-in Recorded",
      description: "Your safety status has been updated",
      variant: "default"
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add a new AI check-in log
    const newLog: SafetyLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'ai_checkin',
      status: 'safe',
      description: 'AI Safety Check: Status refreshed - All clear',
      location: 'Current Location'
    };

    setLogs(prev => [newLog, ...prev]);
    setIsRefreshing(false);
    
    toast({
      title: "Status Refreshed",
      description: "Latest safety data updated",
      variant: "default"
    });
  };

  const getLogIcon = (log: SafetyLog) => {
    switch (log.type) {
      case 'login':
        return log.platform === 'web' ? 
          <Globe className="w-4 h-4" /> : 
          <Smartphone className="w-4 h-4" />;
      case 'location':
        return <MapPin className="w-4 h-4" />;
      case 'ai_checkin':
        return <Shield className="w-4 h-4" />;
      case 'manual_checkin':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'attention':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'safe':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Safe</Badge>;
      case 'attention':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Attention</Badge>;
      default:
        return <Badge variant="secondary" className="bg-muted/50 text-muted-foreground">Info</Badge>;
    }
  };

  const getLogTypeTitle = (type: string) => {
    switch (type) {
      case 'login':
        return 'Login Activity';
      case 'location':
        return 'Location Update';
      case 'ai_checkin':
        return 'AI Safety Check';
      case 'manual_checkin':
        return 'Manual Check-in';
      default:
        return 'Activity';
    }
  };

  if (logs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="space-y-4">
            <Shield className="w-16 h-16 mx-auto text-muted-foreground" />
            <div>
              <h1 className="text-2xl font-bold text-heading mb-2">No Logs Yet</h1>
              <p className="text-subtext">Start your trip to see daily safety updates and activity logs</p>
            </div>
          </div>

          <Button 
            onClick={handleManualCheckin}
            size="lg" 
            className="bg-gradient-safety hover:bg-secondary-hover transition-smooth shadow-elevated"
          >
            <UserCheck className="w-5 h-5 mr-2" />
            Mark Myself Safe
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-heading">Daily Safety Logs</h1>
          <p className="text-subtext">AI-driven safety monitoring and check-ins</p>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            onClick={handleRefresh}
            variant="outline"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
          </Button>
          
          <Button onClick={handleManualCheckin}>
            <UserCheck className="w-4 h-4 mr-2" />
            Mark Myself Safe
          </Button>
        </div>
      </div>

      {/* Current Status Card */}
      <Card className="border-success/20 bg-success/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <CardTitle className="text-lg">Current Status: Safe</CardTitle>
                <p className="text-sm text-subtext">Last updated: {format(new Date(), 'PPP p')}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              All Clear
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-subtext">
            AI monitoring active • Location tracking enabled • Emergency contacts notified of status
          </p>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-heading">Activity Timeline</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
          
          <AnimatePresence>
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative flex items-start space-x-4 pb-6"
              >
                {/* Timeline dot */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-card shadow-sm flex items-center justify-center">
                    {getLogIcon(log)}
                  </div>
                  {log.status === 'attention' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full animate-pulse"></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Card className="hover:shadow-elevated transition-smooth">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(log.status)}
                          <div>
                            <CardTitle className="text-base">{getLogTypeTitle(log.type)}</CardTitle>
                            <p className="text-sm text-subtext">{log.description}</p>
                          </div>
                        </div>
                        {getStatusBadge(log.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-subtext">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{format(new Date(log.timestamp), 'PPP p')}</span>
                          </div>
                          {log.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{log.location}</span>
                            </div>
                          )}
                        </div>
                        {log.platform && (
                          <Badge variant="outline" className="text-xs">
                            {log.platform === 'web' ? 'Web Portal' : 'Mobile App'}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Auto-refresh notice */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 text-sm text-subtext">
            <RefreshCw className="w-4 h-4" />
            <span>Status automatically refreshes on each login • Manual check-ins help maintain accurate safety records</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}