import React, { useState } from 'react';
import { 
  Activity, Droplets, LayoutDashboard, Settings, 
  Users, ActivitySquare, AlertTriangle, Menu, X, BarChart3, CloudRain,
  Wallet, Wrench, ShieldAlert, Trophy, Database
} from 'lucide-react';
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
import { IoTProvider, useIoT } from './context/IoTContext';

function AppContent() {
  const { data } = useIoT();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Smart Dashboard', icon: <LayoutDashboard className="nav-icon" /> },
    { id: 'flow', label: 'System Flow Schematic', icon: <Activity className="nav-icon" /> },
    { id: 'insights', label: 'AI Efficiency Engine', icon: <ActivitySquare className="nav-icon" /> },
    { id: 'database', label: 'Database Explorer', icon: <Database className="nav-icon" /> },
    { id: 'economy', label: 'Water Credit Market', icon: <Wallet className="nav-icon" /> },
    { id: 'maintenance', label: 'Predictive Queue', icon: <Wrench className="nav-icon" /> },
    { id: 'security', label: 'Emergency Protocol', icon: <ShieldAlert className="nav-icon" /> },
    { id: 'community', label: 'Impact & Rankings', icon: <Trophy className="nav-icon" /> },
    { id: 'architecture', label: 'System Architecture', icon: <CloudRain className="nav-icon" /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'flow': return <FlowVisualization />;
      case 'insights': return <AIInsights />;
      case 'database': return <DatabaseExplorer />;
      case 'economy': return <EconomyView />;
      case 'maintenance': return <MaintenanceView />;
      case 'security': return <SecurityView />;
      case 'community': return <CommunityView />;
      case 'architecture': return <Architecture />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Toggle */}
      <button 
        className="mobile-toggle"
        style={{ display: 'none' }}
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
            <div 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
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
            <div className="flex-center gap-2" style={{ cursor: 'pointer' }} onClick={() => alert('System Diagnostic: All sensors operational. Next sync in 45s.')}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', boxShadow: '0 0 10px var(--primary-green)' }}></div>
              <span>IoT Sync: {data.lastSync}</span>
            </div>
            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }}></div>
            <div className="flex-center gap-2" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => alert('Recent Alerts:\n- Unusual flow in Block B\n- Filter maintenance due in 4 days')}>
              <AlertTriangle size={18} color="var(--slate)" />
              <div className="pulse-dot"></div>
            </div>
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
    <IoTProvider>
      <AppContent />
    </IoTProvider>
  );
}

export default App;
