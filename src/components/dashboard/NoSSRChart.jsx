"use client";

import React from 'react';
// dynamic import removed;

// Create a completely isolated chart component with NoSSR
const Chart = dynamic(() => import('./ChartImplementation'), {
  ssr: false,
  loading: () => (
    <div className="h-[324px] bg-black border-2 border-gray-900/30 shadow-lg rounded-lg p-6 flex items-center justify-center">
      <p className="text-white">Loading chart...</p>
    </div>
  )
});

const NoSSRChart = (props) => {
  return <Chart {...props} />;
};

export default NoSSRChart;
