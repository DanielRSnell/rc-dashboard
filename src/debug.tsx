import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Simple component to test mounting
function DebugComponent() {
  console.log('Debug component rendered');
  return <div>Debug Component Mounted Successfully</div>;
}

// Try to mount the debug component
try {
  console.log('Attempting to mount debug component');
  const rootElement = document.getElementById('root');
  console.log('Root element:', rootElement);
  
  if (rootElement) {
    const root = createRoot(rootElement);
    console.log('Root created');
    
    root.render(
      <StrictMode>
        <DebugComponent />
      </StrictMode>
    );
    console.log('Render called');
  } else {
    console.error('Root element not found');
  }
} catch (error) {
  console.error('Error mounting debug component:', error);
}
