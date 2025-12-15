import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Server, Activity, Settings, DatabaseZap } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: 'Overview', icon: LayoutDashboard },
    { id: 'TOOLS', label: 'Data Tools', icon: Server },
    { id: 'JOBS', label: 'Job Monitor', icon: Activity },
    { id: 'SETTINGS', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <DatabaseZap className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          NexusData
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">John Doe</p>
            <p className="text-xs text-slate-500">Lead Data Eng</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;