
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Machine } from '../types';
import { Droplet, Layers, Activity } from 'lucide-react';

interface DashboardProps {
  machines: Machine[];
}

const Dashboard: React.FC<DashboardProps> = ({ machines }) => {
  const navigate = useNavigate();

  // Calculate aggregate stats
  const totalRunning = machines.filter(m => m.status === 'running').length;
  const totalIdle = machines.filter(m => m.status === 'idle').length;
  const totalWarning = machines.filter(m => m.status === 'warning').length;
  const totalDebugging = machines.filter(m => m.status === 'debugging').length;
  const totalError = machines.filter(m => m.status === 'error').length;
  
  const runRate = Math.round((totalRunning / machines.length) * 100);

  // Chart Data
  const statusData = [
    { name: '运行', value: totalRunning, color: '#10b981' },
    { name: '待机', value: totalIdle, color: '#f59e0b' },
    { name: '调试中', value: totalDebugging, color: '#3b82f6' },
    { name: '警告', value: totalWarning, color: '#f97316' }, 
    { name: '故障', value: totalError, color: '#ef4444' },
  ].filter(item => item.value > 0);

  const consumptionData = [
    { name: '1月', value: 4000 }, { name: '2月', value: 3000 },
    { name: '3月', value: 5000 }, { name: '4月', value: 4500 },
    { name: '5月', value: 6000 }, { name: '6月', value: 5500 },
    { name: '7月', value: 6200 }, { name: '8月', value: 6100 },
    { name: '9月', value: 7000 }, { name: '10月', value: 7500 },
    { name: '11月', value: 7200 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-tech-success shadow-[0_0_10px_rgba(16,185,129,0.4)]';
      case 'idle': return 'bg-tech-warning shadow-[0_0_10px_rgba(245,158,11,0.4)]';
      case 'debugging': return 'bg-tech-accent shadow-[0_0_10px_rgba(59,130,246,0.4)]';
      case 'warning': return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]';
      case 'error': return 'bg-tech-danger shadow-[0_0_10px_rgba(239,68,68,0.4)]';
      default: return 'bg-slate-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'running': return '运行中';
      case 'idle': return '待机';
      case 'debugging': return '调试中';
      case 'warning': return '警告';
      case 'error': return '故障';
      default: return '未知';
    }
  };

  const handleMachineClick = (machineId: string) => {
    navigate('/details', { state: { machineId } });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Status Distribution */}
        <div className="bg-tech-card rounded-xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="text-tech-accent" size={20} />
              设备运行统计
            </h2>
            <div className="flex items-center justify-between">
              <div className="w-32 h-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      innerRadius={40}
                      outerRadius={55}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-white">{runRate}%</span>
                  <span className="text-xs text-tech-text-muted">开机率</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-tech-text-muted">{item.name}</span>
                    <span className="font-bold text-white ml-auto">{item.value}台</span>
                  </div>
                ))}
              </div>
            </div>
        </div>

        {/* Production Chart */}
        <div className="bg-tech-card rounded-xl p-6 border border-slate-700/50 shadow-lg col-span-2 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Droplet className="text-purple-400" size={20} />
              墨量消耗趋势 (L) - 11个月
           </h2>
           <div className="h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consumptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#e2e8f0' }}
                    cursor={{fill: '#334155', opacity: 0.2}}
                  />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Machine Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-l-4 border-tech-accent pl-3">
          <Layers className="text-tech-text-muted" size={24} />
          实时设备监控
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {machines.map((machine) => (
            <div 
              key={machine.id} 
              onClick={() => handleMachineClick(machine.id)}
              className="group bg-tech-card rounded-xl border border-slate-700 hover:border-tech-accent/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-900/20 overflow-hidden cursor-pointer"
            >
              <div className="h-32 bg-slate-800 relative overflow-hidden">
                 <img src={machine.image} alt={machine.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                 <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getStatusColor(machine.status)}`}></div>
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent h-16"></div>
                 <div className="absolute bottom-3 left-3 font-bold text-white truncate w-11/12 drop-shadow-md">
                   {machine.name}
                 </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-xs text-tech-text-muted">型号</span>
                  <span className="text-sm font-mono text-tech-accent">{machine.model}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-slate-800/50 p-2 rounded">
                    <div className="text-xs text-tech-text-muted mb-1">速度</div>
                    <div className="font-bold">{machine.speed.toFixed(2)} <span className="text-[10px] font-normal text-slate-400">m/min</span></div>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded">
                     <div className="text-xs text-tech-text-muted mb-1">总产量</div>
                     <div className="font-bold">{machine.totalArea.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">m²</span></div>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded">
                     <div className="text-xs text-tech-text-muted mb-1">温度</div>
                     <div className="font-bold">{machine.temperature}°C</div>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded">
                     <div className="text-xs text-tech-text-muted mb-1">状态</div>
                     <div className={`font-bold text-xs ${
                        machine.status === 'running' ? 'text-tech-success' :
                        machine.status === 'debugging' ? 'text-tech-accent' :
                        machine.status === 'warning' ? 'text-orange-400' :
                        machine.status === 'error' ? 'text-red-400' : 'text-yellow-400'
                     }`}>
                       {getStatusLabel(machine.status)}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
