import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, User, Shield, Bell, Database, Cloud, RefreshCw, Plus } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="p-6 h-full overflow-auto bg-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
            <p className="text-muted-foreground">Manage your account and system preferences</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="default" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  <div>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription className="text-gray-400">Manage your personal information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Alex Johnson" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="alex.johnson@example.com" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="ML Research Lead" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team">Team</Label>
                    <Select defaultValue="team-1">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="team-1">ML Research</SelectItem>
                        <SelectItem value="team-2">Infrastructure</SelectItem>
                        <SelectItem value="team-3">Data Science</SelectItem>
                        <SelectItem value="team-4">Production AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    rows={3} 
                    className="w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
                    defaultValue="Machine learning researcher specializing in large language models and multimodal systems."
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-400" />
                  <div>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription className="text-gray-400">Customize your dashboard experience</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-gray-400">Use dark theme across the application</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-refresh Dashboard</Label>
                    <p className="text-sm text-gray-400">Automatically refresh dashboard data</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Refresh Interval (seconds)</Label>
                    <span className="text-sm text-gray-400">30s</span>
                  </div>
                  <Slider defaultValue={[30]} max={120} step={5} className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                      <SelectItem value="utc+9">Japan Standard Time (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <div>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription className="text-gray-400">Manage your account security</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Session Timeout</Label>
                      <p className="text-sm text-gray-400">Automatically log out after inactivity</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <Label>Timeout Duration (minutes)</Label>
                      <span className="text-sm text-gray-400">30m</span>
                    </div>
                    <Slider defaultValue={[30]} max={120} step={5} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <div>
                    <CardTitle>Access Logs</CardTitle>
                    <CardDescription className="text-gray-400">Recent account activity</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Dashboard Login</p>
                        <p className="text-sm text-gray-400">IP: 192.168.1.105</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Today, 10:15 AM</p>
                        <p className="text-xs text-green-400">Successful</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Password Changed</p>
                        <p className="text-sm text-gray-400">IP: 192.168.1.105</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Yesterday, 3:42 PM</p>
                        <p className="text-xs text-green-400">Successful</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">API Access</p>
                        <p className="text-sm text-gray-400">IP: 203.0.113.42</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">May 2, 9:30 AM</p>
                        <p className="text-xs text-green-400">Successful</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-400" />
                  <div>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription className="text-gray-400">Manage how you receive notifications</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Browser Notifications</Label>
                      <p className="text-sm text-gray-400">Receive notifications in your browser</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Mobile Notifications</Label>
                      <p className="text-sm text-gray-400">Receive notifications on your mobile device</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-3">Notification Types</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Workflow Status Changes</Label>
                        <p className="text-sm text-gray-400">When workflows start, complete, or fail</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Resource Alerts</Label>
                        <p className="text-sm text-gray-400">When resource utilization exceeds thresholds</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Team Updates</Label>
                        <p className="text-sm text-gray-400">When team members are added or removed</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">System Maintenance</Label>
                        <p className="text-sm text-gray-400">Scheduled maintenance and updates</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  <div>
                    <CardTitle>Resource Management</CardTitle>
                    <CardDescription className="text-gray-400">Configure resource allocation and quotas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Default Silicon Allocation</Label>
                      <span className="text-sm text-gray-400">70%</span>
                    </div>
                    <Slider defaultValue={[70]} max={100} step={5} className="w-full" />
                    <p className="text-sm text-gray-400">Percentage of team's silicon resources allocated by default to new workflows</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Default Workflow Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pool">Default Compute Pool</Label>
                    <Select defaultValue="research">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select pool" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="production">Production Cluster</SelectItem>
                        <SelectItem value="development">Development Cluster</SelectItem>
                        <SelectItem value="research">Research Cluster</SelectItem>
                        <SelectItem value="testing">Testing Cluster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-3">Resource Quotas</h3>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="gpu-quota">GPU Quota (hours/month)</Label>
                      <Input id="gpu-quota" type="number" defaultValue="500" className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cpu-quota">CPU Quota (hours/month)</Label>
                      <Input id="cpu-quota" type="number" defaultValue="1000" className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="storage-quota">Storage Quota (GB)</Label>
                      <Input id="storage-quota" type="number" defaultValue="2000" className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Auto-scale Resources</Label>
                        <p className="text-sm text-gray-400">Automatically scale resources based on demand</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-400" />
                  <div>
                    <CardTitle>External Integrations</CardTitle>
                    <CardDescription className="text-gray-400">Connect with external services and APIs</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                        <span className="font-bold text-blue-400">GC</span>
                      </div>
                      <div>
                        <p className="font-medium">Google Cloud</p>
                        <p className="text-sm text-gray-400">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                        <span className="font-bold text-blue-400">AWS</span>
                      </div>
                      <div>
                        <p className="font-medium">Amazon Web Services</p>
                        <p className="text-sm text-gray-400">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <span className="font-bold text-gray-400">AZ</span>
                      </div>
                      <div>
                        <p className="font-medium">Azure</p>
                        <p className="text-sm text-gray-400">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                        <span className="font-bold text-blue-400">SL</span>
                      </div>
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-gray-400">Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-3">API Keys</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gray-800">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Production API Key</p>
                          <p className="text-sm text-gray-400">Created: May 1, 2025</p>
                        </div>
                        <Badge variant="outline" className="bg-green-900 text-green-400 border-green-700">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Input value="••••••••••••••••••••••••" disabled className="bg-gray-700 border-gray-600 text-gray-400" />
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950">
                          Revoke
                        </Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Generate New API Key
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
