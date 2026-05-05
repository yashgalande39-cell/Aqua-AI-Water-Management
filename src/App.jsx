import { useMemo, useState } from 'react';
import { 
  Activity, Droplets, LayoutDashboard, ActivitySquare, AlertTriangle, Menu, X, CloudRain,
  Wallet, Wrench, ShieldAlert, Trophy, Database
} from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DashboardView from './components/DashboardView';
import FlowVisualization from './components/FlowVisualization';
import AIInsights from './components/AIInsights';
import Architecture from './components/Architecture';
import EconomyView from './components/EconomyView';
import MaintenanceView from './components/MaintenanceView';
import SecurityView from './components/SecurityView';
import CommunityView from './components/CommunityView';
import DatabaseExplorer from './components/DatabaseExplorer';
import AquaGPT from './components/AquaGPT';
import { IoTProvider, useTelemetryData } from './context/IoTContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';

function AppContent() {
  const data = useTelemetryData();
  const { showNotification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activePath = location.pathname;

  const navItems = useMemo(
    () => [
      { path: '/dashboard', label: 'Smart Dashboard', icon: <LayoutDashboard className="nav-icon" /> },
      { path: '/flow', label: 'System Flow Schematic', icon: <Activity className="nav-icon" /> },
      { path: '/insights', label: 'AI Efficiency Engine', icon: <ActivitySquare className="nav-icon" /> },
      { path: '/database', label: 'Database Explorer', icon: <Database className="nav-icon" /> },
      { path: '/economy', label: 'Water Credit Market', icon: <Wallet className="nav-icon" /> },
      { path: '/maintenance', label: 'Predictive Queue', icon: <Wrench className="nav-icon" /> },
      { path: '/security', label: 'Emergency Protocol', icon: <ShieldAlert className="nav-icon" /> },
      { path: '/community', label: 'Impact & Rankings', icon: <Trophy className="nav-icon" /> },
      { path: '/architecture', label: 'System Architecture', icon: <CloudRain className="nav-icon" /> },
    ],
    [],
  );

  const renderContent = () => {
    switch (activePath) {
      case '/':
        return <Navigate to="/dashboard" replace />;
      case '/dashboard':
        return <DashboardView />;
      case '/flow':
        return <FlowVisualization />;
      case '/insights':
        return <AIInsights />;
      case '/database':
        return <DatabaseExplorer />;
      case '/economy':
        return <EconomyView />;
      case '/maintenance':
        return <MaintenanceView />;
      case '/security':
        return <SecurityView />;
      case '/community':
        return <CommunityView />;
      case '/architecture':
        return <Architecture />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Toggle */}
      <button
        type="button"
        className="mobile-toggle"
        aria-label={sidebarOpen ? 'Close sidebar menu' : 'Open sidebar menu'}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <Droplets className="logo-icon" size={32} />
          <div className="logo-text">AquaAI</div>
        </div>

        <nav className="nav-menu">
          {navItems.map(item => (
            <button
              type="button"
              key={item.path}
              className={`nav-item ${activePath === item.path ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="user-profile mt-5">
          <div className="avatar">A</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Admin Portal</div>
            <div style={{ color: 'var(--slate)', fontSize: '0.8rem' }}>Society Management</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="flex-between mb-4">
          <div>
            <h1>AquaAI Conservation System</h1>
            <div className="tagline">
              <Droplets size={16} />
              Every Drop Counts – Intelligent Water for Smarter Living
              <Droplets size={16} />
            </div>
          </div>
          <div className="card flex-center gap-3" style={{ padding: '0.5rem 1rem', borderRadius: '30px' }}>
            <button
              type="button"
              className="status-chip"
              onClick={() => showNotification('System Diagnostic: All sensors operational. Next sync in 45s.', 'info')}
              aria-label="Show system diagnostic status"
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', boxShadow: '0 0 10px var(--primary-green)' }}></div>
              <span>IoT Sync: {data.lastSync}</span>
            </button>
            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }}></div>
            <button
              type="button"
              className="status-chip"
              style={{ position: 'relative' }}
              onClick={() => showNotification('Recent alerts: Unusual flow in Block B, filter maintenance due in 4 days.', 'warning')}
              aria-label="Show recent alerts"
            >
              <AlertTriangle size={18} color="var(--slate)" />
              <div className="pulse-dot"></div>
            </button>
          </div>
        </header>

        {renderContent()}

        {/* AI Assistant Overlay */}
        <AquaGPT />
      </main>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <IoTProvider>
        <AppContent />
      </IoTProvider>
    </NotificationProvider>
  );
}

export default App;
