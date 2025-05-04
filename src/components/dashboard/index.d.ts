// Type declarations for dashboard components

declare module '../../components/dashboard/StatsCards' {
  interface StatCardProps {
    title: string;
    value: number;
    trend: string;
    period: string;
    icon: any;
    prefix: string;
    suffix: string;
    iconColor: string;
    iconBg: string;
  }

  interface StatsCardsProps {
    stats: StatCardProps[];
  }

  export function StatsCards(props: StatsCardsProps): JSX.Element;
}

declare module '../../components/dashboard/OverviewChart' {
  interface ChartDataPoint {
    month: string;
    value: number;
  }

  interface ChartSeries {
    name: string;
    color: string;
    data: ChartDataPoint[];
  }

  interface ChartData {
    title: string;
    subtitle: string;
    yAxisLabel: string;
    series: ChartSeries[];
  }

  interface OverviewChartProps {
    chartData: ChartData;
  }

  export function OverviewChart(props: OverviewChartProps): JSX.Element;
}

declare module '../../components/dashboard/RecentSales' {
  interface WorkflowItem {
    name: string;
    id: string;
    status: string;
    siliconType: string;
    duration: string;
    avatarFallback: string;
  }

  interface WorkflowData {
    title: string;
    subtitle: string;
    workflows: WorkflowItem[];
  }

  interface RecentSalesProps {
    workflowData: WorkflowData;
  }

  export function RecentSales(props: RecentSalesProps): JSX.Element;
}

declare module '../../components/ui/utilization-grid' {
  export function UtilizationGrid(): JSX.Element;
}
