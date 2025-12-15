export enum JobStatus {
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PENDING = 'PENDING'
}

export enum ToolCategory {
  STORAGE = 'Storage',
  COMPUTE = 'Compute',
  STREAMING = 'Streaming',
  ORCHESTRATION = 'Orchestration',
  DATABASE = 'Database'
}

export interface DataTool {
  id: string;
  name: string;
  category: ToolCategory;
  version: string;
  status: 'Healthy' | 'Degraded' | 'Down';
  uptime: string;
  nodes: number;
  memoryUsage: number; // percentage
  cpuUsage: number; // percentage
  icon: string;
}

export interface Job {
  id: string;
  name: string;
  toolId: string;
  status: JobStatus;
  startTime: string;
  duration: string;
  owner: string;
  errorLog?: string;
}

export interface MetricPoint {
  time: string;
  throughput: number; // MB/s
  latency: number; // ms
  activeJobs: number;
}

export type ViewState = 'DASHBOARD' | 'TOOLS' | 'JOBS' | 'SETTINGS';