import { Fragment } from 'react';
import { Database, Wifi, Monitor, Server, Lock, Cpu, ArrowRight, Zap, RefreshCw, BarChart3, Activity } from 'lucide-react';

function Architecture() {
  return (
    <div className="view-container">
      <h2 className="mb-4">System Architecture & Intelligent Workflow</h2>
      
      {/* Workflow Steps Indicator */}
      <div className="flex-between mb-5 px-5">
        {[
          { step: 1, label: 'Data Acquisition', icon: <Wifi size={18} /> },
          { step: 2, label: 'Cloud Intelligence', icon: <Server size={18} /> },
          { step: 3, label: 'Real-time Action', icon: <Zap size={18} /> }
        ].map((item, idx) => (
          <Fragment key={item.step}>
            <div className="flex-center gap-3">
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: 'var(--primary-blue)', color: 'var(--dark-blue)',
                display: 'flex', alignItems: 'center', justifyCenter: 'center',
                fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 15px var(--primary-blue)'
              }} className="flex-center">
                {item.step}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 'bold', textTransform: 'uppercase' }}>Step {item.step}</div>
                <div style={{ fontWeight: '600' }}>{item.label}</div>
              </div>
            </div>
            {idx < 2 && <ArrowRight className="text-slate" size={24} style={{ opacity: 0.3 }} />}
          </Fragment>
        ))}
      </div>

      <div className="card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden', minHeight: '600px' }}>
        {/* Animated Background SVG for Workflow */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'var(--primary-blue)', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: 'var(--primary-green)', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          
          {/* Main Flow Paths */}
          <path d="M 300 200 L 450 200" stroke="var(--border-color)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <path d="M 300 350 L 450 350" stroke="var(--border-color)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <path d="M 300 500 L 450 500" stroke="var(--border-color)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          
          <path d="M 600 200 L 750 200" stroke="var(--border-color)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <path d="M 600 350 L 750 350" stroke="var(--border-color)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <path d="M 600 500 L 750 500" stroke="var(--border-color)" strokeWidth="2" fill="none" strokeDasharray="5,5" />

          {/* Feedback Loop (Action to Sensor) */}
          <path d="M 900 350 Q 1000 350 1000 100 Q 1000 -50 500 -50 Q 0 -50 0 100 Q 0 350 100 350" 
            stroke="var(--primary-green)" strokeWidth="2" fill="none" strokeDasharray="10,10" opacity="0.2">
            <animate attributeName="stroke-dashoffset" from="200" to="0" dur="10s" repeatCount="indefinite" />
          </path>
        </svg>
        
        <div className="grid-cols-3" style={{ gap: '4rem', position: 'relative', zIndex: 10 }}>
          {/* Layer 1: Edge & Sensors (The Input) */}
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <h3 className="mb-2">IoT Edge Layer</h3>
              <div style={{ fontSize: '0.7rem', color: 'var(--slate)', textTransform: 'uppercase' }}>Real-time Data Capture</div>
            </div>
            
            <div className="card bg-primary" style={{ borderLeft: '4px solid var(--primary-blue)' }}>
              <div className="flex-center gap-3">
                <Cpu className="text-primary" size={24} />
                <div className="text-left">
                  <h4 style={{ fontSize: '0.9rem' }}>Sonic Flow Sensors</h4>
                  <p style={{ fontSize: '0.7rem' }}>Capturing 100Hz telemetry data.</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-primary" style={{ borderLeft: '4px solid var(--primary-blue)' }}>
              <div className="flex-center gap-3">
                <Wifi className="text-primary" size={24} />
                <div className="text-left">
                  <h4 style={{ fontSize: '0.9rem' }}>Pressure Gateways</h4>
                  <p style={{ fontSize: '0.7rem' }}>MQTT transmission to Cloud Core.</p>
                </div>
              </div>
            </div>

            <div className="card bg-primary" style={{ borderLeft: '4px solid var(--primary-blue)' }}>
              <div className="flex-center gap-3">
                <Activity className="text-primary" size={24} />
                <div className="text-left">
                  <h4 style={{ fontSize: '0.9rem' }}>Smart Valve State</h4>
                  <p style={{ fontSize: '0.7rem' }}>Monitoring mechanical health.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: Cloud & AI Core (The Processor) */}
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <h3 className="mb-2">AI Neural Core</h3>
              <div style={{ fontSize: '0.7rem', color: 'var(--slate)', textTransform: 'uppercase' }}>Pattern Recognition & AI</div>
            </div>
            
            <div className="card" style={{ 
              borderColor: 'var(--primary-green)', 
              boxShadow: 'var(--glow-green)',
              background: 'rgba(0, 255, 136, 0.05)'
            }}>
              <div className="text-center">
                <RefreshCw className="text-success mb-2 mx-auto animation-spin" size={32} />
                <h4>Predictive Analysis</h4>
                <p style={{ fontSize: '0.7rem' }}>LSTM Models predicting consumption and leaks with 99% accuracy.</p>
              </div>
            </div>
            
            <div className="card text-center" style={{ background: 'rgba(0, 240, 255, 0.05)' }}>
              <Database className="text-primary mb-2 mx-auto" size={28} />
              <h4>Big Data Storage</h4>
              <p style={{ fontSize: '0.7rem' }}>InfluxDB for time-series and PostgreSQL for relational data.</p>
            </div>

            <div className="card text-center" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <Lock className="text-primary mb-2 mx-auto" size={28} />
              <h4>Encryption Layer</h4>
              <p style={{ fontSize: '0.7rem' }}>AES-256 for all sensor-to-cloud transmissions.</p>
            </div>
          </div>

          {/* Layer 3: Presentation & Action (The Result) */}
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <h3 className="mb-2">Action Layer</h3>
              <div style={{ fontSize: '0.7rem', color: 'var(--slate)', textTransform: 'uppercase' }}>User Control & Automation</div>
            </div>
            
            <div className="card bg-primary text-center">
              <Monitor className="text-primary mb-2 mx-auto" size={28} />
              <h4>Admin Dashboard</h4>
              <p style={{ fontSize: '0.7rem' }}>Full society-wide water monitoring and remote valve shut-off.</p>
            </div>
            
            <div className="card bg-primary text-center">
              <BarChart3 className="text-primary mb-2 mx-auto" size={28} />
              <h4>Conservation Portal</h4>
              <p style={{ fontSize: '0.7rem' }}>Gamified resident app for tracking AquaCredits and usage.</p>
            </div>

            <div className="card text-center" style={{ borderColor: 'var(--primary-green)', borderStyle: 'dashed' }}>
              <Zap className="text-success mb-2 mx-auto animation-pulse" size={28} />
              <h4>Auto-Response System</h4>
              <p style={{ fontSize: '0.7rem' }}>AI automatically triggers shut-offs during high-pressure anomalies.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Narrative */}
      <div className="grid-cols-2 mt-5">
        <div className="card">
          <div className="card-title"><Activity size={18} /> Data Ingestion Workflow</div>
          <ol style={{ fontSize: '0.85rem', color: 'var(--slate)', marginLeft: '1.2rem', marginTop: '1rem' }}>
            <li className="mb-2">Sensors capture flow rate and pressure at 10ms intervals.</li>
            <li className="mb-2">Data is encrypted and sent via MQTT to the Cloud Ingest Gateway.</li>
            <li className="mb-2">The Neural Engine processes the stream to detect anomalies (leaks/bursts).</li>
            <li>Results are broadcast to the Live Dashboard and User Apps.</li>
          </ol>
        </div>
        <div className="card">
          <div className="card-title"><RefreshCw size={18} /> Automated Feedback Loop</div>
          <ul style={{ fontSize: '0.85rem', color: 'var(--slate)', marginLeft: '1.2rem', marginTop: '1rem' }}>
            <li className="mb-2">If a major leak is confirmed, the AI Core generates a "Critical Shut-off" signal.</li>
            <li className="mb-2">The Automated Controls API sends a secure command to the Edge Layer.</li>
            <li className="mb-2">IoT Smart Valves close in &lt;1.5 seconds to prevent flood damage.</li>
            <li>Maintenance teams are automatically dispatched with a generated service ticket.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Architecture;
