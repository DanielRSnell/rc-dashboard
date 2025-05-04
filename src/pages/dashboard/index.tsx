import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { StatsCards } from "@/components/dashboard/StatsCards";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { UtilizationGrid } from "@/components/ui/utilization-grid";
import { Download, Calendar, Server, Cpu, Activity, Network } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const currentDate = new Date();
  
  // Format date range for the dashboard (current date + 14 days)
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}, ${currentDate.getFullYear()} - ${new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' })} ${new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).getDate()}, ${new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000).getFullYear()}`;

  // Define all dashboard data centrally to pass to components
  const dashboardData = {
    // Stats card data aligned with Nightcrawler context
    statsCards: [
      {
        title: 'Total Silicon Demand',
        value: 1720,
        trend: '+12.3',
        period: 'from last week',
        icon: Cpu,
        prefix: '',
        suffix: ' units',
        iconColor: 'text-white',
        iconBg: 'bg-black'
      },
      {
        title: 'Active Nodes',
        value: 148,
        trend: '+5.2',
        period: 'from last week',
        icon: Server,
        prefix: '',
        suffix: '',
        iconColor: 'text-white',
        iconBg: 'bg-black'
      },
      {
        title: 'Pending Workflows',
        value: 17,
        trend: '-8.4',
        period: 'from last week',
        icon: Activity,
        prefix: '',
        suffix: '',
        iconColor: 'text-white',
        iconBg: 'bg-black'
      },
      {
        title: 'Network Utilization',
        value: 86.5,
        trend: '+3.7',
        period: 'from last hour',
        icon: Network,
        prefix: '',
        suffix: '%',
        iconColor: 'text-white',
        iconBg: 'bg-black'
      }
    ],
    
    // Overview chart data - silicon allocation over time
    overviewChartData: {
      title: 'System Resource Utilization',
      subtitle: 'Real-time resource metrics',
      yAxisLabel: 'Bytes',
      // Resource utilization metrics
      series: [
        {
          name: 'GPU Utilization',
          color: 'rgba(56, 189, 248, 1)',
          data: [
            { month: 'Jan', value: 580 },
            { month: 'Feb', value: 620 },
            { month: 'Mar', value: 650 },
            { month: 'Apr', value: 670 },
            { month: 'May', value: 690 },
            { month: 'Jun', value: 710 },
            { month: 'Jul', value: 680 },
            { month: 'Aug', value: 640 },
            { month: 'Sep', value: 620 },
            { month: 'Oct', value: 590 },
            { month: 'Nov', value: 610 },
            { month: 'Dec', value: 660 }
          ]
        },
        {
          name: 'CPU Utilization',
          color: 'rgba(62, 207, 142, 1)',
          data: [
            { month: 'Jan', value: 390 },
            { month: 'Feb', value: 410 },
            { month: 'Mar', value: 430 },
            { month: 'Apr', value: 450 },
            { month: 'May', value: 470 },
            { month: 'Jun', value: 490 },
            { month: 'Jul', value: 480 },
            { month: 'Aug', value: 460 },
            { month: 'Sep', value: 440 },
            { month: 'Oct', value: 420 },
            { month: 'Nov', value: 430 },
            { month: 'Dec', value: 450 }
          ]
        },
        {
          name: 'Memory Utilization',
          color: 'rgba(255, 220, 50, 1)',
          data: [
            { month: 'Jan', value: 210 },
            { month: 'Feb', value: 230 },
            { month: 'Mar', value: 250 },
            { month: 'Apr', value: 270 },
            { month: 'May', value: 290 },
            { month: 'Jun', value: 310 },
            { month: 'Jul', value: 300 },
            { month: 'Aug', value: 280 },
            { month: 'Sep', value: 260 },
            { month: 'Oct', value: 240 },
            { month: 'Nov', value: 250 },
            { month: 'Dec', value: 290 }
          ]
        },
        {
          name: 'Max Memory Usage',
          color: 'rgba(255, 65, 105, 1)',
          data: [
            { month: 'Jan', value: 180 },
            { month: 'Feb', value: 190 },
            { month: 'Mar', value: 200 },
            { month: 'Apr', value: 210 },
            { month: 'May', value: 220 },
            { month: 'Jun', value: 230 },
            { month: 'Jul', value: 225 },
            { month: 'Aug', value: 215 },
            { month: 'Sep', value: 205 },
            { month: 'Oct', value: 195 },
            { month: 'Nov', value: 205 },
            { month: 'Dec', value: 215 }
          ]
        }
      ]
    },
    
    // Recent workflows data
    recentWorkflows: {
      title: 'Recent Workflows',
      subtitle: '12 workflows completed in the last hour',
      workflows: [
        {
          name: 'Training Pipeline',
          id: 'WF-7829',
          status: 'Completed',
          siliconType: 'GPU A100',
          duration: '45m 12s',
          avatarFallback: 'TP'
        },
        {
          name: 'Inference Job',
          id: 'WF-7830',
          status: 'Completed',
          siliconType: 'GPU H100',
          duration: '12m 45s',
          avatarFallback: 'IJ'
        },
        {
          name: 'Data Processing',
          id: 'WF-7831',
          status: 'Completed',
          siliconType: 'TPU v4',
          duration: '32m 18s',
          avatarFallback: 'DP'
        },
        {
          name: 'Model Evaluation',
          id: 'WF-7832',
          status: 'Completed',
          siliconType: 'GPU A100',
          duration: '28m 33s',
          avatarFallback: 'ME'
        },
        {
          name: 'Batch Prediction',
          id: 'WF-7833',
          status: 'Completed',
          siliconType: 'CPU EPYC',
          duration: '15m 07s',
          avatarFallback: 'BP'
        }
      ]
    }
  };

  return (
    <div className="p-6 h-full overflow-auto bg-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Performance Dashboard</h1>
            <p className="text-gray-400 mt-1">Silicon allocation and workflow monitoring</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <Button variant="outline" className="bg-transparent border border-gray-700 text-white hover:bg-gray-800/50 ">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <StatsCards stats={dashboardData.statsCards} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-4"
          >
            <OverviewChart chartData={dashboardData.overviewChartData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-3"
          >
            <RecentSales workflowData={dashboardData.recentWorkflows} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <UtilizationGrid />
        </motion.div>
      </motion.div>
    </div>
  );
}
