// dynamic import removed;

// Import the chart component with SSR explicitly disabled
// This ensures it only renders on the client side
const ClientChart = dynamic(
  () => import('./ChartComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[324px] bg-black border-2 border-gray-900/30 shadow-lg rounded-lg p-6 flex items-center justify-center">
        <p className="text-white">Loading chart...</p>
      </div>
    )
  }
);

export default ClientChart;
