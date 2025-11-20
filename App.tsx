
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import MachineDetail from './pages/MachineDetail';
import UserManagement from './pages/UserManagement';
import DeviceManagement from './pages/DeviceManagement';
import { INITIAL_MACHINES } from './constants';
import { Machine } from './types';

const App: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>(INITIAL_MACHINES);

  useEffect(() => {
    // Special simulation for UV Machine (m4) - Updates every 10 seconds
    const uvInterval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        // Target UV machine (m4) specifically
        if (m.id === 'm4' && m.status === 'running') {
          // Generate speed between 25.60 and 25.69 (only second decimal changes)
          // 25.6 + (0.00 to 0.09)
          const decimalPart = Math.floor(Math.random() * 10) / 100;
          const newSpeed = +(25.6 + decimalPart).toFixed(2);

          return {
            ...m,
            speed: newSpeed,
            // Temperature between 35 and 45
            temperature: Math.floor(Math.random() * (45 - 35 + 1) + 35),
            // Accumulate total area
            totalArea: m.totalArea + Math.floor(Math.random() * 3) + 1,
            // Also update the "params" array for detailed view synchronization
            params: m.params.map(p => {
              // Optional: add some jitter to params if needed
              if (typeof p.value === 'number') {
                 const jitter = (Math.random() - 0.5) * 0.5;
                 return { ...p, value: +(p.value + jitter).toFixed(1) };
              }
              return p;
            })
          };
        }
        return m;
      }));
    }, 10000); // 10 seconds

    // Standard simulation for other running machines (if any were running)
    const generalInterval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        if (m.id !== 'm4' && m.status === 'running') {
          return {
            ...m,
            speed: +(m.speed + (Math.random() * 2 - 1)).toFixed(1),
            totalArea: m.totalArea + Math.floor(Math.random() * 2),
            temperature: Math.floor(m.temperature + (Math.random() * 1 - 0.5)),
          };
        }
        return m;
      }));
    }, 3000);

    return () => {
      clearInterval(uvInterval);
      clearInterval(generalInterval);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-tech-dark text-tech-text font-sans selection:bg-tech-accent selection:text-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard machines={machines} />} />
            <Route path="/overview" element={<Overview machines={machines} />} />
            <Route path="/details" element={<MachineDetail machines={machines} />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/devices" element={<DeviceManagement machines={machines} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
