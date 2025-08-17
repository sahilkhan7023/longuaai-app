import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Shield, 
  User, 
  Palette, 
  Volume2, 
  Globe,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Download,
  Upload,
  Moon,
  Sun,
  Monitor,
  Zap,
  Clock,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    streakReminders: true,
    lessonReminders: true,
    achievementNotifications: true,
    weeklyProgress: true,
    
    // Privacy
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
    
    // Learning
    dailyGoal: 30,
    reminderTime: '19:00',
    autoplay: true,
    soundEffects: true,
    voiceSpeed: 1,
    difficulty: 'adaptive',
    
    // Accessibility
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
    
    // Data
    dataSync: true,
    offlineMode: false,
    autoBackup: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would make an API call
    console.log('Saving settings:', settings);
    // Show success message
  };

  const handleExportData = () => {
    // In a real app, this would export user data
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    // In a real app, this would delete the account
    console.log('Deleting account...');
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const privacyOptions = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends Only' },
    { value: 'private', label: 'Private' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'adaptive', label: 'Adaptive' },
    { value: 'challenging', label: 'Challenging' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your learning experience and manage your account
          </p>
        </motion.div>

        {/* Settings Tabs */}
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notifications on your device</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Streak Reminders</Label>
                      <p className="text-sm text-muted-foreground">Daily reminders to maintain your streak</p>
                    </div>
                    <Switch
                      checked={settings.streakReminders}
                      onCheckedChange={(checked) => handleSettingChange('streakReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Lesson Reminders</Label>
                      <p className="text-sm text-muted-foreground">Reminders for scheduled lessons</p>
                    </div>
                    <Switch
                      checked={settings.lessonReminders}
                      onCheckedChange={(checked) => handleSettingChange('lessonReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Achievement Notifications</Label>
                      <p className="text-sm text-muted-foreground">Celebrate your accomplishments</p>
                    </div>
                    <Switch
                      checked={settings.achievementNotifications}
                      onCheckedChange={(checked) => handleSettingChange('achievementNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Weekly Progress Report</Label>
                      <p className="text-sm text-muted-foreground">Summary of your weekly learning</p>
                    </div>
                    <Switch
                      checked={settings.weeklyProgress}
                      onCheckedChange={(checked) => handleSettingChange('weeklyProgress', checked)}
                    />
                  </div>
                </div>

                {settings.lessonReminders && (
                  <div className="space-y-2">
                    <Label>Reminder Time</Label>
                    <Input
                      type="time"
                      value={settings.reminderTime}
                      onChange={(e) => handleSettingChange('reminderTime', e.target.value)}
                      className="w-32"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Who can see your profile</p>
                    <Select 
                      value={settings.profileVisibility} 
                      onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {privacyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Show Learning Progress</Label>
                      <p className="text-sm text-muted-foreground">Display your progress to others</p>
                    </div>
                    <Switch
                      checked={settings.showProgress}
                      onCheckedChange={(checked) => handleSettingChange('showProgress', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Show Achievements</Label>
                      <p className="text-sm text-muted-foreground">Display your achievements publicly</p>
                    </div>
                    <Switch
                      checked={settings.showAchievements}
                      onCheckedChange={(checked) => handleSettingChange('showAchievements', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Allow Messages</Label>
                      <p className="text-sm text-muted-foreground">Let other users send you messages</p>
                    </div>
                    <Switch
                      checked={settings.allowMessages}
                      onCheckedChange={(checked) => handleSettingChange('allowMessages', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Learning Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Daily XP Goal</Label>
                    <p className="text-sm text-muted-foreground">Set your daily learning target</p>
                    <div className="space-y-2">
                      <Slider
                        value={[settings.dailyGoal]}
                        onValueChange={(value) => handleSettingChange('dailyGoal', value[0])}
                        max={100}
                        min={10}
                        step={5}
                        className="w-64"
                      />
                      <div className="text-sm text-muted-foreground">{settings.dailyGoal} XP per day</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-base font-medium">Difficulty Level</Label>
                    <p className="text-sm text-muted-foreground">Choose your learning difficulty</p>
                    <Select 
                      value={settings.difficulty} 
                      onValueChange={(value) => handleSettingChange('difficulty', value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Autoplay Audio</Label>
                      <p className="text-sm text-muted-foreground">Automatically play pronunciation examples</p>
                    </div>
                    <Switch
                      checked={settings.autoplay}
                      onCheckedChange={(checked) => handleSettingChange('autoplay', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Sound Effects</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for interactions and achievements</p>
                    </div>
                    <Switch
                      checked={settings.soundEffects}
                      onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium">Voice Playback Speed</Label>
                    <p className="text-sm text-muted-foreground">Adjust audio playback speed</p>
                    <div className="space-y-2">
                      <Slider
                        value={[settings.voiceSpeed]}
                        onValueChange={(value) => handleSettingChange('voiceSpeed', value[0])}
                        max={2}
                        min={0.5}
                        step={0.25}
                        className="w-64"
                      />
                      <div className="text-sm text-muted-foreground">{settings.voiceSpeed}x speed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Appearance Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                    <div className="grid grid-cols-3 gap-3 w-fit">
                      {themeOptions.map(option => {
                        const Icon = option.icon;
                        return (
                          <Button
                            key={option.value}
                            variant={theme === option.value ? "default" : "outline"}
                            onClick={() => setTheme(option.value)}
                            className="flex flex-col items-center space-y-2 h-20 w-20"
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs">{option.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-base font-medium">Font Size</Label>
                    <p className="text-sm text-muted-foreground">Adjust text size for better readability</p>
                    <Select 
                      value={settings.fontSize} 
                      onValueChange={(value) => handleSettingChange('fontSize', value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontSizes.map(size => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">High Contrast</Label>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Account Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Change Password</Label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Current password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Input type="password" placeholder="New password" />
                      <Input type="password" placeholder="Confirm new password" />
                      <Button size="sm">Update Password</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Data Management</Label>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Data Sync</Label>
                        <p className="text-sm text-muted-foreground">Sync your progress across devices</p>
                      </div>
                      <Switch
                        checked={settings.dataSync}
                        onCheckedChange={(checked) => handleSettingChange('dataSync', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Offline Mode</Label>
                        <p className="text-sm text-muted-foreground">Download lessons for offline use</p>
                      </div>
                      <Switch
                        checked={settings.offlineMode}
                        onCheckedChange={(checked) => handleSettingChange('offlineMode', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Auto Backup</Label>
                        <p className="text-sm text-muted-foreground">Automatically backup your data</p>
                      </div>
                      <Switch
                        checked={settings.autoBackup}
                        onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleExportData}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Import Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base font-medium text-red-600">Danger Zone</Label>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove all your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end pb-8">
          <Button onClick={handleSaveSettings} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

