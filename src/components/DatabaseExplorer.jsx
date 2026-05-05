import { useState } from 'react';
import { Database, Search, Download, Filter, Clock, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import { useIoT } from '../context/IoTContext';

function DatabaseExplorer() {
  const { data, history } = useIoT();
  const [searchTerm, setSearchTerm] = useState('');

  const tableStats = [
    { name: 'sensor_telemetry', rows: '1.2M+', size: '450 MB', status: 'Live' },
    { name: 'usage_history', rows: '45,200', size: '12 MB', status: 'Active' },
    { name: 'system_alerts', rows: '128', size: '256 KB', status: 'Active' },
    { name: 'users', rows: '1,240', size: '1.2 MB', status: 'Protected' }
  ];

  return (
    <div className="view-container">
      <div className="flex-between mb-4">
        <div>
          <h2>Database Explorer & System Logs</h2>
          <p className="text-slate" style={{ fontSize: '0.8rem' }}>Direct interface to AquaAI PostgreSQL Neural Store</p>
        </div>
        <div className="flex-center gap-2">
          <button className="tab flex-center gap-2" style={{ background: 'rgba(0, 240, 255, 0.1)' }}>
            <Download size={14} /> Export SQL
          </button>
          <button className="tab active flex-center gap-2">
            <Activity size={14} /> Live Stream
          </button>
        </div>
      </div>

      <div className="grid-cols-4 mb-4">
        {tableStats.map(table => (
          <div key={table.name} className="card" style={{ cursor: 'pointer' }}>
            <div className="flex-between mb-2">
              <Database size={18} className="text-primary" />
              <div style={{ fontSize: '0.6rem', padding: '2px 6px', background: 'rgba(0, 255, 136, 0.1)', color: 'var(--primary-green)', borderRadius: '10px' }}>{table.status}</div>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{table.name}</div>
            <div className="flex-between mt-2" style={{ fontSize: '0.7rem', color: 'var(--slate)' }}>
              <span>Rows: {table.rows}</span>
              <span>Size: {table.size}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Connection Status */}
        <div className="flex flex-col gap-4">
          <div className="card">
            <div className="card-title mb-3">Connection Metadata</div>
            <div className="flex flex-col gap-3">
              <div className="flex-between" style={{ fontSize: '0.8rem' }}>
                <span className="text-slate">Host:</span>
                <code className="text-primary">neural-store.aquaai.internal</code>
              </div>
              <div className="flex-between" style={{ fontSize: '0.8rem' }}>
                <span className="text-slate">Port:</span>
                <code className="text-primary">5432 (PostgreSQL)</code>
              </div>
              <div className="flex-between" style={{ fontSize: '0.8rem' }}>
                <span className="text-slate">Uptime:</span>
                <span className="text-success">99.99% (342 days)</span>
              </div>
              <div className="flex-between" style={{ fontSize: '0.8rem' }}>
                <span className="text-slate">Encryption:</span>
                <span className="flex-center gap-1 text-success"><ShieldCheck size={14} /> AES-256</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: 'rgba(255, 153, 0, 0.05)', borderColor: 'var(--orange-warn)' }}>
            <div className="card-title text-warning mb-2">Query Performance</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--slate)' }}>Avg. response time for telemetry index:</div>
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>14ms</div>
            <div className="mt-2" style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--orange-warn)' }}></div>
            </div>
          </div>
        </div>

        {/* Live Query Console */}
        <div className="card">
          <div className="flex-between mb-4">
            <div className="card-title">Live Telemetry Log (sensor_telemetry)</div>
            <div className="flex-center gap-2">
              <div className="search-bar" style={{ width: '200px' }}>
                <Search size={14} className="text-slate" />
                <input 
                  type="text" 
                  placeholder="Filter by device_id..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '0.8rem', width: '100%' }}
                />
              </div>
              <Filter size={18} className="text-slate" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--dark-blue)', zIndex: 5 }}>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px' }}>Timestamp</th>
                  <th style={{ padding: '12px' }}>Device</th>
                  <th style={{ padding: '12px' }}>Reading</th>
                  <th style={{ padding: '12px' }}>Value</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Simulated Live Row */}
                <tr style={{ background: 'rgba(0, 240, 255, 0.05)', color: 'var(--primary-blue)' }}>
                  <td style={{ padding: '12px' }}><Clock size={12} className="inline mr-2" /> {data.lastSync}</td>
                  <td style={{ padding: '12px' }}><code>FLOW_METER_01</code></td>
                  <td style={{ padding: '12px' }}>Flow Rate</td>
                  <td style={{ padding: '12px' }}>{data.municipalFlow} L/m</td>
                  <td style={{ padding: '12px' }}><span className="status-badge success">Ingested</span></td>
                </tr>
                {/* Historical Rows */}
                {history.slice().reverse().map((entry, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px' }}>{entry.time}</td>
                    <td style={{ padding: '12px' }}><code>SENSE_RES_{idx + 10}</code></td>
                    <td style={{ padding: '12px' }}>Consumption</td>
                    <td style={{ padding: '12px' }}>{entry.usage} L</td>
                    <td style={{ padding: '12px' }}><span className="status-badge neutral" style={{ opacity: 0.6 }}>Stored</span></td>
                  </tr>
                ))}
                {/* Placeholder for more data */}
                {[...Array(5)].map((_, i) => (
                  <tr key={`p-${i}`} style={{ opacity: 0.3 }}>
                    <td style={{ padding: '12px' }}>--:--:--</td>
                    <td style={{ padding: '12px' }}><code>SYSTEM_ID_{i}</code></td>
                    <td style={{ padding: '12px' }}>Telemetry</td>
                    <td style={{ padding: '12px' }}>--</td>
                    <td style={{ padding: '12px' }}>Pending...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex-center mt-4 text-slate" style={{ fontSize: '0.7rem', gap: '0.5rem' }}>
            <Activity size={12} /> Live tailing 12 active streams... <ChevronRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatabaseExplorer;
