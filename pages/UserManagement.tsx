import React from 'react';
import { INITIAL_USERS } from '../constants';
import { User, Edit, Trash2, ShieldCheck, ShieldAlert } from 'lucide-react';

const UserManagement: React.FC = () => {
  return (
    <div className="animate-fade-in">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">用户管理</h1>
        <button className="bg-tech-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <User size={16} />
          添加用户
        </button>
      </div>

      <div className="bg-tech-card rounded-lg border border-slate-700 overflow-hidden shadow-xl">
        <table className="w-full text-sm text-left text-tech-text-muted">
          <thead className="text-xs text-white uppercase bg-slate-800/80 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">用户名</th>
              <th className="px-6 py-4">角色</th>
              <th className="px-6 py-4">最后登录时间</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {INITIAL_USERS.map((user) => (
              <tr key={user.id} className="bg-transparent border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                    {user.username.substring(0,2).toUpperCase()}
                  </div>
                  {user.username}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs border border-slate-600">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4">
                  {user.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 text-tech-success text-xs">
                      <ShieldCheck size={14} /> 正常
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                      <ShieldAlert size={14} /> 禁用
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex justify-end gap-2">
                     <button className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                       <Edit size={16} />
                     </button>
                     <button className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-red-400 transition-colors">
                       <Trash2 size={16} />
                     </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
