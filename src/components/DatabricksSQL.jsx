import { useState, useEffect } from 'react'
import { Database, Clock, Zap, BarChart3, TrendingUp } from 'lucide-react'

const DatabricksSQL = () => {
  const [sqlInsights, setSqlInsights] = useState(null)

  useEffect(() => {
    // Simulate Databricks SQL query insights
    const sqlData = {
      warehouses: [
        {
          id: "warehouse-001",
          name: "Analytics Warehouse",
          state: "RUNNING",
          clusterSize: "2X-Small",
          autoStopMinutes: 10,
          queriesPerHour: 45
        },
        {
          id: "warehouse-002", 
          name: "ML Feature Store",
          state: "RUNNING",
          clusterSize: "Small",
          autoStopMinutes: 30,
          queriesPerHour: 12
        }
      ],
      recentQueries: [
        {
          id: "query-001",
          query: "SELECT customer_id, SUM(revenue) FROM customer_metrics GROUP BY customer_id",
          duration: 1.2,
          rowsReturned: 1250,
          status: "SUCCESS",
          timestamp: "2025-10-30T23:45:00Z",
          user: "analyst@company.com"
        },
        {
          id: "query-002",
          query: "SELECT * FROM product_catalog WHERE category = 'Electronics'",
          duration: 0.8,
          rowsReturned: 450,
          status: "SUCCESS", 
          timestamp: "2025-10-30T23:42:00Z",
          user: "data.engineer@company.com"
        },
        {
          id: "query-003",
          query: "SELECT COUNT(*) FROM sales_transactions WHERE timestamp > '2025-10-30'",
          duration: 2.1,
          rowsReturned: 1,
          status: "SUCCESS",
          timestamp: "2025-10-30T23:40:00Z",
          user: "ml.engineer@company.com"
        }
      ],
      performanceMetrics: {
        avgQueryTime: 1.4,
        totalQueriesToday: 156,
        successRate: 98.7,
        activeUsers: 8
      }
    }
    setSqlInsights(sqlData)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return 'text-green-600 bg-green-50'
      case 'FAILED': return 'text-red-600 bg-red-50'
      case 'RUNNING': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getWarehouseStatusColor = (state) => {
    switch (state) {
      case 'RUNNING': return 'text-green-600 bg-green-50 border-green-200'
      case 'STOPPED': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Database className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Databricks SQL Insights</h2>
        <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
          Live Queries
        </span>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Query Time</p>
              <p className="text-2xl font-bold text-gray-900">{sqlInsights?.performanceMetrics.avgQueryTime}s</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Queries Today</p>
              <p className="text-2xl font-bold text-gray-900">{sqlInsights?.performanceMetrics.totalQueriesToday}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{sqlInsights?.performanceMetrics.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{sqlInsights?.performanceMetrics.activeUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Warehouses */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SQL Warehouses</h3>
        <div className="space-y-4">
          {sqlInsights?.warehouses.map((warehouse, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getWarehouseStatusColor(warehouse.state)}`}>
                  {warehouse.state}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{warehouse.name}</h4>
                  <p className="text-sm text-gray-500">ID: {warehouse.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Cluster Size</p>
                <p className="font-medium">{warehouse.clusterSize}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Queries/Hour</p>
                <p className="font-medium">{warehouse.queriesPerHour}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Auto-stop</p>
                <p className="font-medium">{warehouse.autoStopMinutes}min</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Queries */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Queries</h3>
        <div className="space-y-3">
          {sqlInsights?.recentQueries.map((query, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(query.status)}`}>
                    {query.status}
                  </span>
                  <span className="text-xs text-gray-500">ID: {query.id}</span>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {new Date(query.timestamp).toLocaleTimeString()}
                </div>
              </div>
              
              <div className="mb-3">
                <code className="text-sm bg-gray-100 p-2 rounded block overflow-x-auto">
                  {query.query}
                </code>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Duration: {query.duration}s</span>
                  <span>Rows: {query.rowsReturned.toLocaleString()}</span>
                  <span>User: {query.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Databricks REST API Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.0/sql/warehouses</span>
            <span className="text-green-600 font-medium">200 OK (124ms)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.0/sql/history/queries</span>
            <span className="text-green-600 font-medium">200 OK (58ms)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.0/sql/warehouses/{sqlInsights?.warehouses[0]?.id}</span>
            <span className="text-green-600 font-medium">200 OK (89ms)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatabricksSQL
