import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Droplets, TrendingDown, TrendingUp, AlertCircle, Activity, Radar, PlusCircle, Cpu } from 'lucide-react';
import { useIoT } from '../context/IoTContext';
import { useNotification } from '../context/NotificationContext';

const consumptionData = [
  { time: '00:00', usage: 120, predicted: 110 },
  { time: '04:00', usage: 80, predicted: 85 },
  { time: '08:00', usage: 450, predicted: 420 },
  { time: '12:00', usage: 320, predicted: 300 },
  { time: '16:00', usage: 280, predicted: 290 },
  { time: '20:00', usage: 500, predicted: 480 },
  { time: '23:59', usage: 150, predicted: 140 },
];

const buildingData = [
  { name: 'Block A', usage: 4200, capacity: 5000 },
  { name: 'Block B', usage: 3800, capacity: 5000 },
  { name: 'Commercial', usage: 8500, capacity: 10000 },
  { name: 'Hospital', usage: 6200, capacity: 8000 },
];

function DashboardView() {
  const { data } = useIoT();
  const { showNotification } = useNotification();
  const [activePortal, setActivePortal] = useState('Society Management');
  const [sensorName, setSensorName] = useState('');
  const [sensorZone, setSensorZone] = useState('Block A');
  const [sensorType, setSensorType] = useState('Flow');
  const [sensors, setSensors] = useState([
    { id: 'SNS-101', name: 'Main Riser Meter', zone: 'Block A', type: 'Flow', health: 99 },
    { id: 'SNS-102', name: 'Pressure Gate North', zone: 'Block B', type: 'Pressure', health: 97 },
    { id: 'SNS-103', name: 'Leak Acoustic Unit', zone: 'Commercial', type: 'Leak', health: 96 },
  ]);

  const detectionAccuracy = Math.min(99.9, 92 + sensors.length * 1.2).toFixed(1);

  const handleAddSensor = (event) => {
    event.preventDefault();
    const trimmedName = sensorName.trim();

    if (!trimmedName) {
      showNotification('Please enter a sensor name before adding.', 'warning');
      return;
    }

    const sensorId = `SNS-${100 + sensors.length + 1}`;
    setSensors((prev) => [
      {
        id: sensorId,
        name: trimmedName,
        zone: sensorZone,
        type: sensorType,
        health: 95 + Math.floor(Math.random() * 5),
      },
      ...prev,
    ]);
    setSensorName('');
    showNotification(`${sensorId} added to ${sensorZone} for real-time detection.`, 'success');
  };

  return (
    <div className="view-container">
      <div className="tabs">
        {['Society Management', 'Commercial Admin', 'Municipal Authority', 'Resident Portal'].map(tab => (
          <button 
            key={tab} 
            className={`tab ${activePortal === tab ? 'active' : ''}`}
            onClick={() => setActivePortal(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid-cols-4 mb-4">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><Droplets size={20} className="text-primary" /> Total Available</div>
          </div>
          <div className="stat-value">{data.municipalFlow.toLocaleString()} L/m</div>
          <div className="stat-trend neutral">
            <Activity size={16} /> Avg Line Pressure: {data.pressure} bar
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title"><Activity size={20} className="text-warning" /> Daily Consumption</div>
          </div>
          <div className="stat-value">{data.consumptionToday.toLocaleString()} L</div>
          <div className="stat-trend down">
            <TrendingDown size={16} /> -5.2% vs yesterday
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title"><TrendingUp size={20} className="text-success" /> Tank Storage</div>
          </div>
          <div className="stat-value">{data.overheadLevel}%</div>
          <div className="stat-trend down">
            <Activity size={16} /> Combined Reservoir Capacity
          </div>
        </div>
        <div className="card" style={{ borderColor: 'var(--border-color)' }}>
          <div className="card-header">
            <div className="card-title"><AlertCircle size={20} className="text-success" /> System Health</div>
          </div>
          <div className="stat-value text-success">{data.systemIntegrity}%</div>
          <div className="stat-trend neutral">
            <Activity size={16} /> All sectors operational
          </div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">AI Consumption Prediction (Last 24h)</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-blue)' }}>{activePortal} View</div>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-green)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary-green)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="var(--slate)" />
                <YAxis stroke="var(--slate)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--neon-white)' }}
                />
                <Legend />
                <Area type="monotone" dataKey="usage" name="Actual Usage (L)" stroke="var(--primary-blue)" fillOpacity={1} fill="url(#colorUsage)" />
                <Area type="monotone" dataKey="predicted" name="AI Predicted (L)" stroke="var(--primary-green)" fillOpacity={1} fill="url(#colorPredicted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Usage by Building / Zone</div>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buildingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="var(--slate)" />
                <YAxis dataKey="name" type="category" stroke="var(--slate)" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Legend />
                <Bar dataKey="usage" name="Current Usage" fill="var(--primary-blue)" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="capacity" name="Daily Quota" fill="rgba(255,255,255,0.1)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="sensor-section card mt-4">
        <div className="card-header">
          <div className="card-title">
            <Radar size={20} className="text-primary" /> Real-Time Sensor Expansion
          </div>
          <div className="sensor-metric">
            <Cpu size={16} />
            Detection Accuracy: {detectionAccuracy}%
          </div>
        </div>

        <div className="sensor-grid">
          <form className="sensor-form" onSubmit={handleAddSensor}>
            <h3>Add New Sensor Node</h3>
            <p className="mb-3">Deploy more edge sensors to improve anomaly detection precision in live telemetry streams.</p>

            <label htmlFor="sensor-name">Sensor Name</label>
            <input
              id="sensor-name"
              className="sensor-input"
              value={sensorName}
              onChange={(event) => setSensorName(event.target.value)}
              placeholder="e.g. Basement Leak Sonar"
            />

            <label htmlFor="sensor-zone">Zone</label>
            <select
              id="sensor-zone"
              className="sensor-input"
              value={sensorZone}
              onChange={(event) => setSensorZone(event.target.value)}
            >
              {['Block A', 'Block B', 'Block C', 'Commercial', 'Hospital'].map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>

            <label htmlFor="sensor-type">Sensor Type</label>
            <select
              id="sensor-type"
              className="sensor-input"
              value={sensorType}
              onChange={(event) => setSensorType(event.target.value)}
            >
              {['Flow', 'Pressure', 'Leak', 'Quality'].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <button type="submit" className="tab active flex-center gap-2 mt-3">
              <PlusCircle size={16} /> Add Sensor
            </button>
          </form>

          <div>
            <h3 className="mb-3">Active Sensor Fleet ({sensors.length})</h3>
            <div className="sensor-list">
              {sensors.map((sensor) => (
                <div key={sensor.id} className="sensor-item">
                  <div>
                    <div style={{ fontWeight: 600 }}>{sensor.name}</div>
                    <div className="text-slate" style={{ fontSize: '0.8rem' }}>
                      {sensor.id} • {sensor.zone} • {sensor.type}
                    </div>
                  </div>
                  <div className="sensor-health">Health {sensor.health}%</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-slate" style={{ fontSize: '0.8rem' }}>
              Last model sync: {data.lastSync} • Each newly added sensor increases the live detection confidence score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
