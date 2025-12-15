import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import ToolsView from './components/ToolsView';
import JobsView from './components/JobsView';
import { ViewState } from './types';
import { Bell, Search } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <DashboardHome />;
      case 'TOOLS':
        return <ToolsView />;
      case 'JOBS':
        return <JobsView />;
      case 'SETTINGS':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
            <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
            <p>Global configuration and user preferences would go here.</p>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header (Top Bar) */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-semibold text-slate-200">
              {currentView.charAt(0) + currentView.slice(1).toLowerCase()}
            </h1>
            <p className="text-sm text-slate-500">Last updated: Just now</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center bg-slate-800 rounded-lg px-3 py-2 border border-slate-700">
                 <Search className="w-4 h-4 text-slate-500 mr-2" />
                 <input 
                    type="text" 
                    placeholder="Search ecosystem..."
                    className="bg-transparent border-none outline-none text-sm text-white w-48 placeholder-slate-500" 
                 />
             </div>
             
             <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
             </button>
          </div>
        </header>

        {/* View Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;