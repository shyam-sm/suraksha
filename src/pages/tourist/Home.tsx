import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gauge,
  MapPin,
  Phone,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

interface SafetyData {
  score: number;
  status: 'safe' | 'caution' | 'danger';
  location: string;
  lastUpdate: string;
}

interface SafetyTip {
  id: string;
  type: 'tip' | 'warning' | 'info';
  title: string;
  description: string;
}

const safetyTips: SafetyTip[] = [
  {
    id: '1',
    type: 'tip',
    title: 'Stay Hydrated',
    description: 'Drink plenty of water, especially in hot weather. Carry a water bottle with you.'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Weather Alert',
    description: 'Heavy rain expected in your area. Consider indoor activities for today.'
  },
  {
    id: '3',
    type: 'info',
    title: 'Local Events',
    description: 'Cultural festival happening nearby. Great photo opportunities!'
  }
];

export default function TouristHome() {
  const { user } = useAuth();
  const [safetyData, setSafetyData] = useState<SafetyData>({
    score: 92,
    status: 'safe',
    location: 'Red Fort, Delhi',
    lastUpdate: new Date().toLocaleTimeString()
  });

  // Simulate real-time safety score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSafetyData(prev => ({
        ...prev,
        score: Math.max(85, Math.min(98, prev.score + (Math.random() - 0.5) * 3)),
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getSafetyColor = (score: number) => {
    if (score >= 90) return { color: 'text-success', bg: 'bg-success' };
    if (score >= 70) return { color: 'text-warning', bg: 'bg-warning' };
    return { color: 'text-danger', bg: 'bg-danger' };
  };

  const getSafetyStatus = (score: number) => {
    if (score >= 90) return 'SAFE';
    if (score >= 70) return 'CAUTION';
    return 'DANGER';
  };

  const getTipIcon = (type: SafetyTip['type']) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'tip':
        return CheckCircle;
      case 'info':
        return Info;
      default:
        return Info;
    }
  };

  const getTipVariant = (type: SafetyTip['type']) => {
    switch (type) {
      case 'warning':
        return 'destructive';
      case 'tip':
        return 'default';
      case 'info':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const safetyColors = getSafetyColor(safetyData.score);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-heading mb-2">
          Welcome, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-subtext">
          Your safety is our priority. Here's your current safety status.
        </p>
      </motion.div>

      {/* Safety Meter - Main Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Gauge className="w-6 h-6" />
              <span>Safety Meter</span>
            </CardTitle>
            <CardDescription>Real-time safety assessment for your Trip</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            {/* Gauge Display */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-8 border-muted flex items-center justify-center bg-background">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${safetyColors.color}`}>
                      {Math.round(safetyData.score)}%
                    </div>
                    <Badge 
                      variant={safetyData.score >= 90 ? 'default' : safetyData.score >= 70 ? 'secondary' : 'destructive'}
                      className="mt-2"
                    >
                      {getSafetyStatus(safetyData.score)}
                    </Badge>
                  </div>
                </div>
                {/* Animated pulse ring */}
                <motion.div
                  className={`absolute inset-0 rounded-full border-4 ${safetyColors.bg} opacity-20`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="w-full max-w-md space-y-3">
                <Progress value={safetyData.score} className="h-3" />
                <div className="flex items-center justify-between text-sm text-subtext">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{safetyData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Updated: {safetyData.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-danger" />
                Emergency Actions
              </CardTitle>
              <CardDescription>Quick access to emergency services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full bg-gradient-alert text-danger-foreground h-12"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Panic Button
                </Button>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12">
                  <Phone className="w-4 h-4 mr-2" />
                  Police: 100
                </Button>
                <Button variant="outline" className="h-12">
                  <Phone className="w-4 h-4 mr-2" />
                  Medical: 108
                </Button>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-2">Emergency Contacts</h4>
                {user?.emergencyContacts?.map((contact, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{contact.name}</span>
                    <span className="text-subtext">{contact.phone}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety Tips & Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2 text-primary" />
                Safety Tips & Alerts
              </CardTitle>
              <CardDescription>Important information for your trip</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {safetyTips.map((tip, index) => {
                const TipIcon = getTipIcon(tip.type);
                return (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <TipIcon className={`w-5 h-5 mt-0.5 ${
                        tip.type === 'warning' ? 'text-warning' : 
                        tip.type === 'tip' ? 'text-success' : 'text-primary'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm">{tip.title}</h4>
                          <Badge variant={getTipVariant(tip.type)} className="text-xs">
                            {tip.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-subtext">{tip.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Current Location</h3>
            <p className="text-sm text-subtext">{safetyData.location}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <h3 className="font-semibold">Trip Duration</h3>
            <p className="text-sm text-subtext">Day 3 of 7</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
            <h3 className="font-semibold">Check-ins Today</h3>
            <p className="text-sm text-subtext">5 locations</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}