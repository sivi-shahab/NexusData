import React from 'react';
import { MOCK_TOOLS } from '../constants';
import { DataTool, ToolCategory } from '../types';
import { HardDrive, Cpu, Activity, Workflow, Database, MoreVertical, RefreshCw, Power } from 'lucide-react';
import { getToolOptimizationTips } from '../services/geminiService';

const ToolsView: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardDrive': return HardDrive;
      case 'Cpu': return Cpu;
      case 'Activity': return Activity;
      case 'Workflow': return Workflow;
      case 'Database': return Database;
      default: return Database;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-emerald-500';
      case 'Degraded': return 'bg-yellow-500';
      case 'Down': return 'bg-rose-500';
      default: return 'bg-slate-500';
    }
  };

  const [tips, setTips] = React.useState<{[key: string]: string}>({});
  const [loadingTip, setLoadingTip] = React.useState<string | null>(null);

  const fetchTip = async (tool: DataTool) => {
    setLoadingTip(tool.id);
    const metricsStr = `CPU: ${tool.cpuUsage}%, Mem: ${tool.memoryUsage}%, Nodes: ${tool.nodes}`;
    const tip = await getToolOptimizationTips(tool.name, metricsStr);
    setTips(prev => ({ ...prev, [tool.id]: tip }));
    setLoadingTip(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Data Infrastructure</h2>
          <p className="text-slate-400">Manage your computation, storage, and streaming services.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TOOLS.map((tool) => {
          const Icon = getIcon(tool.icon);
          const statusColor = getStatusColor(tool.status);
          const hasTip = !!tips[tool.id];

          return (
            <div key={tool.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 group hover:border-indigo-500/50 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{tool.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{tool.version}</p>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-white">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">CPU Usage</p>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold text-white">{tool.cpuUsage}%</span>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full mb-1.5">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${tool.cpuUsage}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Memory</p>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold text-white">{tool.memoryUsage}%</span>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full mb-1.5">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${tool.memoryUsage}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${statusColor} animate-pulse`}></span>
                  <span className="text-sm font-medium text-slate-300">{tool.status}</span>
                  <span className="text-xs text-slate-500 ml-2">({tool.uptime})</span>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => fetchTip(tool)}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
                        title="Get AI Optimization Tips"
                    >
                        {loadingTip === tool.id ? <RefreshCw className="animate-spin" size={18} /> : <Cpu size={18} />}
                    </button>
                </div>
              </div>

              {/* AI Tip Area */}
              {hasTip && (
                  <div className="mt-4 p-3 bg-indigo-900/20 border border-indigo-500/20 rounded-lg">
                      <p className="text-xs text-indigo-300 leading-relaxed">
                          <span className="font-bold block mb-1">Gemini Tips:</span>
                          {tips[tool.id]}
                      </p>
                  </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsView;