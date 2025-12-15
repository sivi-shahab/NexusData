import { ToolCategory, JobStatus, DataTool, Job, MetricPoint } from './types';
import { 
  Database, 
  Server, 
  Activity, 
  Workflow, 
  HardDrive,
  Box,
  Layers,
  Cpu
} from 'lucide-react';

export const MOCK_TOOLS: DataTool[] = [
  {
    id: 'hadoop-01',
    name: 'Hadoop HDFS',
    category: ToolCategory.STORAGE,
    version: '3.3.4',
    status: 'Healthy',
    uptime: '45d 12h',
    nodes: 128,
    memoryUsage: 78,
    cpuUsage: 45,
    icon: 'HardDrive'
  },
  {
    id: 'spark-01',
    name: 'Apache Spark',
    category: ToolCategory.COMPUTE,
    version: '3.5.0',
    status: 'Healthy',
    uptime: '12d 4h',
    nodes: 64,
    memoryUsage: 92,
    cpuUsage: 88,
    icon: 'Cpu'
  },
  {
    id: 'kafka-01',
    name: 'Apache Kafka',
    category: ToolCategory.STREAMING,
    version: '3.6.0',
    status: 'Degraded',
    uptime: '89d 1h',
    nodes: 12,
    memoryUsage: 65,
    cpuUsage: 40,
    icon: 'Activity'
  },
  {
    id: 'airflow-01',
    name: 'Apache Airflow',
    category: ToolCategory.ORCHESTRATION,
    version: '2.8.0',
    status: 'Healthy',
    uptime: '5d 22h',
    nodes: 4,
    memoryUsage: 45,
    cpuUsage: 20,
    icon: 'Workflow'
  },
  {
    id: 'snowflake-01',
    name: 'Snowflake',
    category: ToolCategory.DATABASE,
    version: 'Cloud',
    status: 'Healthy',
    uptime: '99.99%',
    nodes: 0, // Managed service
    memoryUsage: 30,
    cpuUsage: 35,
    icon: 'Database'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-spark-9923',
    name: 'Daily_Sales_Aggregation',
    toolId: 'spark-01',
    status: JobStatus.COMPLETED,
    startTime: '2023-10-27 02:00:00',
    duration: '45m 12s',
    owner: 'data-eng-team'
  },
  {
    id: 'job-kafka-1102',
    name: 'User_Clickstream_Ingest',
    toolId: 'kafka-01',
    status: JobStatus.RUNNING,
    startTime: '2023-10-27 08:30:00',
    duration: 'Running',
    owner: 'stream-team'
  },
  {
    id: 'job-spark-9924',
    name: 'ML_Model_Training_Fraud',
    toolId: 'spark-01',
    status: JobStatus.FAILED,
    startTime: '2023-10-27 09:15:00',
    duration: '12m 4s',
    owner: 'data-science',
    errorLog: `java.lang.OutOfMemoryError: Java heap space
    at java.util.Arrays.copyOf(Arrays.java:3332)
    at java.lang.AbstractStringBuilder.ensureCapacityInternal(AbstractStringBuilder.java:124)
    at java.lang.AbstractStringBuilder.append(AbstractStringBuilder.java:448)
    at java.lang.StringBuilder.append(StringBuilder.java:136)
    at org.apache.spark.sql.execution.joins.SortMergeJoinExec.doExecute(SortMergeJoinExec.scala:112)
    -- Caused by: ExecutorLostFailure (executor 4 exited caused by one of the running tasks) Reason: Container killed by YARN for exceeding memory limits. 14.4 GB of 14 GB physical memory used.`
  },
  {
    id: 'job-airflow-551',
    name: 'ETL_Customer_360',
    toolId: 'airflow-01',
    status: JobStatus.FAILED,
    startTime: '2023-10-27 10:00:00',
    duration: '5m 30s',
    owner: 'analytics',
    errorLog: `Psycopg2.OperationalError: FATAL: remaining connection slots are reserved for non-replication superuser connections.
    [2023-10-27 10:05:30,123] {taskinstance.py:1150} ERROR - Task failed with exception
    Traceback (most recent call last):
      File "/usr/local/airflow/dags/customer_360.py", line 45, in extract_data
        conn = psycopg2.connect(dsn)
    OperationalError: FATAL: sorry, too many clients already`
  }
];

export const MOCK_METRICS: MetricPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  throughput: Math.floor(Math.random() * 500) + 200,
  latency: Math.floor(Math.random() * 50) + 10,
  activeJobs: Math.floor(Math.random() * 20) + 5
}));