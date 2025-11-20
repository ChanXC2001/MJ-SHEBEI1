
import React from 'react';
import { Settings, Trash2, Edit } from 'lucide-react';
import { Machine } from '../types';

interface DeviceManagementProps {
  machines: Machine[];
}

const DeviceManagement: React.FC<DeviceManagementProps> = ({ machines }) => {
  return (
    <div className="animate-fade-in">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">设备管理</h1>
      </div>

      <div className="grid gap-4">
        {machines.map((machine) => (
          <div key={machine.id} className="bg-tech-card rounded-lg border border-slate-700 overflow-hidden transition-all duration-300 hover:bg-slate-800/30">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center text-slate-500 border border-slate-600">
                  <Settings size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{machine.name}</h3>
                  <p className="text-xs text-tech-text-muted font-mono">ID: {machine.id} | MODEL: {machine.model}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <div className="text-right mr-4 hidden sm:block">
                    <div className="text-xs text-slate-500">状态</div>
                    <div className={`text-sm font-bold ${
                      machine.status === 'running' ? 'text-green-400' :
                      machine.status === 'debugging' ? 'text-tech-accent' :
                      machine.status === 'warning' ? 'text-orange-400' :
                      machine.status === 'error' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {machine.status === 'running' ? '运行中' :
                       machine.status === 'debugging' ? '调试中' :
                       machine.status === 'warning' ? '警告' :
                       machine.status === 'error' ? '故障' : '待机'}
                    </div>
                 </div>
                 <button 
                   className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-sm flex items-center gap-2 border border-slate-600 transition-colors"
                 >
                   <Edit size={14} /> 修改设备
                 </button>
                 <button className="px-3 py-2 bg-slate-800 hover:bg-red-900/20 text-tech-danger rounded text-sm flex items-center gap-2 border border-slate-600 hover:border-red-500/50 transition-colors">
                   <Trash2 size={14} /> 删除设备
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceManagement;
