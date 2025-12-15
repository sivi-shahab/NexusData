import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { MOCK_METRICS } from '../constants';
import MetricCard from './MetricCard';
import { Database, Activity, Server, Zap } from 'lucide-react';

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">System Overview</h2>
        <p className="text-slate-400">High-level metrics for your data ecosystem.</p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Storage" 
          value="8.4 PB" 
          trend="+12%" 
          trendUp={true} 
          icon={Database} 
          colorClass="bg-indigo-500" 
        />
        <MetricCard 
          title="Active Nodes" 
          value="248" 
          trend="-2" 
          trendUp={false} 
          icon={Server} 
          colorClass="bg-emerald-500" 
        />
        <MetricCard 
          title="Data Ingestion" 
          value="1.2 GB/s" 
          trend="+5%" 
          trendUp={true} 
          icon={Zap} 
          colorClass="bg-amber-500" 
        />
        <MetricCard 
          title="Active Jobs" 
          value="42" 
          icon={Activity} 
          colorClass="bg-purple-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Throughput History (24h)</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_METRICS}>
                <defs>
                  <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value} MB/s`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} 
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="throughput" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorThroughput)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Job Latency</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_METRICS.slice(16, 24)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                />
                <Tooltip 
                    cursor={{fill: '#334155', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} 
                />
                <Bar dataKey="latency" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;