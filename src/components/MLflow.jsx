import { useState, useEffect } from 'react'
import { Brain, TrendingUp, CheckCircle, Clock, Users, Target } from 'lucide-react'

const MLflow = () => {
  const [mlflowData, setMlflowData] = useState(null)

  useEffect(() => {
    // Simulate MLflow experiment and model data
    const mlData = {
      experiments: [
        {
          id: "exp-001",
          name: "Customer Churn Prediction",
          status: "ACTIVE",
          runs: 24,
          lastRun: "2025-10-30T23:30:00Z",
          bestAccuracy: 92.1,
          owner: "ml.engineer@company.com"
        },
        {
          id: "exp-002", 
          name: "Product Recommendation",
          status: "ACTIVE",
          runs: 18,
          lastRun: "2025-10-30T22:15:00Z",
          bestAccuracy: 87.3,
          owner: "ml.engineer@company.com"
        },
        {
          id: "exp-003",
          name: "Price Optimization",
          status: "ARCHIVED",
          runs: 12,
          lastRun: "2025-10-28T15:45:00Z",
          bestAccuracy: 89.7,
          owner: "data.scientist@company.com"
        }
      ],
      models: [
        {
          name: "churn-predictor-v3",
          version: "3.2.1",
          stage: "Production",
          accuracy: 92.1,
          lastTrained: "2025-10-30T23:30:00Z",
          performance: {
            precision: 0.89,
            recall: 0.91,
            f1Score: 0.90
          },
          tags: ["churn", "customer", "production"],
          size: "45.2 MB"
        },
        {
          name: "recommendation-engine-v2",
          version: "2.1.0", 
          stage: "Staging",
          accuracy: 87.3,
          lastTrained: "2025-10-30T22:15:00Z",
          performance: {
            precision: 0.85,
            recall: 0.88,
            f1Score: 0.86
          },
          tags: ["recommendation", "product", "staging"],
          size: "78.9 MB"
        },
        {
          name: "price-optimizer-v1",
          version: "1.0.5",
          stage: "Archived",
          accuracy: 89.7,
          lastTrained: "2025-10-28T15:45:00Z",
          performance: {
            precision: 0.87,
            recall: 0.89,
            f1Score: 0.88
          },
          tags: ["pricing", "optimization", "archived"],
          size: "32.1 MB"
        }
      ],
      recentRuns: [
        {
          runId: "run-churn-024",
          experimentName: "Customer Churn Prediction",
          status: "FINISHED",
          startTime: "2025-10-30T23:30:00Z",
          endTime: "2025-10-30T23:45:30Z",
          duration: 15.5,
          metrics: {
            accuracy: 0.921,
            precision: 0.89,
            recall: 0.91,
            f1Score: 0.90
          },
          parameters: {
            learningRate: 0.001,
            maxDepth: 10,
            nEstimators: 100
          }
        },
        {
          runId: "run-recommendation-018",
          experimentName: "Product Recommendation",
          status: "FINISHED",
          startTime: "2025-10-30T22:15:00Z",
          endTime: "2025-10-30T22:28:45Z",
          duration: 13.75,
          metrics: {
            accuracy: 0.873,
            precision: 0.85,
            recall: 0.88,
            f1Score: 0.86
          },
          parameters: {
            learningRate: 0.01,
            maxDepth: 8,
            nEstimators: 150
          }
        }
      ],
      summary: {
        totalExperiments: 3,
        activeExperiments: 2,
        totalModels: 3,
        productionModels: 1,
        avgAccuracy: 89.7
      }
    }
    setMlflowData(mlData)
  }, [])

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Production': return 'text-green-600 bg-green-50 border-green-200'
      case 'Staging': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Archived': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'FINISHED': return 'text-green-600 bg-green-50'
      case 'RUNNING': return 'text-blue-600 bg-blue-50'
      case 'FAILED': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Brain className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">MLflow Model Management</h2>
        <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
          Live Experiments
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Experiments</p>
              <p className="text-2xl font-bold text-gray-900">{mlflowData?.summary.totalExperiments}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Production Models</p>
              <p className="text-2xl font-bold text-gray-900">{mlflowData?.summary.productionModels}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{mlflowData?.summary.avgAccuracy}%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Experiments</p>
              <p className="text-2xl font-bold text-gray-900">{mlflowData?.summary.activeExperiments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Model Registry */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Registry</h3>
        <div className="space-y-4">
          {mlflowData?.models.map((model, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStageColor(model.stage)}`}>
                    {model.stage}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{model.name}</h4>
                    <p className="text-sm text-gray-500">Version {model.version}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Size: {model.size}</p>
                  <p>Last trained: {new Date(model.lastTrained).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-500">Accuracy</p>
                  <p className="font-medium text-lg text-green-600">{model.accuracy}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Precision</p>
                  <p className="font-medium">{model.performance.precision}</p>
                </div>
                <div>
                  <p className="text-gray-500">Recall</p>
                  <p className="font-medium">{model.performance.recall}</p>
                </div>
                <div>
                  <p className="text-gray-500">F1 Score</p>
                  <p className="font-medium">{model.performance.f1Score}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {model.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Experiment Runs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Experiment Runs</h3>
        <div className="space-y-3">
          {mlflowData?.recentRuns.map((run, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(run.status)}`}>
                    {run.status}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900">{run.experimentName}</h4>
                    <p className="text-sm text-gray-500">Run ID: {run.runId}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Duration: {run.duration}m</p>
                  <p>{new Date(run.startTime).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Accuracy</p>
                  <p className="font-medium text-green-600">{(run.metrics.accuracy * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Precision</p>
                  <p className="font-medium">{run.metrics.precision}</p>
                </div>
                <div>
                  <p className="text-gray-500">Recall</p>
                  <p className="font-medium">{run.metrics.recall}</p>
                </div>
                <div>
                  <p className="text-gray-500">F1 Score</p>
                  <p className="font-medium">{run.metrics.f1Score}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Parameters:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(run.parameters).map(([key, value]) => (
                    <span key={key} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MLflow API Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">MLflow Tracking API Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.0/mlflow/experiments/list</span>
            <span className="text-green-600 font-medium">200 OK (45ms)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.0/mlflow/runs/search</span>
            <span className="text-green-600 font-medium">200 OK (67ms)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.0/mlflow/model-versions/list</span>
            <span className="text-green-600 font-medium">200 OK (52ms)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MLflow
