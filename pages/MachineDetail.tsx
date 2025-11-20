
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { INITIAL_MACHINES, INITIAL_ALARMS } from '../constants';
import { AlertTriangle, Activity, Layers, Gauge, CheckCircle2, XCircle, Wrench } from 'lucide-react';
import { Machine } from '../types';

interface MachineDetailProps {
  machines: Machine[];
}

const MachineDetail: React.FC<MachineDetailProps> = ({ machines }) => {
  const location = useLocation();
  // Default to first machine from prop data if possible
  const [selectedMachineId, setSelectedMachineId] = useState<string>(machines[0]?.id || INITIAL_MACHINES[0].id);
  
  // Handle navigation from Dashboard
  useEffect(() => {
    if (location.state && location.state.machineId) {
      setSelectedMachineId(location.state.machineId);
    }
  }, [location.state]);
  
  // Find selected machine data from LIVE props, not constant
  const machine = machines.find(m => m.id === selectedMachineId) || machines[0];
  const alarms = INITIAL_ALARMS.filter(a => a.machineId === selectedMachineId);

  // Use machine params directly from props (which are simulated in App.tsx)
  const displayParams = machine.params;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-tech-success';
      case 'idle': return 'text-tech-warning';
      case 'warning': return 'text-orange-500';
      case 'error': return 'text-tech-danger';
      case 'debugging': return 'text-tech-accent';
      default: return 'text-slate-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'idle': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'warning': return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'error': return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'debugging': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      default: return 'bg-slate-500/20 border-slate-500/30 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'running': return '运行中';
      case 'idle': return '待机';
      case 'warning': return '警告';
      case 'error': return '故障';
      case 'stopped': return '停机';
      case 'debugging': return '调试中';
      default: return status;
    }
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6 pb-6 w-full">
      <h1 className="text-3xl font-bold text-white text-center mb-4">单机详情</h1>
      
      {/* Machine Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-700/50 pb-4 justify-center md:justify-start sticky top-16 z-40 bg-tech-dark/95 backdrop-blur">
        {machines.map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedMachineId(m.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedMachineId === m.id
                ? 'bg-tech-accent text-white shadow-md ring-2 ring-tech-accent/50'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Main Layout Grid - Optimized for large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Image & Real-time Status */}
        <div className="flex flex-col gap-6">
          {/* Machine Image Box */}
          <div className="bg-tech-card rounded-xl border border-slate-700 p-2 shadow-xl relative group overflow-hidden">
            <div className="aspect-video w-full bg-slate-900 rounded-lg overflow-hidden relative">
               <img 
                 src={machine.image} 
                 alt={machine.name} 
                 className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
               
               {/* Overlay Status Badge */}
               <div className="absolute top-4 right-4 z-10">
                 <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border ${getStatusBadge(machine.status)} shadow-lg`}>
                   <div className={`w-2.5 h-2.5 rounded-full ${
                     machine.status === 'running' ? 'bg-green-400 animate-pulse' :
                     machine.status === 'warning' ? 'bg-orange-400 animate-pulse' :
                     machine.status === 'debugging' ? 'bg-blue-400 animate-pulse' :
                     machine.status === 'error' ? 'bg-red-400' : 'bg-yellow-400'
                   }`}></div>
                   <span className="text-sm font-bold uppercase tracking-wide">{getStatusLabel(machine.status)}</span>
                 </div>
               </div>
               
               {/* Name Overlay */}
               <div className="absolute bottom-4 left-4 right-4">
                 <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{machine.name}</h2>
                 <p className="text-sm text-slate-300 font-mono">{machine.model}</p>
               </div>
            </div>
          </div>

          {/* Real-time Status List */}
          <div className="bg-tech-card rounded-xl border border-slate-700 p-6 shadow-xl flex-grow">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-l-4 border-tech-accent pl-3">
              <Activity className="text-tech-accent" size={20} />
              实时状态
            </h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                <span className="text-tech-text-muted flex items-center gap-2 text-sm"><Gauge size={16} /> 运行速度</span>
                <span className="text-white font-mono text-xl font-medium">{machine.speed.toFixed(2)} <span className="text-sm text-slate-500 font-normal">m/min</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                <span className="text-tech-text-muted flex items-center gap-2 text-sm"><Layers size={16} /> 喷印宽度</span>
                <span className="text-white font-mono text-xl font-medium">{machine.width}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                <span className="text-tech-text-muted flex items-center gap-2 text-sm"><Layers size={16} /> 实时产量</span>
                <span className="text-white font-mono text-xl font-medium">{machine.outputHourly} <span className="text-sm text-slate-500 font-normal">片/小时</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                <span className="text-tech-text-muted flex items-center gap-2 text-sm"><Activity size={16} /> 开机率</span>
                <span className="text-tech-accent font-mono text-xl font-bold">{machine.openRate}%</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-tech-text-muted flex items-center gap-2 text-sm">
                  {machine.status === 'debugging' ? <Wrench size={16} /> : <CheckCircle2 size={16} />} 当前状态
                </span>
                <span className={`font-bold text-xl ${getStatusColor(machine.status)}`}>{getStatusLabel(machine.status)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Data Tables */}
        <div className="flex flex-col gap-6">
          
          {/* Running Parameters Table */}
          <div className="bg-tech-card rounded-xl border border-slate-700 overflow-hidden shadow-xl">
            <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Gauge className="text-blue-400" size={18} />
                运行参数
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-tech-text-muted uppercase bg-slate-800/30">
                  <tr>
                    <th className="px-6 py-4 font-medium w-1/2">参数</th>
                    <th className="px-6 py-4 font-medium text-right w-1/2">数值</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {displayParams.map((param, index) => (
                    <tr key={index} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 text-slate-300">{param.name}</td>
                      <td className="px-6 py-4 text-right font-mono text-white font-medium">
                        {param.value} <span className="text-slate-500 ml-1 text-xs">{param.unit}</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-4 text-slate-300">环境温度</td>
                    <td className="px-6 py-4 text-right font-mono text-white font-medium">{machine.temperature} <span className="text-slate-500 text-xs">°C</span></td>
                  </tr>
                   <tr className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-4 text-slate-300">环境湿度</td>
                    <td className="px-6 py-4 text-right font-mono text-white font-medium">{machine.humidity} <span className="text-slate-500 text-xs">%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Alarms Table */}
          <div className="bg-tech-card rounded-xl border border-slate-700 overflow-hidden shadow-xl flex-grow">
            <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700">
              <h3 className="font-bold text-white flex items-center gap-2">
                <AlertTriangle className="text-tech-warning" size={18} />
                报警信息
              </h3>
            </div>
            <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-tech-text-muted uppercase bg-slate-800/30 sticky top-0 backdrop-blur-sm z-10">
                  <tr>
                    <th className="px-6 py-4 font-medium">时间</th>
                    <th className="px-6 py-4 font-medium">报警类型</th>
                    <th className="px-6 py-4 font-medium text-right">处理状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {alarms.length > 0 ? (
                    alarms.map((alarm) => (
                      <tr key={alarm.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4 text-slate-400 font-mono text-xs whitespace-nowrap">{alarm.time}</td>
                        <td className="px-6 py-4 text-white font-medium">{alarm.type}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            alarm.status === 'resolved' 
                              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                              : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {alarm.status === 'resolved' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                            {alarm.status === 'resolved' ? '已处理' : '未处理'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-500 flex flex-col items-center gap-2">
                        <CheckCircle2 size={32} className="text-slate-600" />
                        当前无报警记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MachineDetail;
