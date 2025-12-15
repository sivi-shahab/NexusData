import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  colorClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, trendUp, icon: Icon, colorClass }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-900/20 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClass} bg-opacity-20`}>
          <Icon className={`${colorClass.replace('bg-', 'text-')} w-6 h-6`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            trendUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}>
            {trend}
          </span>
          <span className="text-slate-500 text-xs">vs last week</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;