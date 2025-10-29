import { useState, useEffect } from 'react'
import { Play, CheckCircle, XCircle, Clock, Settings, BarChart3 } from 'lucide-react'

const DatabricksWorkflows = () => {
  const [workflows, setWorkflows] = useState(null)

  useEffect(() => {
    // Simulate Databricks Jobs/Workflows data
    const workflowsData = {
      jobs: [
        {
          id: "job-001",
          name: "Customer Data Pipeline",
          description: "ETL pipeline for customer metrics processing",
          status: "SUCCESS",
          lastRun: "2025-10-30T23:30:00Z",
          duration: 12.5,
          nextRun: "2025-10-31T00:30:00Z",
          successRate: 98.5,
          owner: "data.engineer@company.com",
          cluster: "job-cluster-001"
        },
        {
          id: "job-002", 
          name: "ML Model Training",
          description: "Retrain churn prediction model",
          status: "RUNNING",
          lastRun: "2025-10-30T23:45:00Z",
          duration: null,
          nextRun: "2025-10-31T06:00:00Z",
          successRate: 94.2,
          owner: "ml.engineer@company.com",
          cluster: "ml-cluster-002"
        },
        {
          id: "job-003",
          name: "Data Quality Checks",
          description: "Automated data quality validation",
          status: "FAILED",
          lastRun: "2025-10-30T23:15:00Z",
          duration: 3.2,
          nextRun: "2025-10-30T23:45:00Z",
          successRate: 89.1,
          owner: "data.quality@company.com",
          cluster: "quality-cluster-003"
        },
        {
          id: "job-004",
          name: "Feature Store Update",
          description: "Update ML feature store with latest data",
          status: "SUCCESS",
          lastRun: "2025-10-30T22:00:00Z",
          duration: 8.7,
          nextRun: "2025-10-31T02:00:00Z",
          successRate: 96.8,
          owner: "ml.engineer@company.com",
          cluster: "feature-cluster-004"
        }
      ],
      recentRuns: [
        {
          runId: "run-001",
          jobName: "Customer Data Pipeline",
          status: "SUCCESS",
          startTime: "2025-10-30T23:30:00Z",
          endTime: "2025-10-30T23:42:30Z",
          duration: 12.5,
          tasks: 5,
          completedTasks: 5
        },
        {
          runId: "run-002",
          jobName: "ML Model Training", 
          status: "RUNNING",
          startTime: "2025-10-30T23:45:00Z",
          endTime: null,
          duration: null,
          tasks: 8,
          completedTasks: 3
        },
        {
          runId: "run-003",
          jobName: "Data Quality Checks",
          status: "FAILED",
          startTime: "2025-10-30T23:15:00Z",
          endTime: "2025-10-30T23:18:12Z",
          duration: 3.2,
          tasks: 12,
          completedTasks: 8
        }
      ],
      summary: {
        totalJobs: 4,
        runningJobs: 1,
        successRate: 94.2,
        avgDuration: 8.1,
        totalRunsToday: 23
      }
    }
    setWorkflows(workflowsData)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'RUNNING': return <Play className="w-4 h-4 text-blue-500" />
      case 'FAILED': return <XCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return 'text-green-600 bg-green-50 border-green-200'
      case 'RUNNING': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'FAILED': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatDuration = (duration) => {
    if (duration === null) return 'Running...'
    return `${duration}m`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Databricks Workflows</h2>
        <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
          Live Jobs
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{workflows?.summary.totalJobs}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{workflows?.summary.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">{workflows?.summary.avgDuration}m</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Runs Today</p>
              <p className="text-2xl font-bold text-gray-900">{workflows?.summary.totalRunsToday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Definitions</h3>
        <div className="space-y-4">
          {workflows?.jobs.map((job, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(job.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(job.status)}
                      <span>{job.status}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{job.name}</h4>
                    <p className="text-sm text-gray-500">{job.description}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Owner: {job.owner}</p>
                  <p>Cluster: {job.cluster}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Last Run</p>
                  <p className="font-medium">
                    {new Date(job.lastRun).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium">{formatDuration(job.duration)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Run</p>
                  <p className="font-medium">
                    {new Date(job.nextRun).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Success Rate</p>
                  <p className="font-medium">{job.successRate}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Runs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Job Runs</h3>
        <div className="space-y-3">
          {workflows?.recentRuns.map((run, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(run.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(run.status)}
                    <span>{run.status}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{run.jobName}</h4>
                  <p className="text-sm text-gray-500">Run ID: {run.runId}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Start Time</p>
                <p className="font-medium text-sm">
                  {new Date(run.startTime).toLocaleString()}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{formatDuration(run.duration)}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="font-medium">{run.completedTasks}/{run.tasks} tasks</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Integration Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Databricks Jobs API Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.1/jobs/list</span>
            <span className="text-green-600 font-medium">200 OK (67ms)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.1/jobs/runs/list</span>
            <span className="text-green-600 font-medium">200 OK (89ms)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.1/jobs/runs/get?run_id=run-001</span>
            <span className="text-green-600 font-medium">200 OK (45ms)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatabricksWorkflows
