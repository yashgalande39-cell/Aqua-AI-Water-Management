import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const TelemetryContext = createContext(null);
const SimulationContext = createContext(null);
const HistoryContext = createContext([]);

export const useIoT = () => {
  const telemetry = useContext(TelemetryContext);
  const simulation = useContext(SimulationContext);
  const history = useContext(HistoryContext);

  return {
    ...simulation,
    data: telemetry,
    history,
  };
};
export const useTelemetryData = () => useContext(TelemetryContext);
export const useTelemetryHistory = () => useContext(HistoryContext);
export const useSimulationState = () => useContext(SimulationContext);

export const IoTProvider = ({ children }) => {
  const [data, setData] = useState({
    municipalFlow: 45.2,
    undergroundLevel: 60,
    overheadLevel: 85,
    pressure: 4.2,
    consumptionToday: 22700,
    leaksDetected: 0,
    systemIntegrity: 100,
    status: 'Operational',
    lastSync: new Date().toLocaleTimeString()
  });

  const [simActive, setSimActive] = useState(true);
  const [history, setHistory] = useState([]); // Stores hourly consumption for graphing

  useEffect(() => {
    if (!simActive) return;

    const interval = setInterval(() => {
      setData(prev => {
        const flowVar = (Math.random() - 0.5) * 2;
        const pressVar = (Math.random() - 0.5) * 0.5;
        const newConsumption = prev.consumptionToday + Math.floor(Math.random() * 10);
        
        // Log telemetry reading (historical storage simulation)
        if (Math.random() > 0.8) {
          setHistory(h => {
            const newEntry = {
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              usage: Math.floor(Math.random() * 500),
              predicted: 300
            };
            const updated = [...h, newEntry].slice(-24); // Keep last 24 entries
            return updated;
          });
        }

        const newUnderground = Math.max(0, Math.min(100, prev.undergroundLevel + (Math.random() - 0.5)));
        const newOverhead = Math.max(0, Math.min(100, prev.overheadLevel + (Math.random() - 0.5)));

        return {
          ...prev,
          municipalFlow: parseFloat((prev.municipalFlow + flowVar).toFixed(1)),
          pressure: parseFloat((prev.pressure + pressVar).toFixed(1)),
          consumptionToday: newConsumption,
          undergroundLevel: parseFloat(newUnderground.toFixed(1)),
          overheadLevel: parseFloat(newOverhead.toFixed(1)),
          lastSync: new Date().toLocaleTimeString()
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [simActive]);

  const simulationValue = useMemo(
    () => ({ setData, simActive, setSimActive }),
    [simActive],
  );

  return (
    <SimulationContext.Provider value={simulationValue}>
      <TelemetryContext.Provider value={data}>
        <HistoryContext.Provider value={history}>
          {children}
        </HistoryContext.Provider>
      </TelemetryContext.Provider>
    </SimulationContext.Provider>
  );
};
