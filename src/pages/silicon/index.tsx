import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Plus, RefreshCw, Filter, BarChart, Search, ArrowUpDown, Eye, Settings } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export default function SiliconPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for silicon resources
  const [siliconResources] = useState([
    {
      id: 'silicon-1',
      name: 'NVIDIA A100',
      type: 'GPU',
      total: 128,
      available: 42,
      utilization: 67,
      pools: ['Production Cluster', 'Development Cluster', 'Testing Cluster'],
      performance: 'High',
      power: '400W'
    },
    {
      id: 'silicon-2',
      name: 'NVIDIA H100',
      type: 'GPU',
      total: 64,
      available: 18,
      utilization: 72,
      pools: ['Production Cluster', 'Research Cluster'],
      performance: 'Ultra High',
      power: '700W'
    },
    {
      id: 'silicon-3',
      name: 'Google TPU v4',
      type: 'TPU',
      total: 32,
      available: 12,
      utilization: 62,
      pools: ['Production Cluster', 'Research Cluster'],
      performance: 'High',
      power: '450W'
    },
    {
      id: 'silicon-4',
      name: 'AMD EPYC',
      type: 'CPU',
      total: 256,
      available: 104,
      utilization: 59,
      pools: ['Development Cluster', 'Testing Cluster'],
      performance: 'Medium',
      power: '280W'
    }
  ]);

  // Filter silicon resources based on search query
  const filteredResources = siliconResources.filter(resource => 
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-3xl font-bold tracking-tight text-white">Silicon Resources</h1>
              <p className="text-gray-400 mt-1">Manage your compute accelerators</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800/50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Silicon
              </Button>
            </div>
          </header>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle><span className="text-gray-100">Silicon Inventory</span></CardTitle>
                  <CardDescription>
                    View and manage your silicon resources
                  </CardDescription>
                </div>
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList className="bg-gray-800/50">
                    <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">All Silicon</TabsTrigger>
                    <TabsTrigger value="gpu" className="data-[state=active]:bg-gray-700">GPU</TabsTrigger>
                    <TabsTrigger value="tpu" className="data-[state=active]:bg-gray-700">TPU</TabsTrigger>
                    <TabsTrigger value="cpu" className="data-[state=active]:bg-gray-700">CPU</TabsTrigger>
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
                    placeholder="Search silicon..."
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
                  <BarChart className="h-4 w-4" />
                </Button>
              </motion.div>
              
              <Tabs defaultValue="all" className="space-y-4">
                <TabsContent value="all" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {filteredResources.length > 0 ? (
                    filteredResources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                      >
                        <Card className="bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2 p-2 rounded-full bg-gray-800/80">
                                  <Cpu className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                                  <CardDescription className="text-gray-400">Type: {resource.type}</CardDescription>
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                resource.utilization > 80 ? 'bg-red-900/30 text-red-400' : 
                                resource.utilization > 60 ? 'bg-yellow-900/30 text-yellow-400' : 
                                'bg-green-900/30 text-green-400'
                              }`}>
                                {resource.utilization}% Used
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Availability</span>
                                <span className="font-medium text-white">{resource.available}/{resource.total} units</span>
                              </div>
                              <Progress value={(resource.available / resource.total) * 100} className="h-2 bg-gray-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Performance</span>
                                <span className="font-medium text-white">{resource.performance}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Power</span>
                                <span className="font-medium text-white">{resource.power}</span>
                              </div>
                              <div className="flex flex-col col-span-2">
                                <span className="text-gray-400 mb-1">Pools</span>
                                <span className="font-medium text-white truncate" title={resource.pools.join(', ')}>
                                  {resource.pools.join(', ')}
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
                                Configure
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
                      No silicon resources found. Try adjusting your search.
                    </motion.div>
                  )}
                  </div>
                </TabsContent>
                
                <TabsContent value="gpu" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredResources.filter(resource => resource.type === 'GPU').map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                      >
                        <Card className="bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2 p-2 rounded-full bg-gray-800/80">
                                  <Cpu className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                                  <CardDescription className="text-gray-400">Type: {resource.type}</CardDescription>
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                resource.utilization > 80 ? 'bg-red-900/30 text-red-400' : 
                                resource.utilization > 60 ? 'bg-yellow-900/30 text-yellow-400' : 
                                'bg-green-900/30 text-green-400'
                              }`}>
                                {resource.utilization}% Used
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Availability</span>
                                <span className="font-medium text-white">{resource.available}/{resource.total} units</span>
                              </div>
                              <Progress value={(resource.available / resource.total) * 100} className="h-2 bg-gray-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Performance</span>
                                <span className="font-medium text-white">{resource.performance}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Power</span>
                                <span className="font-medium text-white">{resource.power}</span>
                              </div>
                              <div className="flex flex-col col-span-2">
                                <span className="text-gray-400 mb-1">Pools</span>
                                <span className="font-medium text-white truncate" title={resource.pools.join(', ')}>
                                  {resource.pools.join(', ')}
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
                                Configure
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="tpu" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredResources.filter(resource => resource.type === 'TPU').map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                      >
                        <Card className="bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2 p-2 rounded-full bg-gray-800/80">
                                  <Cpu className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                                  <CardDescription className="text-gray-400">Type: {resource.type}</CardDescription>
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                resource.utilization > 80 ? 'bg-red-900/30 text-red-400' : 
                                resource.utilization > 60 ? 'bg-yellow-900/30 text-yellow-400' : 
                                'bg-green-900/30 text-green-400'
                              }`}>
                                {resource.utilization}% Used
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Availability</span>
                                <span className="font-medium text-white">{resource.available}/{resource.total} units</span>
                              </div>
                              <Progress value={(resource.available / resource.total) * 100} className="h-2 bg-gray-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Performance</span>
                                <span className="font-medium text-white">{resource.performance}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Power</span>
                                <span className="font-medium text-white">{resource.power}</span>
                              </div>
                              <div className="flex flex-col col-span-2">
                                <span className="text-gray-400 mb-1">Pools</span>
                                <span className="font-medium text-white truncate" title={resource.pools.join(', ')}>
                                  {resource.pools.join(', ')}
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
                                Configure
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="cpu" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredResources.filter(resource => resource.type === 'CPU').map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                      >
                        <Card className="bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2 p-2 rounded-full bg-gray-800/80">
                                  <Cpu className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                                  <CardDescription className="text-gray-400">Type: {resource.type}</CardDescription>
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                resource.utilization > 80 ? 'bg-red-900/30 text-red-400' : 
                                resource.utilization > 60 ? 'bg-yellow-900/30 text-yellow-400' : 
                                'bg-green-900/30 text-green-400'
                              }`}>
                                {resource.utilization}% Used
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Availability</span>
                                <span className="font-medium text-white">{resource.available}/{resource.total} units</span>
                              </div>
                              <Progress value={(resource.available / resource.total) * 100} className="h-2 bg-gray-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Performance</span>
                                <span className="font-medium text-white">{resource.performance}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Power</span>
                                <span className="font-medium text-white">{resource.power}</span>
                              </div>
                              <div className="flex flex-col col-span-2">
                                <span className="text-gray-400 mb-1">Pools</span>
                                <span className="font-medium text-white truncate" title={resource.pools.join(', ')}>
                                  {resource.pools.join(', ')}
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
                                Configure
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
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
                  <Plus className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-center font-medium text-white">Add New Silicon</p>
                <p className="text-center text-sm text-gray-400 mt-1">Configure new silicon resources for your workloads</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
