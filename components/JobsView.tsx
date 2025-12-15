import React, { useState } from 'react';
import { Job, JobStatus } from '../types';
import { MOCK_JOBS, MOCK_TOOLS } from '../constants';
import { analyzeErrorLog } from '../services/geminiService';
import { Play, CheckCircle, XCircle, Clock, AlertTriangle, Search, Cpu, X, Activity, Plus, Calendar, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const JobsView: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Scheduling State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    name: '',
    toolId: MOCK_TOOLS[0]?.id || '',
    startTime: '',
  });

  const handleAnalyze = async (job: Job) => {
    if (!job.errorLog) return;
    
    setSelectedJob(job);
    setIsAnalyzing(true);
    setAnalysis(''); // Clear previous
    
    const result = await analyzeErrorLog(job.name, job.errorLog);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const closeAnalysis = () => {
    setSelectedJob(null);
    setAnalysis('');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.name || !newJob.startTime) return;

    const scheduledJob: Job = {
      id: `job-${Math.floor(Math.random() * 10000)}`,
      name: newJob.name,
      toolId: newJob.toolId,
      status: JobStatus.PENDING,
      startTime: newJob.startTime.replace('T', ' '),
      duration: '-',
      owner: 'current-user'
    };

    setJobs([scheduledJob, ...jobs]);
    setIsScheduleModalOpen(false);
    setNewJob({ name: '', toolId: MOCK_TOOLS[0]?.id || '', startTime: '' });
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED: return 'text-emerald-400 bg-emerald-400/10';
      case JobStatus.FAILED: return 'text-rose-400 bg-rose-400/10';
      case JobStatus.RUNNING: return 'text-blue-400 bg-blue-400/10';
      case JobStatus.PENDING: return 'text-amber-400 bg-amber-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Job Monitor</h2>
          <p className="text-slate-400">Real-time pipeline tracking and debugging.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            />
          </div>
          <button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Schedule Job</span>
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Job Name</th>
                <th className="px-6 py-4">Tool</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Start Time</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{job.name}</div>
                    <div className="text-xs text-slate-500">{job.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{job.toolId}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status === JobStatus.COMPLETED && <CheckCircle size={12} />}
                      {job.status === JobStatus.FAILED && <XCircle size={12} />}
                      {job.status === JobStatus.RUNNING && <Activity size={12} className="animate-spin" />}
                      {job.status === JobStatus.PENDING && <Clock size={12} />}
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono text-sm">{job.duration}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{job.startTime}</td>
                  <td className="px-6 py-4">
                    {job.status === JobStatus.FAILED && (
                      <button
                        onClick={() => handleAnalyze(job)}
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                      >
                        <Cpu size={16} />
                        Diagnose
                      </button>
                    )}
                    {job.status === JobStatus.RUNNING && (
                      <button className="text-rose-400 hover:text-rose-300 text-sm font-medium">
                        Stop
                      </button>
                    )}
                    {job.status === JobStatus.PENDING && (
                      <button className="text-slate-400 hover:text-white text-sm font-medium">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Job Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="text-indigo-400" size={20} />
                Schedule New Job
              </h3>
              <button 
                onClick={() => setIsScheduleModalOpen(false)} 
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Job Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Monthly_Report_Agg"
                  value={newJob.name}
                  onChange={(e) => setNewJob({...newJob, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Target Tool</label>
                <div className="relative">
                  <select 
                    value={newJob.toolId}
                    onChange={(e) => setNewJob({...newJob, toolId: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2 appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {MOCK_TOOLS.map(tool => (
                      <option key={tool.id} value={tool.id}>{tool.name} ({tool.category})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Schedule Time</label>
                <input 
                  type="datetime-local" 
                  required
                  value={newJob.startTime}
                  onChange={(e) => setNewJob({...newJob, startTime: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none [color-scheme:dark]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium flex justify-center items-center gap-2"
                >
                  <Clock size={18} />
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Analysis Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/20 rounded-lg">
                  <AlertTriangle className="text-rose-500 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Diagnostic Report</h3>
                  <p className="text-slate-400 text-sm">Analyzing failure for: <span className="text-indigo-400">{selectedJob.name}</span></p>
                </div>
              </div>
              <button onClick={closeAnalysis} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Original Log Section */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Raw Error Log</h4>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-x-auto">
                  <pre className="text-rose-400 text-xs font-mono whitespace-pre-wrap">{selectedJob.errorLog}</pre>
                </div>
              </div>

              {/* AI Response Section */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Cpu size={16} className="text-indigo-400" />
                  Gemini Analysis
                </h4>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-indigo-500/20">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-indigo-300 animate-pulse">Consulting Gemini knowledge base...</p>
                    </div>
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{analysis}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-slate-700 bg-slate-900/50 flex justify-end gap-3">
              <button onClick={closeAnalysis} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
                Dismiss
              </button>
              <button 
                onClick={() => alert("Restart triggered (mock)")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Play size={16} />
                Restart Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsView;