import { useState, useEffect } from 'react'
import { Database, Users, Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalDataAssets: 0,
    activeConnections: 0,
    dataQualityScore: 0,
    lastUpdated: new Date()
  })

  const [chartData, setChartData] = useState([])
  const [pieData, setPieData] = useState([])

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalDataAssets: Math.floor(Math.random() * 50) + 150,
        activeConnections: Math.floor(Math.random() * 20) + 80,
        dataQualityScore: Math.floor(Math.random() * 20) + 80,
        lastUpdated: new Date()
      }))

      // Generate chart data
      const now = new Date()
      const newChartData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000)
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          dataVolume: Math.floor(Math.random() * 1000) + 500,
          qualityScore: Math.floor(Math.random() * 20) + 80
        }
      })
      setChartData(newChartData)

      // Generate pie chart data
      setPieData([
        { name: 'Databases', value: 35, color: '#3b82f6' },
        { name: 'APIs', value: 25, color: '#10b981' },
        { name: 'Files', value: 20, color: '#f59e0b' },
        { name: 'Streams', value: 20, color: '#ef4444' }
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const metricCards = [
    {
      title: 'Total Data Assets',
      value: metrics.totalDataAssets,
      icon: Database,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%'
    },
    {
      title: 'Active Connections',
      value: metrics.activeConnections,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8%'
    },
    {
      title: 'Data Quality Score',
      value: `${metrics.dataQualityScore}%`,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+5%'
    },
    {
      title: 'System Health',
      value: '98.5%',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: '+2%'
    }
  ]

  const recentActivities = [
    { id: 1, action: 'New data source added', source: 'Customer API', time: '2 minutes ago', status: 'success' },
    { id: 2, action: 'Data quality alert', source: 'Sales Database', time: '5 minutes ago', status: 'warning' },
    { id: 3, action: 'Schema updated', source: 'Product Catalog', time: '10 minutes ago', status: 'success' },
    { id: 4, action: 'Connection restored', source: 'Analytics Warehouse', time: '15 minutes ago', status: 'success' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Mesh Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time overview of your data ecosystem</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {metrics.lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.change} from last week</p>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Volume Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Volume Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="dataVolume" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Data Sources Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Sources Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-full ${
                  activity.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.source}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
