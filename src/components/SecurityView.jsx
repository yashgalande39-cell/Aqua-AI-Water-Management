import { useState } from 'react';
import { ShieldAlert, Zap, Droplets, Building2, Hospital, Trees, ShoppingBag, Clock, AlertTriangle } from 'lucide-react';

function SecurityView() {
  const [emergencyMode, setEmergencyMode] = useState(false);

  return (
    <div className="view-container">
      <div className={`card mb-5 ${emergencyMode ? 'emergency-active' : ''}`} style={{ padding: '2rem' }}>
        <div className="flex-between">
          <div>
            <h2 className="flex-center gap-3">
              <ShieldAlert size={32} className={emergencyMode ? 'text-danger' : 'text-primary'} /> 
              Emergency Drought Response Mode
            </h2>
            <p className="mt-2">One-click security protocol for municipal-level water crisis management.</p>
          </div>
          <button 
            className={`tab ${emergencyMode ? 'active' : ''}`} 
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.2rem', 
              backgroundColor: emergencyMode ? 'var(--red-alert)' : 'transparent',
              borderColor: 'var(--red-alert)',
              color: emergencyMode ? 'white' : 'var(--red-alert)'
            }}
            onClick={() => setEmergencyMode(!emergencyMode)}
          >
            {emergencyMode ? 'DEACTIVATE EMERGENCY' : 'ACTIVATE PROTOCOL'}
          </button>
        </div>

        {emergencyMode && (
          <div className="mt-5 grid-cols-4 gap-4" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="card bg-danger flex-center flex-col text-center" style={{ border: 'none' }}>
              <Zap size={24} />
              <h3 className="mt-2">65%</h3>
              <p>Network Load Cut</p>
            </div>
            <div className="card bg-warning flex-center flex-col text-center" style={{ border: 'none' }}>
              <Clock size={24} />
              <h3 className="mt-2">12:00:00</h3>
              <p>Countdown to Reset</p>
            </div>
            <div className="card bg-primary flex-center flex-col text-center" style={{ border: 'none', gridColumn: 'span 2' }}>
              <AlertTriangle size={24} />
              <h3 className="mt-2">Critical Lines Protected</h3>
              <p>Hospitals & Fire Stations at 100% Pressure</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid-cols-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Asset Priority Grid</div>
          </div>
          <div className="priority-grid">
            <div className="priority-item high">
              <Hospital size={24} className="mx-auto mb-2 text-danger" />
              <div>Hospitals</div>
              <div className="text-danger">PRIORITY 1</div>
            </div>
            <div className="priority-item high">
              <Building2 size={24} className="mx-auto mb-2 text-danger" />
              <div>Residential</div>
              <div className="text-danger">PRIORITY 1</div>
            </div>
            <div className="priority-item medium">
              <ShoppingBag size={24} className="mx-auto mb-2 text-warning" />
              <div>Commercial</div>
              <div className="text-warning">PRIORITY 2</div>
            </div>
            <div className="priority-item low">
              <Trees size={24} className="mx-auto mb-2 text-primary" />
              <div>Public Parks</div>
              <div className="text-primary">PRIORITY 3</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Automated Restrictions</div>
          </div>
          <div className="market-list">
            {[
              { label: 'Non-Essential Irrigation', status: 'SHUT DOWN', icon: <Trees size={16} /> },
              { label: 'Public Fountains & Features', status: 'SHUT DOWN', icon: <Droplets size={16} /> },
              { label: 'Commercial HVAC Cooling', status: 'LIMIT 30%', icon: <Building2 size={16} /> },
              { label: 'Main Line Pressure', status: 'REDUCED 40%', icon: <Zap size={16} /> },
            ].map((item, i) => (
              <div key={i} className="market-row" style={{ opacity: emergencyMode ? 1 : 0.5 }}>
                <div className="flex-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <div className={emergencyMode ? 'text-danger' : 'text-slate'} style={{ fontWeight: 'bold' }}>
                  {emergencyMode ? item.status : 'MONITORING'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityView;
