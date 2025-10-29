import { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle, Clock, TrendingUp, RefreshCw, Download } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const DataQuality = () => {
  const [qualityMetrics, setQualityMetrics] = useState({
    overallScore: 0,
    completeness: 0,
    accuracy: 0,
    consistency: 0,
    timeliness: 0
  })

  const [alerts, setAlerts] = useState([])
  const [trendData, setTrendData] = useState([])
  const [sourceMetrics, setSourceMetrics] = useState([])

  useEffect(() => {
    // Simulate real-time quality metrics
    const updateMetrics = () => {
      setQualityMetrics({
        overallScore: Math.floor(Math.random() * 20) + 80,
        completeness: Math.floor(Math.random() * 15) + 85,
        accuracy: Math.floor(Math.random() * 10) + 90,
        consistency: Math.floor(Math.random() * 25) + 75,
        timeliness: Math.floor(Math.random() * 30) + 70
      })

      // Generate trend data
      const now = new Date()
      const trend = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000)
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          overall: Math.floor(Math.random() * 20) + 80,
          completeness: Math.floor(Math.random() * 15) + 85,
          accuracy: Math.floor(Math.random() * 10) + 90,
          consistency: Math.floor(Math.random() * 25) + 75,
          timeliness: Math.floor(Math.random() * 30) + 70
        }
      })
      setTrendData(trend)

      // Generate source metrics
      setSourceMetrics([
        { name: 'Customer API', completeness: 98, accuracy: 95, consistency: 92, timeliness: 88, issues: 2 },
        { name: 'Sales Database', completeness: 94, accuracy: 97, consistency: 89, timeliness: 95, issues: 1 },
        { name: 'Product Files', completeness: 87, accuracy: 93, consistency: 85, timeliness: 78, issues: 5 },
        { name: 'Analytics API', completeness: 96, accuracy: 91, consistency: 94, timeliness: 92, issues: 1 },
        { name: 'Marketing Data', completeness: 89, accuracy: 88, consistency: 82, timeliness: 85, issues: 3 }
      ])

      // Generate alerts
      setAlerts([
        {
          id: 1,
          type: 'warning',
          source: 'Product Files',
          message: 'Data completeness dropped below 90%',
          timestamp: '5 minutes ago',
          severity: 'medium'
        },
        {
          id: 2,
          type: 'error',
          source: 'Marketing Data',
          message: 'Schema validation failed for 15 records',
          timestamp: '12 minutes ago',
          severity: 'high'
        },
        {
          id: 3,
          type: 'info',
          source: 'Customer API',
          message: 'Data freshness check completed successfully',
          timestamp: '1 hour ago',
          severity: 'low'
        },
        {
          id: 4,
          type: 'warning',
          source: 'Sales Database',
          message: 'Duplicate records detected in customer table',
          timestamp: '2 hours ago',
          severity: 'medium'
        }
      ])
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [])

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 80) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'status-error'
      case 'medium': return 'status-warning'
      case 'low': return 'status-good'
      default: return 'status-warning'
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return AlertTriangle
      case 'warning': return AlertTriangle
      case 'info': return CheckCircle
      default: return Clock
    }
  }

  const qualityDimensions = [
    {
      name: 'Completeness',
      value: qualityMetrics.completeness,
      description: 'Percentage of non-null values',
      icon: CheckCircle
    },
    {
      name: 'Accuracy',
      value: qualityMetrics.accuracy,
      description: 'Correctness of data values',
      icon: CheckCircle
    },
    {
      name: 'Consistency',
      value: qualityMetrics.consistency,
      description: 'Uniformity across data sources',
      icon: TrendingUp
    },
    {
      name: 'Timeliness',
      value: qualityMetrics.timeliness,
      description: 'Freshness of data updates',
      icon: Clock
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Quality</h1>
          <p className="text-gray-600 mt-1">Monitor and ensure high-quality data across your ecosystem</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Overall Quality Score</h2>
            <p className="text-gray-600">Real-time assessment of data quality</p>
          </div>
          <div className={`text-4xl font-bold ${getScoreColor(qualityMetrics.overallScore)}`}>
            {qualityMetrics.overallScore}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              qualityMetrics.overallScore >= 90 ? 'bg-green-500' :
              qualityMetrics.overallScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${qualityMetrics.overallScore}%` }}
          ></div>
        </div>
      </div>

      {/* Quality Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {qualityDimensions.map((dimension, index) => {
          const Icon = dimension.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-full ${getScoreBgColor(dimension.value)}`}>
                  <Icon className={`w-5 h-5 ${getScoreColor(dimension.value)}`} />
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(dimension.value)}`}>
                  {dimension.value}%
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{dimension.name}</h3>
              <p className="text-sm text-gray-600">{dimension.description}</p>
            </div>
          )
        })}
      </div>

      {/* Quality Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Trends (7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="overall" stroke="#3b82f6" strokeWidth={2} name="Overall" />
              <Line type="monotone" dataKey="completeness" stroke="#10b981" strokeWidth={2} name="Completeness" />
              <Line type="monotone" dataKey="accuracy" stroke="#f59e0b" strokeWidth={2} name="Accuracy" />
              <Line type="monotone" dataKey="consistency" stroke="#8b5cf6" strokeWidth={2} name="Consistency" />
              <Line type="monotone" dataKey="timeliness" stroke="#ef4444" strokeWidth={2} name="Timeliness" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality by Data Source</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="completeness" fill="#10b981" name="Completeness" />
              <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy" />
              <Bar dataKey="consistency" fill="#8b5cf6" name="Consistency" />
              <Bar dataKey="timeliness" fill="#f59e0b" name="Timeliness" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Source Quality Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Source Quality Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completeness
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consistency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeliness
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issues
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sourceMetrics.map((source, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {source.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${source.completeness}%` }}
                        ></div>
                      </div>
                      {source.completeness}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${source.accuracy}%` }}
                        ></div>
                      </div>
                      {source.accuracy}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${source.consistency}%` }}
                        ></div>
                      </div>
                      {source.consistency}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${source.timeliness}%` }}
                        ></div>
                      </div>
                      {source.timeliness}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      source.issues === 0 ? 'status-good' :
                      source.issues <= 2 ? 'status-warning' : 'status-error'
                    }`}>
                      {source.issues} issues
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quality Alerts */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type)
            return (
              <div key={alert.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className={`p-1 rounded-full ${
                  alert.type === 'error' ? 'bg-red-100' :
                  alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    alert.type === 'error' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600">{alert.source}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DataQuality
