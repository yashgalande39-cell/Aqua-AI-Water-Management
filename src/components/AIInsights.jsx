import { useState, useEffect } from 'react';
import { Lightbulb, Settings, BatteryCharging, Power, Clock, Droplet, Activity, PowerOff, CloudRain, CheckCircle, Sun, Cloud, CloudLightning, Snowflake } from 'lucide-react';

function AIInsights() {
  const [loading, setLoading] = useState(null);
  const [notified, setNotified] = useState(false);
  const [restricted, setRestricted] = useState(false);
  const [scheduled, setScheduled] = useState(true);

  const [weather, setWeather] = useState({
    temp: '...',
    condition: 'Loading...',
    details: 'Fetching real-time data...',
    icon: CloudRain
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Pune coordinates
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m,weather_code&hourly=precipitation_probability&timezone=Asia%2FKolkata');
        const data = await res.json();
        
        const temp = data.current.temperature_2m;
        const code = data.current.weather_code;
        
        // Find max precipitation probability in the next 24 hours
        const rainProb = Math.max(...data.hourly.precipitation_probability.slice(0, 24));
        
        let condition = 'Clear';
        let WeatherIcon = Sun;
        
        if (code >= 1 && code <= 3) { condition = 'Cloudy'; WeatherIcon = Cloud; }
        else if (code >= 45 && code <= 48) { condition = 'Foggy'; WeatherIcon = Cloud; }
        else if (code >= 51 && code <= 67) { condition = 'Rainy'; WeatherIcon = CloudRain; }
        else if (code >= 71 && code <= 86) { condition = 'Snow'; WeatherIcon = Snowflake; }
        else if (code >= 95) { condition = 'Thunderstorm'; WeatherIcon = CloudLightning; }
        else if (code === 0) { condition = 'Clear Sky'; WeatherIcon = Sun; }

        let details = `${rainProb}% chance of rain`;
        if (rainProb > 50) details = `Rain Expected (${rainProb}%)`;

        setWeather({
          temp: `${Math.round(temp)}°C`,
          condition,
          details,
          icon: WeatherIcon
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
        setWeather({
          temp: '--',
          condition: 'Data Unavailable',
          details: 'Check connection',
          icon: CloudRain
        });
      }
    };
    
    fetchWeather();
    // Update every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (action, duration = 2000) => {
    setLoading(action);
    setTimeout(() => {
      setLoading(null);
      if (action === 'notify') setNotified(true);
      if (action === 'restrict') setRestricted(true);
      if (action === 'schedule') setScheduled(!scheduled);
    }, duration);
  };

  return (
    <div className="view-container">
      {loading && (
        <div style={{ 
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', 
          background: 'var(--primary-blue)', color: 'var(--dark-blue)', padding: '0.5rem 1rem', 
          borderRadius: '20px', zIndex: 1000, fontWeight: 'bold', animation: 'fadeIn 0.3s' 
        }}>
          {loading.toUpperCase()} IN PROGRESS...
        </div>
      )}

      <div className="grid-cols-3">
        <div className="col-span-2" style={{ gridColumn: 'span 2' }}>
          <h2 className="mb-4">AI Water Efficiency Engine</h2>
          <div className="card mb-4">
            <div className="card-header">
              <div className="card-title"><Lightbulb size={20} className="text-primary" /> Smart Recommendations</div>
            </div>
            
            <div className="alert-item success">
              <div className="alert-icon"><Clock size={20} /></div>
              <div className="alert-content">
                <h4>Peak Usage Predicted: 18:00 - 20:00</h4>
                <p>AI suggests pre-filling overhead tanks at 15:00 using solar power to avoid evening grid load.</p>
                <div className="flex gap-2 mt-2">
                  <button 
                    className={`tab ${scheduled ? 'active' : ''}`} 
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={() => handleAction('schedule')}
                  >
                    {scheduled ? 'Auto-Schedule Active' : 'Enable Auto-Schedule'}
                  </button>
                </div>
              </div>
            </div>

            <div className="alert-item warning">
              <div className="alert-icon"><Droplet size={20} /></div>
              <div className="alert-content">
                <h4>Unusual High Consumption: Block B, Apt 402</h4>
                <p>Usage is 300% above historical average for this time. Suspected continuously running toilet or tap.</p>
                <div className="flex gap-2 mt-2">
                  <button 
                    className={`tab ${notified ? 'active' : ''}`} 
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={() => handleAction('notify')}
                    disabled={notified}
                  >
                    {notified ? <><CheckCircle size={12} /> Resident Notified</> : 'Notify Resident'}
                  </button>
                  <button 
                    className="tab" 
                    style={{ 
                      padding: '0.25rem 0.75rem', fontSize: '0.8rem', 
                      color: restricted ? 'var(--slate)' : 'var(--red-alert)', 
                      borderColor: restricted ? 'var(--slate)' : 'var(--red-alert)',
                      backgroundColor: restricted ? 'rgba(255,255,255,0.05)' : 'transparent'
                    }}
                    onClick={() => handleAction('restrict', 3000)}
                    disabled={restricted}
                  >
                    {restricted ? 'Flow Restricted' : 'Remote Restrict Flow'}
                  </button>
                </div>
              </div>
            </div>

            <div className="alert-item info">
              <div className="alert-icon"><Settings size={20} /></div>
              <div className="alert-content">
                <h4>Dynamic Pressure Optimization Active</h4>
                <p>AI reduced main line pressure by 12% during off-peak hours (10:00 - 15:00), saving an estimated 450L/day in micro-leakage prevention.</p>
              </div>
            </div>
          </div>

          <div className="grid-cols-2">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Auto Shut-off Rules</div>
              </div>
              <div className="flex-between mb-3 pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <span>Major Pipe Burst Detection</span>
                <span className="text-success" style={{ fontWeight: 'bold' }}>Active</span>
              </div>
              <div className="flex-between mb-3 pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <span>Unoccupied Apartment Flow</span>
                <span className="text-success" style={{ fontWeight: 'bold' }}>Active</span>
              </div>
              <div className="flex-between pb-2">
                <span>Overhead Tank Overflow Prevent</span>
                <span className="text-success" style={{ fontWeight: 'bold' }}>Active</span>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Smart Scheduling</div>
              </div>
              <div className="flex-between mb-3 pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <span>Main Pump Operations</span>
                <span className="text-primary">AI Managed</span>
              </div>
              <div className="flex-between mb-3 pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <span>Greywater Flushing Cycle</span>
                <span className="text-primary">Timed: 06:00, 18:00</span>
              </div>
              <div className="flex-between pb-2">
                <span>Garden Irrigation</span>
                <span className="text-primary">Weather-synced (Rain Delay)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="card mb-4" style={{ backgroundColor: 'rgba(0, 255, 136, 0.05)', borderColor: 'var(--primary-green)' }}>
            <div className="card-header">
              <div className="card-title"><BatteryCharging size={20} className="text-success" /> System Efficiency Score</div>
            </div>
            <div className="flex-center mt-4 mb-4">
              <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="rgba(0, 255, 136, 0.2)" strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="var(--primary-green)" strokeWidth="3"
                    strokeDasharray="94, 100" className="circular-chart"
                    style={{ animation: 'flow 2s ease-out forwards' }}
                  />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-green)' }}>94%</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--slate)' }}>Excellent</div>
                </div>
              </div>
            </div>
            <p className="text-center" style={{ fontSize: '0.9rem' }}>
              Your smart optimizations have saved <strong className="text-neon-white">12,400L</strong> of water this week.
            </p>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="card-title"><Power size={20} className="text-primary" /> Quick Controls</div>
            </div>
            <div className="grid-cols-1 gap-2">
              <button 
                className="tab active flex-center gap-2 w-100" 
                style={{ padding: '0.75rem', width: '100%' }}
                onClick={() => handleAction('diagnostic', 4000)}
              >
                <Activity size={16} /> Run Full System Diagnostic
              </button>
              <button 
                className="tab flex-center gap-2 w-100" 
                style={{ padding: '0.75rem', width: '100%' }}
                onClick={() => handleAction('calibration', 3000)}
              >
                <Settings size={16} /> Calibrate Flow Sensors
              </button>
              <button 
                className="tab flex-center gap-2 w-100" 
                style={{ padding: '0.75rem', width: '100%', borderColor: 'var(--red-alert)', color: 'var(--red-alert)' }}
                onClick={() => handleAction('emergency shutdown', 2000)}
              >
                <PowerOff size={16} /> Emergency Main Shut-off
              </button>
            </div>
          </div>

          <div className="weather-widget">
            <div className="flex-between mb-3">
              <h3 style={{ color: 'white' }}>Pune Weather (Live)</h3>
              <weather.icon className="text-primary" />
            </div>
            <div className="flex-center gap-4">
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{weather.temp}</div>
              <div>
                <div style={{ fontWeight: 'bold' }}>{weather.condition}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{weather.details}</div>
              </div>
            </div>
            <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <div className="flex-between mb-2" style={{ fontSize: '0.8rem' }}>
                <span>Soil Moisture (Gardens)</span>
                <span className="text-success">Optimal (68%)</span>
              </div>
              <div className="flex-between" style={{ fontSize: '0.8rem' }}>
                <span>Irrigation Status</span>
                <span className={weather.condition === 'Rainy' || weather.condition === 'Thunderstorm' ? 'text-warning' : 'text-success'}>
                  {weather.condition === 'Rainy' || weather.condition === 'Thunderstorm' ? 'PAUSED (Rain Delay)' : 'ACTIVE (Scheduled)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;
