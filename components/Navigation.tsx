import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Activity, LayoutGrid, Settings, Users, Cpu } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '生产概况', icon: <Activity size={18} /> },
    { path: '/overview', label: '车间总览', icon: <LayoutGrid size={18} /> },
    { path: '/details', label: '单机详情', icon: <Cpu size={18} /> },
    { path: '/users', label: '用户管理', icon: <Users size={18} /> },
    { path: '/devices', label: '设备管理', icon: <Settings size={18} /> },
  ];

  return (
    <nav className="bg-tech-card border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-tech-accent to-cyan-400 rounded flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-wide">
              美嘉设备监控
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive || (item.path !== '/' && location.pathname.startsWith(item.path))
                        ? 'bg-tech-accent/20 text-tech-accent border border-tech-accent/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                        : 'text-tech-text-muted hover:text-white hover:bg-slate-700/50'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-tech-text-muted bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-tech-success animate-pulse"></div>
              系统运行正常
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold border border-slate-500">
              AD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;