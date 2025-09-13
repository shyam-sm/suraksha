import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  MapPin, 
  Smartphone,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface SettingsState {
  language: string;
  darkMode: boolean;
  locationTracking: boolean;
  panicAlerts: boolean;
  pushNotifications: boolean;
  soundAlerts: boolean;
  dataSharing: boolean;
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState>({
    language: 'en',
    darkMode: false,
    locationTracking: true,
    panicAlerts: true,
    pushNotifications: true,
    soundAlerts: true,
    dataSharing: false
  });

  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳' }
  ];

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    // Mock API call to save settings
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
      variant: "default"
    });
    setHasChanges(false);
  };

  const resetToDefaults = () => {
    setSettings({
      language: 'en',
      darkMode: false,
      locationTracking: true,
      panicAlerts: true,
      pushNotifications: true,
      soundAlerts: true,
      dataSharing: false
    });
    setHasChanges(true);
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults",
      variant: "default"
    });
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === settings.language);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Settings</h1>
          <p className="text-subtext">Customize your Tourist Portal experience</p>
        </div>
        
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex space-x-3"
          >
            <Button variant="outline" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings} className="bg-gradient-safety">
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </motion.div>
        )}
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Language</Label>
                <p className="text-sm text-subtext">Choose your preferred language for the interface</p>
              </div>
              <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                <SelectTrigger className="w-64">
                  <SelectValue>
                    <div className="flex items-center space-x-2">
                      <span>{getCurrentLanguage()?.flag}</span>
                      <span>{getCurrentLanguage()?.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      <div className="flex items-center space-x-2">
                        <span>{language.flag}</span>
                        <span>{language.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium flex items-center">
                  {settings.darkMode ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                  Dark Mode
                </Label>
                <p className="text-sm text-subtext">Toggle between light and dark themes</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => updateSetting('darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Real-time Location Tracking
                </Label>
                <p className="text-sm text-subtext">Allow authorities to track your location for safety monitoring</p>
              </div>
              <Switch
                checked={settings.locationTracking}
                onCheckedChange={(checked) => updateSetting('locationTracking', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium flex items-center">
                  {settings.dataSharing ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                  Data Sharing with Tourism Board
                </Label>
                <p className="text-sm text-subtext">Share anonymized travel data to improve tourist services</p>
              </div>
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Push Notifications
                </Label>
                <p className="text-sm text-subtext">Receive important updates and alerts on your device</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium flex items-center text-danger">
                  <Bell className="w-4 h-4 mr-2" />
                  Panic Alert Notifications
                </Label>
                <p className="text-sm text-subtext">Critical safety alerts and emergency notifications</p>
              </div>
              <Switch
                checked={settings.panicAlerts}
                onCheckedChange={(checked) => updateSetting('panicAlerts', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium flex items-center">
                  {settings.soundAlerts ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                  Sound Alerts
                </Label>
                <p className="text-sm text-subtext">Play sounds for important notifications and alerts</p>
              </div>
              <Switch
                checked={settings.soundAlerts}
                onCheckedChange={(checked) => updateSetting('soundAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Current Settings Summary */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Settings Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-subtext">Language:</span>
                <span className="font-medium">{getCurrentLanguage()?.name.split(' ')[0]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-subtext">Theme:</span>
                <span className="font-medium">{settings.darkMode ? 'Dark' : 'Light'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-subtext">Location Tracking:</span>
                <span className={`font-medium ${settings.locationTracking ? 'text-success' : 'text-warning'}`}>
                  {settings.locationTracking ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-subtext">Panic Alerts:</span>
                <span className={`font-medium ${settings.panicAlerts ? 'text-success' : 'text-danger'}`}>
                  {settings.panicAlerts ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-subtext">Notifications:</span>
                <span className={`font-medium ${settings.pushNotifications ? 'text-success' : 'text-muted-foreground'}`}>
                  {settings.pushNotifications ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-subtext">Data Sharing:</span>
                <span className={`font-medium ${settings.dataSharing ? 'text-success' : 'text-muted-foreground'}`}>
                  {settings.dataSharing ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}