import { useAuthStore } from './lib/store/auth'
import { Sidebar } from './components/sidebar'
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'

// Import pages
import Dashboard from './pages/dashboard/index'
import Login from './pages/login/index'
import Pools from './pages/pools/index'
import Silicon from './pages/silicon/index'
import Teams from './pages/teams/index'
import Workflow from './pages/workflow/index'
import Settings from './pages/settings/index'

// Protected route component
const ProtectedRoute = () => {
  const { checkAuth } = useAuthStore()
  const location = useLocation()
  const isAuthenticated = checkAuth()

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

// Public route component
const PublicRoute = () => {
  const { checkAuth } = useAuthStore()
  const location = useLocation()
  const isAuthenticated = checkAuth()
  
  // Get the intended destination from state, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard'

  if (isAuthenticated) {
    // Redirect to the intended destination if authenticated
    return <Navigate to={from} replace />
  }

  return <Outlet />
}

function App() {
  return (
    <div className="bg-background text-foreground antialiased">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pools" element={<Pools />} />
            <Route path="/silicon" element={<Silicon />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
