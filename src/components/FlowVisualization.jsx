import React, { useState, useEffect } from 'react';
import { Droplets, CloudRain, Building2, Home, PowerOff, Activity, AlertTriangle, RotateCcw, Cpu } from 'lucide-react';
import { useIoT } from '../context/IoTContext';

function FlowVisualization() {
  const { data } = useIoT();
  const [simState, setSimState] = useState('normal'); 
  const [isRainActive, setIsRainActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRainActive(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="view-container" style={{ minHeight: '800px' }}>
      <div className="flex-between mb-4">
        <h2>Intelligent System Flow Schematic</h2>
      </div>
      
      <div className="grid-cols-4 mb-4">
        <div className="card text-center" style={{ borderColor: simState !== 'normal' ? 'var(--red-alert)' : 'var(--border-color)' }}>
          <div className="card-title flex-center mb-2 text-primary">Simulation Sandbox</div>
          <div className="flex-center gap-2">
            <button className={`tab ${simState === 'normal' ? 'active' : ''}`} onClick={() => setSimState('normal')} style={{ padding: '4px 8px', fontSize: '0.7rem' }}>
              <RotateCcw size={12} /> Reset
            </button>
            <button 
              className={`tab ${simState === 'leak' ? 'active' : ''}`} 
              onClick={() => setSimState('leak')} 
              style={{ 
                padding: '4px 8px', fontSize: '0.7rem', 
                color: simState === 'leak' ? 'white' : 'var(--red-alert)', 
                borderColor: 'var(--red-alert)',
                background: simState === 'leak' ? 'var(--red-alert)' : 'transparent',
                boxShadow: simState === 'leak' ? '0 0 10px var(--red-alert)' : 'none'
              }}
            >
              <AlertTriangle size={12} className={simState === 'leak' ? 'animation-pulse' : ''} /> Leak
            </button>
            <button 
              className={`tab ${simState === 'pump_fail' ? 'active' : ''}`} 
              onClick={() => setSimState('pump_fail')} 
              style={{ 
                padding: '4px 8px', fontSize: '0.7rem', 
                color: simState === 'pump_fail' ? 'white' : 'var(--orange-warn)', 
                borderColor: 'var(--orange-warn)',
                background: simState === 'pump_fail' ? 'var(--orange-warn)' : 'transparent',
                boxShadow: simState === 'pump_fail' ? '0 0 10px var(--orange-warn)' : 'none'
              }}
            >
              <PowerOff size={12} className={simState === 'pump_fail' ? 'animation-spin' : ''} /> Fail
            </button>
          </div>
        </div>
        <div className="card text-center">
          <div className="card-title flex-center mb-2 text-primary">Flow Velocity</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{simState === 'normal' ? `${(data.pressure * 1.1).toFixed(1)} m/s` : simState === 'leak' ? '12.8 m/s' : '0.0 m/s'}</div>
        </div>
        <div className="card text-center">
          <div className="card-title flex-center mb-2 text-success">AI Monitoring</div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{data.status}</div>
        </div>
        <div className="card text-center">
          <div className="card-title flex-center mb-2 text-primary">System Health</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: simState === 'normal' ? 'var(--primary-green)' : 'var(--red-alert)' }}>{simState === 'normal' ? `${data.systemIntegrity}%` : '65%'}</div>
        </div>
      </div>

      <div className="flow-diagram" style={{ height: '600px', position: 'relative', width: '100%' }}>
        <svg className="pipelines" style={{ filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.2))', width: '100%', height: '100%' }}>
          <path d="M 100 80 Q 100 300 150 450" className="pipeline" />
          <path d="M 100 80 Q 100 300 150 450" className={`flow-line ${simState === 'pump_fail' ? 'offline' : ''}`} style={{ animationDuration: '3s', opacity: simState === 'pump_fail' ? 0.2 : 1 }} />

          <path d="M 300 80 Q 250 300 150 450" className="pipeline" />
          <path d="M 300 80 Q 250 300 150 450" className={`flow-line ${simState === 'pump_fail' ? 'offline' : ''}`} style={{ 
            stroke: 'var(--primary-green)', 
            opacity: (isRainActive && simState !== 'pump_fail') ? 1 : (simState === 'pump_fail' ? 0.1 : 0),
            transition: 'opacity 1s ease-in-out',
            animationDuration: '4s'
          }} />

          <path d="M 150 450 Q 300 450 500 80" className="pipeline" />
          <path d="M 150 450 Q 300 450 500 80" className={`flow-line ${simState === 'pump_fail' ? 'offline' : simState === 'leak' ? 'fast' : ''}`} style={{ 
            animationDuration: simState === 'leak' ? '0.5s' : '1.5s',
            stroke: simState === 'leak' ? 'var(--red-alert)' : 'var(--primary-blue)',
            opacity: simState === 'pump_fail' ? 0.1 : 1
          }} />

          <path d="M 500 80 Q 650 80 750 250" className="pipeline" />
          <path d="M 500 80 Q 650 80 750 250" className={`flow-line ${simState === 'pump_fail' ? 'offline' : ''}`} style={{ 
            animationDuration: '2.5s',
            opacity: (simState === 'pump_fail' || simState === 'leak') ? 0.3 : 1
          }} />

          <path d="M 500 80 Q 650 450 750 450" className="pipeline" />
          <path d="M 500 80 Q 650 450 750 450" className={`flow-line ${simState === 'pump_fail' ? 'offline' : ''}`} style={{ 
            animationDuration: '2.5s',
            opacity: (simState === 'pump_fail' || simState === 'leak') ? 0.3 : 1
          }} />

          {simState === 'leak' && (
            <g>
              <circle cx="300" cy="450" r="15" fill="var(--red-alert)" opacity="0.4">
                <animate attributeName="r" values="10;25;10" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="300" cy="450" r="5" fill="var(--red-alert)" />
            </g>
          )}
        </svg>

        <div className="node" style={{ top: '80px', left: '100px', transform: 'translate(-50%, -50%)' }}>
          <Droplets className="node-icon" size={24} />
          <div className="node-label">Municipal Supply</div>
          <div className="starburst-pulse">ACTIVE</div>
        </div>

        <div className="node" style={{ top: '80px', left: '300px', transform: 'translate(-50%, -50%)' }}>
          <CloudRain className={`node-icon ${isRainActive ? 'text-success' : ''}`} size={24} />
          <div className="node-label">Rainwater</div>
          {isRainActive && <div className="active-green" style={{ fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px', color: 'var(--primary-green)' }}>ACTIVE</div>}
        </div>

        <div className="node" style={{ top: '80px', left: '500px', transform: 'translate(-50%, -50%)', width: '120px', height: '120px' }}>
          <Activity className="node-icon" size={28} />
          <div className="node-label">Main Overhead<br/>Distribution</div>
        </div>

        <div className="node zone-consumption-glow" style={{ top: '250px', left: '750px', transform: 'translate(-50%, -50%)' }}>
          <Home className="node-icon" size={24} />
          <div className="node-label">Residential Zone</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--primary-blue)', marginTop: '4px' }}>Consumption: Normal</div>
        </div>

        <div className="node zone-consumption-glow" style={{ top: '450px', left: '750px', transform: 'translate(-50%, -50%)' }}>
          <Building2 className="node-icon" size={24} />
          <div className="node-label">Commercial Hub</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--primary-blue)', marginTop: '4px' }}>Consumption: High</div>
        </div>

        <div className="node storage-perimeter-pulse" style={{ top: '450px', left: '150px', transform: 'translate(-50%, -50%)', width: '110px', height: '110px' }}>
          <div className="tank-water" style={{ height: `${data.undergroundLevel}%`, position: 'absolute', bottom: 0, left: 0, borderRadius: '50%', zIndex: -1 }}></div>
          <div className="node-label">Underground Storage</div>
          <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white', marginTop: '4px' }}>{data.undergroundLevel}% Full</div>
        </div>
      </div>
    </div>
  );
}

export default FlowVisualization;
