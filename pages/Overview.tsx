
import React, { useState } from 'react';
import { ArrowUpRight, AlertCircle, CheckCircle2, Wrench } from 'lucide-react';
import { Machine } from '../types';

interface OverviewProps {
  machines: Machine[];
}

const Overview: React.FC<OverviewProps> = ({ machines }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMachines = machines.filter(m => 
    m.name.includes(searchTerm) || m.model.includes(searchTerm)
  );

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">车间层级概览</h1>
        <input 
          type="text" 
          placeholder="搜索设备型号..." 
          className="bg-slate-800 border border-slate-600 text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-tech-accent text-white w-64 transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-tech-card rounded-lg border border-slate-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-tech-text-muted">
            <thead className="text-xs text-white uppercase bg-slate-800/80 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">设备名称</th>
                <th className="px-6 py-4">型号</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-center">速度 (m/min)</th>
                <th className="px-6 py-4 text-center">幅宽</th>
                <th className="px-6 py-4 text-center">累计产量 (m²)</th>
                <th className="px-6 py-4 text-center">效率趋势</th>
              </tr>
            </thead>
            <tbody>
              {filteredMachines.map((machine) => (
                <tr key={machine.id} className="bg-transparent border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {machine.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-tech-accent">
                    {machine.model}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {machine.status === 'running' && <CheckCircle2 size={16} className="text-tech-success" />}
                      {machine.status === 'error' && <AlertCircle size={16} className="text-tech-danger" />}
                      {machine.status === 'warning' && <AlertCircle size={16} className="text-orange-500" />}
                      {machine.status === 'debugging' && <Wrench size={16} className="text-tech-accent" />}
                      {machine.status === 'idle' && <div className="w-4 h-4 rounded-full border-2 border-tech-warning" />}
                      <span className={`capitalize ${
                        machine.status === 'running' ? 'text-white' :
                        machine.status === 'warning' ? 'text-orange-400' :
                        machine.status === 'debugging' ? 'text-tech-accent' :
                        machine.status === 'error' ? 'text-red-400' :
                        'text-slate-300'
                      }`}>
                        {machine.status === 'running' ? '运行中' : 
                         machine.status === 'error' ? '故障' : 
                         machine.status === 'warning' ? '警告' :
                         machine.status === 'debugging' ? '调试中' :
                         '待机'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-white">
                    {machine.speed.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {machine.width}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-white">
                    {machine.totalArea.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {machine.status === 'running' ? (
                        <span className="inline-flex items-center gap-1 text-tech-success bg-tech-success/10 px-2 py-1 rounded text-xs border border-tech-success/20">
                          <ArrowUpRight size={12} /> +2.4%
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-700/30 px-2 py-1 rounded text-xs">
                          --
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMachines.length === 0 && (
                 <tr>
                   <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                     未找到匹配的设备
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
