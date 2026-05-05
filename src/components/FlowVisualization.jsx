import { useEffect, useMemo, useState } from 'react';
import { Droplets, CloudRain, Building2, Home, PowerOff, Activity, AlertTriangle, RotateCcw, Warehouse, Gauge, ShieldAlert } from 'lucide-react';
import { useIoT } from '../context/IoTContext';

function FlowVisualization() {
  const { data } = useIoT();
  const [simState, setSimState] = useState('normal');
  const [isRainActive, setIsRainActive] = useState(false);
  const [sensorReadings, setSensorReadings] = useState([
    { id: 'S-FLOW-01', zone: 'Municipal Inlet', flow: 45.2, pressure: 4.2, health: 99, status: 'Healthy' },
    { id: 'S-STOR-02', zone: 'Underground Storage', flow: 32.1, pressure: 3.8, health: 98, status: 'Healthy' },
    { id: 'S-PUMP-03', zone: 'Main Pump Station', flow: 40.7, pressure: 4.4, health: 97, status: 'Healthy' },
    { id: 'S-BLK-A4', zone: 'Residential Block A', flow: 18.5, pressure: 3.6, health: 98, status: 'Healthy' },
    { id: 'S-BLK-B5', zone: 'Residential Block B', flow: 16.9, pressure: 3.4, health: 97, status: 'Healthy' },
    { id: 'S-COM-06', zone: 'Commercial Hub', flow: 25.2, pressure: 3.5, health: 96, status: 'Healthy' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRainActive(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorReadings((prev) =>
        prev.map((sensor) => {
          const jitter = () => (Math.random() - 0.5) * 0.8;
          const baseFlow = Math.max(0, sensor.flow + jitter());
          const basePressure = Math.max(0, sensor.pressure + jitter() * 0.25);

          if (simState === 'leak' && (sensor.zone.includes('Block B') || sensor.zone.includes('Commercial'))) {
            return {
              ...sensor,
              flow: parseFloat((baseFlow + 6.5).toFixed(1)),
              pressure: parseFloat(Math.max(1.2, basePressure - 1.4).toFixed(1)),
              health: Math.max(75, sensor.health - 1),
              status: 'Leak Suspected',
            };
          }

          if (simState === 'pump_fail' && !sensor.zone.includes('Municipal Inlet')) {
            return {
              ...sensor,
              flow: parseFloat((sensor.flow * 0.2).toFixed(1)),
              pressure: parseFloat((sensor.pressure * 0.3).toFixed(1)),
              health: Math.max(70, sensor.health - 1),
              status: sensor.zone.includes('Main Pump') ? 'Pump Offline' : 'Low Supply',
            };
          }

          return {
            ...sensor,
            flow: parseFloat(baseFlow.toFixed(1)),
            pressure: parseFloat(basePressure.toFixed(1)),
            health: Math.min(99, sensor.health + (sensor.health < 95 ? 1 : 0)),
            status: 'Healthy',
          };
        }),
      );
    }, 1300);

    return () => clearInterval(interval);
  }, [simState]);

  const sectionMonitoring = useMemo(() => {
    if (simState === 'leak') {
      return [
        { section: 'Municipal Inlet', state: 'Stable', detail: 'Primary feed remains within tolerance.' },
        { section: 'Underground Storage', state: 'Warning', detail: 'Unexpected drawdown due to leak compensation.' },
        { section: 'Main Pump Station', state: 'Active', detail: 'Pump speed increased to maintain overhead levels.' },
        { section: 'Residential Block B', state: 'Critical', detail: 'Anomalous outflow detected; isolation advised.' },
        { section: 'Commercial Hub', state: 'Warning', detail: 'Pressure drop propagating from Block B branch.' },
      ];
    }

    if (simState === 'pump_fail') {
      return [
        { section: 'Municipal Inlet', state: 'Stable', detail: 'Incoming line healthy, awaiting pump recovery.' },
        { section: 'Underground Storage', state: 'Stable', detail: 'Storage holding  reserve for emergency routing.' },
        { section: 'Main Pump Station', state: 'Critical', detail: 'Motor failure detected; bypass valve enabled.' },
        { section: 'Residential Block B', state: 'Low Supply', detail: 'Water pressure reduced to conservation mode.' },
        { section: 'Commercial Hub', state: 'Low Supply', detail: 'Non-critical lines throttled by 40%.' },
      ];
    }

    return [
      { section: 'Municipal Inlet', state: 'Stable', detail: 'AI balancing source intake in real time.' },
      { section: 'Underground Storage', state: 'Stable', detail: 'Predictive recharge based on demand forecast.' },
      { section: 'Main Pump Station', state: 'Stable', detail: 'Variable frequency drive optimizing pressure.' },
      { section: 'Residential Block B', state: 'Stable', detail: 'Consumption trend within expected baseline.' },
      { section: 'Commercial Hub', state: 'Stable', detail: 'Peak-aware flow orchestration active.' },
    ];
  }, [simState]);

  const realtimeInsights = useMemo(() => {
    if (simState === 'leak') {
      return {
        summary: 'Leak scenario active: Block B branch divergence detected.',
        anomalyScore: 86,
        projectedLoss: '230 L / hr',
      };
    }

    if (simState === 'pump_fail') {
      return {
        summary: 'Pump failure detected: emergency redistribution engaged.',
        anomalyScore: 93,
        projectedLoss: 'System reduced mode',
      };
    }

    return {
      summary: 'All sections operating in predictive optimization mode.',
      anomalyScore: 11,
      projectedLoss: 'Negligible',
    };
  }, [simState]);

  const setScenario = (state) => setSimState(state);

  return (
    <div className="view-container" style={{ minHeight: '850px' }}>
      <div className="flex-between mb-4">
        <h2>Intelligent System Flow Schematic</h2>
      </div>

      <div className="grid-cols-4 mb-4">
        <div className="card text-center" style={{ borderColor: simState !== 'normal' ? 'var(--red-alert)' : 'var(--border-color)' }}>
          <div className="card-title flex-center mb-2 text-primary">Simulation Controls</div>
          <div className="flex-center gap-2">
            <button className={`tab ${simState === 'normal' ? 'active' : ''}`} onClick={() => setScenario('normal')} style={{ padding: '4px 8px', fontSize: '0.7rem' }}>
              <RotateCcw size={12} /> Reset
            </button>
            <button 
              className={`tab ${simState === 'leak' ? 'active' : ''}`} 
              onClick={() => setScenario('leak')}
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
              onClick={() => setScenario('pump_fail')}
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
          <div className="card-title flex-center mb-2 text-primary">Mainline Flow Velocity</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{simState === 'normal' ? `${(data.pressure * 1.1).toFixed(1)} m/s` : simState === 'leak' ? '12.8 m/s' : '0.0 m/s'}</div>
        </div>
        <div className="card text-center">
          <div className="card-title flex-center mb-2 text-success">Real-Time AI Analysis</div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{realtimeInsights.summary}</div>
        </div>
        <div className="card text-center">
          <div className="card-title flex-center mb-2 text-primary">Anomaly Score</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: simState === 'normal' ? 'var(--primary-green)' : 'var(--red-alert)' }}>{realtimeInsights.anomalyScore}/100</div>
          <div style={{ marginTop: '0.3rem', color: 'var(--slate)' }}>Projected loss: {realtimeInsights.projectedLoss}</div>
        </div>
      </div>

      <div className="grid-cols-2 mb-4">
        <div className="card">
          <div className="card-title mb-3"><Gauge size={18} /> Section Monitoring</div>
          <div className="sensor-list">
            {sectionMonitoring.map((item) => (
              <div key={item.section} className="sensor-item">
                <div>
                  <div style={{ fontWeight: 600 }}>{item.section}</div>
                  <div className="text-slate" style={{ fontSize: '0.8rem' }}>{item.detail}</div>
                </div>
                <div
                  className="sensor-health"
                  style={{
                    color:
                      item.state === 'Critical'
                        ? 'var(--red-alert)'
                        : item.state === 'Warning' || item.state === 'Low Supply'
                        ? 'var(--orange-warn)'
                        : 'var(--primary-green)',
                  }}
                >
                  {item.state}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title mb-3"><Activity size={18} /> Sensor Telemetry Feed</div>
          <div className="sensor-list">
            {sensorReadings.map((sensor) => (
              <div key={sensor.id} className="sensor-item">
                <div>
                  <div style={{ fontWeight: 600 }}>{sensor.zone}</div>
                  <div className="text-slate" style={{ fontSize: '0.78rem' }}>
                    {sensor.id} • Flow {sensor.flow} L/min • Pressure {sensor.pressure} bar
                  </div>
                </div>
                <div
                  className="sensor-health"
                  style={{
                    color: sensor.status === 'Healthy' ? 'var(--primary-green)' : sensor.status === 'Leak Suspected' ? 'var(--red-alert)' : 'var(--orange-warn)',
                  }}
                >
                  {sensor.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flow-diagram" style={{ height: '680px', position: 'relative', width: '100%' }}>
        <svg className="pipelines" style={{ filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.2))', width: '100%', height: '100%' }}>
          <path d="M 110 90 Q 130 260 180 520" className="pipeline" />
          <path d="M 110 90 Q 130 260 180 520" className={`flow-line ${simState === 'pump_fail' ? 'offline' : ''}`} style={{ animationDuration: '3s', opacity: simState === 'pump_fail' ? 0.2 : 1 }} />

          <path d="M 320 90 Q 260 280 180 520" className="pipeline" />
          <path d="M 320 90 Q 260 280 180 520" className={`flow-line ${simState === 'pump_fail' ? 'offline' : ''}`} style={{
            stroke: 'var(--primary-green)',
            opacity: (isRainActive && simState !== 'pump_fail') ? 1 : (simState === 'pump_fail' ? 0.1 : 0.2),
            transition: 'opacity 1s ease-in-out',
            animationDuration: '4s',
          }} />

          <path d="M 180 520 Q 350 520 500 120" className="pipeline" />
          <path d="M 180 520 Q 350 520 500 120" className={`flow-line ${simState === 'pump_fail' ? 'offline' : simState === 'leak' ? 'fast' : ''}`} style={{
            animationDuration: simState === 'leak' ? '0.5s' : '1.8s',
            stroke: simState === 'leak' ? 'var(--red-alert)' : 'var(--primary-blue)',
            opacity: simState === 'pump_fail' ? 0.1 : 1,
          }} />

          <path d="M 500 120 Q 700 120 820 290" className="pipeline" />
          <path d="M 500 120 Q 700 120 820 290" className={`flow-line ${simState === 'pump_fail' ? 'offline' : ''}`} style={{
            animationDuration: '2.4s',
            opacity: (simState === 'pump_fail' || simState === 'leak') ? 0.3 : 1,
          }} />

          <path d="M 500 120 Q 680 520 820 520" className="pipeline" />
          <path d="M 500 120 Q 680 520 820 520" className={`flow-line ${simState === 'pump_fail' ? 'offline' : ''}`} style={{
            animationDuration: '2.4s',
            opacity: (simState === 'pump_fail' || simState === 'leak') ? 0.3 : 1,
          }} />

          {simState === 'leak' && (
            <g>
              <circle cx="320" cy="520" r="18" fill="var(--red-alert)" opacity="0.35">
                <animate attributeName="r" values="12;28;12" dur="0.9s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="0.9s" repeatCount="indefinite" />
              </circle>
              <circle cx="320" cy="520" r="6" fill="var(--red-alert)" />
            </g>
          )}
        </svg>

        <div className="node" style={{ top: '90px', left: '110px', transform: 'translate(-50%, -50%)' }}>
          <Droplets className="node-icon" size={24} />
          <div className="node-label">Municipal Supply</div>
          <div className="starburst-pulse">LIVE</div>
        </div>

        <div className="node" style={{ top: '90px', left: '320px', transform: 'translate(-50%, -50%)' }}>
          <CloudRain className={`node-icon ${isRainActive ? 'text-success' : ''}`} size={24} />
          <div className="node-label">Rain Harvest</div>
          {isRainActive && <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px', color: 'var(--primary-green)' }}>ACTIVE</div>}
        </div>

        <div className="node storage-perimeter-pulse" style={{ top: '520px', left: '180px', transform: 'translate(-50%, -50%)', width: '120px', height: '120px' }}>
          <div className="tank-water" style={{ height: `${data.undergroundLevel}%`, position: 'absolute', bottom: 0, left: 0, borderRadius: '50%', zIndex: -1 }}></div>
          <Warehouse className="node-icon" size={24} />
          <div className="node-label">Underground Storage</div>
          <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white', marginTop: '4px' }}>{data.undergroundLevel}%</div>
        </div>

        <div className="node" style={{ top: '120px', left: '500px', transform: 'translate(-50%, -50%)', width: '130px', height: '130px' }}>
          <Activity className="node-icon" size={28} />
          <div className="node-label">Main Pump + Overhead Grid</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--primary-blue)' }}>{simState === 'pump_fail' ? 'FAILED' : 'RUNNING'}</div>
        </div>

        <div className="node zone-consumption-glow" style={{ top: '290px', left: '820px', transform: 'translate(-50%, -50%)', width: '120px', height: '120px', borderRadius: '16px' }}>
          <Home className="node-icon" size={24} />
          <div className="node-label">Residential Towers</div>
          <div style={{ fontSize: '0.63rem', color: 'var(--primary-blue)', marginTop: '4px' }}>
            {simState === 'leak' ? 'Block B anomaly' : 'Normal demand'}
          </div>
        </div>

        <div className="node zone-consumption-glow" style={{ top: '520px', left: '820px', transform: 'translate(-50%, -50%)', width: '120px', height: '120px', borderRadius: '16px' }}>
          <Building2 className="node-icon" size={24} />
          <div className="node-label">Commercial Complex</div>
          <div style={{ fontSize: '0.63rem', color: simState === 'pump_fail' ? 'var(--orange-warn)' : 'var(--primary-blue)', marginTop: '4px' }}>
            {simState === 'pump_fail' ? 'Reduced mode' : 'Peak-controlled'}
          </div>
        </div>

        {simState !== 'normal' && (
          <div className="card" style={{ position: 'absolute', top: '1rem', right: '1rem', width: '260px', zIndex: 30, borderColor: 'var(--red-alert)' }}>
            <div className="card-title"><ShieldAlert size={18} className="text-danger" /> Incident Response</div>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
              {simState === 'leak'
                ? 'Leak isolation sequence triggered: AI recommends closing Block B branch valve.'
                : 'Pump fail-safe active: non-critical sectors throttled while repair ticket is generated.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlowVisualization;
