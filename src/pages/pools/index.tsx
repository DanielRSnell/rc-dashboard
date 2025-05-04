import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Plus, RefreshCw, Filter, Search, ArrowUpDown, Eye, Settings } from 'lucide-react';

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for pools
  const [pools] = useState([
    {
      id: 'pool-1',
      name: 'Production Cluster',
      status: 'Active',
      nodes: 32,
      utilization: 87,
      silicon: ['GPU A100', 'CPU EPYC'],
      region: 'US-West'
    },
    {
      id: 'pool-2',
      name: 'Development Cluster',
      status: 'Active',
      nodes: 16,
      utilization: 42,
      silicon: ['GPU RTX', 'CPU Xeon'],
      region: 'US-East'
    },
    {
      id: 'pool-3',
      name: 'Staging Cluster',
      status: 'Maintenance',
      nodes: 8,
      utilization: 0,
      silicon: ['GPU V100', 'CPU Xeon'],
      region: 'Europe'
    },
    {
      id: 'pool-4',
      name: 'Testing Cluster',
      status: 'Active',
      nodes: 8,
      utilization: 62,
      silicon: ['GPU A100', 'CPU EPYC'],
      region: 'Asia-Pacific'
    }
  ]);

  // Filter pools based on search query
  const filteredPools = pools.filter(pool => 
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.region.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-3xl font-bold tracking-tight text-white">Compute Pools</h1>
              <p className="text-gray-400 mt-1">Manage your silicon resource pools</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800/50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Pool
              </Button>
            </div>
          </header>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle><span className="text-gray-100">Resource Pools</span></CardTitle>
                  <CardDescription>
                    View and manage your compute resource pools
                  </CardDescription>
                </div>
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList className="bg-gray-800/50">
                    <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">All Pools</TabsTrigger>
                    <TabsTrigger value="active" className="data-[state=active]:bg-gray-700">Active</TabsTrigger>
                    <TabsTrigger value="maintenance" className="data-[state=active]:bg-gray-700">Maintenance</TabsTrigger>
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
                    placeholder="Search pools..."
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
              </motion.div>
              
              <Tabs defaultValue="all" className="space-y-4">
                <TabsContent value="all" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {filteredPools.length > 0 ? (
                    filteredPools.map((pool, index) => (
                      <motion.div
                        key={pool.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                      >
                        <Card className="bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2 p-2 rounded-full bg-gray-800/80">
                                  <Server className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{pool.name}</CardTitle>
                                  <CardDescription className="text-gray-400">ID: {pool.id}</CardDescription>
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                pool.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                              }`}>
                                {pool.status}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Nodes</span>
                                <span className="font-medium text-white">{pool.nodes}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Utilization</span>
                                <span className="font-medium text-white">{pool.utilization}%</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Region</span>
                                <span className="font-medium text-white">{pool.region}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Silicon</span>
                                <span className="font-medium text-white truncate" title={pool.silicon.join(', ')}>
                                  {pool.silicon.join(', ')}
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
                      No pools found. Try adjusting your search.
                    </motion.div>
                  )}
                  </div>
                </TabsContent>
                
                <TabsContent value="active" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredPools.filter(pool => pool.status === 'Active').map((pool, index) => (
                      <motion.div
                        key={pool.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                      >
                        <Card className="bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2 p-2 rounded-full bg-gray-800/80">
                                  <Server className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{pool.name}</CardTitle>
                                  <CardDescription className="text-gray-400">ID: {pool.id}</CardDescription>
                                </div>
                              </div>
                              <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                                {pool.status}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Nodes</span>
                                <span className="font-medium text-white">{pool.nodes}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Utilization</span>
                                <span className="font-medium text-white">{pool.utilization}%</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Region</span>
                                <span className="font-medium text-white">{pool.region}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Silicon</span>
                                <span className="font-medium text-white truncate" title={pool.silicon.join(', ')}>
                                  {pool.silicon.join(', ')}
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
                
                <TabsContent value="maintenance" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredPools.filter(pool => pool.status === 'Maintenance').map((pool, index) => (
                      <motion.div
                        key={pool.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                      >
                        <Card className="bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2 p-2 rounded-full bg-gray-800/80">
                                  <Server className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{pool.name}</CardTitle>
                                  <CardDescription className="text-gray-400">ID: {pool.id}</CardDescription>
                                </div>
                              </div>
                              <div className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
                                {pool.status}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Nodes</span>
                                <span className="font-medium text-white">{pool.nodes}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Utilization</span>
                                <span className="font-medium text-white">{pool.utilization}%</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Region</span>
                                <span className="font-medium text-white">{pool.region}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 mb-1">Silicon</span>
                                <span className="font-medium text-white truncate" title={pool.silicon.join(', ')}>
                                  {pool.silicon.join(', ')}
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
                <p className="text-center font-medium text-white">Create New Resource Pool</p>
                <p className="text-center text-sm text-gray-400 mt-1">Configure a new compute resource pool for your workloads</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
