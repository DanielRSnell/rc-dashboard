import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, RefreshCw, Filter, BarChart, UserPlus, Search, ArrowUpDown, Eye, Settings, Edit, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for teams
  const [teams] = useState([
    {
      id: 'team-1',
      name: 'ML Research',
      description: 'Machine learning research and development team',
      members: 12,
      lead: 'Alex Johnson',
      leadAvatar: 'AJ',
      projects: 8,
      activeWorkflows: 5,
      siliconUsage: 'High',
      pools: ['Research Cluster', 'Production Cluster']
    },
    {
      id: 'team-2',
      name: 'Infrastructure',
      description: 'Managing and optimizing compute infrastructure',
      members: 8,
      lead: 'Sam Rodriguez',
      leadAvatar: 'SR',
      projects: 5,
      activeWorkflows: 3,
      siliconUsage: 'Medium',
      pools: ['Production Cluster', 'Development Cluster']
    },
    {
      id: 'team-3',
      name: 'Data Science',
      description: 'Data processing and analytics',
      members: 15,
      lead: 'Taylor Kim',
      leadAvatar: 'TK',
      projects: 12,
      activeWorkflows: 7,
      siliconUsage: 'High',
      pools: ['Development Cluster', 'Testing Cluster']
    },
    {
      id: 'team-4',
      name: 'Production AI',
      description: 'Deploying and monitoring production AI systems',
      members: 10,
      lead: 'Jordan Smith',
      leadAvatar: 'JS',
      projects: 6,
      activeWorkflows: 9,
      siliconUsage: 'Very High',
      pools: ['Production Cluster']
    }
  ]);

  // Sample team members for the first team
  const teamMembers = [
    { name: 'Alex Johnson', role: 'Team Lead', avatar: 'AJ' },
    { name: 'Morgan Lee', role: 'Senior Researcher', avatar: 'ML' },
    { name: 'Casey Wilson', role: 'ML Engineer', avatar: 'CW' },
    { name: 'Jamie Taylor', role: 'Data Scientist', avatar: 'JT' },
    { name: 'Riley Brown', role: 'ML Engineer', avatar: 'RB' }
  ];

  // Filter teams based on search query
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.lead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full w-full bg-black">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Teams</h1>
              <p className="text-gray-400 mt-1">Manage your teams and resource allocations</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800/50">
                <BarChart className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                New Team
              </Button>
            </div>
          </header>

          <Card className="bg-background border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle><span className="text-gray-100">Team Management</span></CardTitle>
                  <CardDescription>
                    View and manage your teams and their members
                  </CardDescription>
                </div>
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList className="bg-gray-800/50">
                    <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">All Teams</TabsTrigger>
                    <TabsTrigger value="members" className="data-[state=active]:bg-gray-700">Team Members</TabsTrigger>
                    <TabsTrigger value="projects" className="data-[state=active]:bg-gray-700">Team Projects</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mb-4 flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search teams..."
                    className="pl-8 bg-gray-800/50 border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </motion.div>
              
              <Tabs defaultValue="all" className="space-y-4">
                <TabsContent value="all" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team, index) => (
                      <motion.div
                        key={team.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                      >
                        <Card className="bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2 p-2 rounded-full bg-gray-800/80">
                                  <Users className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{team.name}</CardTitle>
                                  <CardDescription className="text-gray-400">{team.description}</CardDescription>
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                team.siliconUsage === 'Very High' ? 'bg-purple-900/30 text-purple-400' :
                                team.siliconUsage === 'High' ? 'bg-blue-900/30 text-blue-400' :
                                team.siliconUsage === 'Medium' ? 'bg-green-900/30 text-green-400' :
                                'bg-yellow-900/30 text-yellow-400'
                              }`}>
                                {team.siliconUsage}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center mb-4">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-gray-800 text-blue-400">{team.leadAvatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-white">{team.lead}</p>
                                <p className="text-xs text-gray-400">Team Lead</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Members</span>
                                <span className="font-medium text-white">{team.members}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Projects</span>
                                <span className="font-medium text-white">{team.projects}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Active Workflows</span>
                                <span className="font-medium text-white">{team.activeWorkflows}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Pools</span>
                                <span className="font-medium text-white truncate" title={team.pools.join(', ')}>
                                  {team.pools.join(', ')}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Details
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                              >
                                <Settings className="mr-2 h-4 w-4" />
                                Manage
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="col-span-2 px-4 py-6 text-center text-sm text-gray-400"
                    >
                      No teams found. Try adjusting your search.
                    </motion.div>
                  )}
                  </div>
                </TabsContent>
                
                <TabsContent value="members" className="space-y-4">
                  <Card className="bg-gray-900/50 text-white border-gray-800">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-gray-100">ML Research Team Members</CardTitle>
                          <CardDescription className="text-gray-400">Manage team members and roles</CardDescription>
                        </div>
                        <Button variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800/50">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add Member
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {teamMembers.map((member, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 transition-all"
                          >
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-gray-700 text-blue-400">{member.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-white">{member.name}</p>
                                <p className="text-sm text-gray-400">{member.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="projects" className="space-y-4">
                  <Card className="bg-gray-900/50 text-white border-gray-800">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-gray-100">Team Projects</CardTitle>
                          <CardDescription className="text-gray-400">Active projects and resource allocation</CardDescription>
                        </div>
                        <Button variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800/50">
                          <Plus className="mr-2 h-4 w-4" />
                          New Project
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className="p-4 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 transition-all"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium text-white">Large Language Model Training</h3>
                              <p className="text-sm text-gray-400">ML Research Team</p>
                            </div>
                            <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                              Active
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex flex-col">
                              <span className="text-gray-400 mb-1">Silicon</span>
                              <span className="font-medium text-white">GPU H100</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-400 mb-1">Active Workflows</span>
                              <span className="font-medium text-white">3</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-400 mb-1">Pool</span>
                              <span className="font-medium text-white">Production Cluster</span>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="p-4 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 transition-all"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium text-white">Multimodal Model Development</h3>
                              <p className="text-sm text-gray-400">ML Research Team</p>
                            </div>
                            <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                              Active
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex flex-col">
                              <span className="text-gray-400 mb-1">Silicon</span>
                              <span className="font-medium text-white">GPU A100</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-400 mb-1">Active Workflows</span>
                              <span className="font-medium text-white">2</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-400 mb-1">Pool</span>
                              <span className="font-medium text-white">Research Cluster</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-gray-900/50 border-gray-800 border-dashed hover:border-gray-700 transition-all cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <div className="p-3 rounded-full bg-gray-800/80 mb-3">
                  <UserPlus className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-center font-medium text-white">Create New Team</p>
                <p className="text-center text-sm text-gray-400 mt-1">Set up a new team and assign resources</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
