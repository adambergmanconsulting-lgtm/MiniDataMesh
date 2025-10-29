import { useState, useEffect } from 'react'
import { Database, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

const DeltaLake = () => {
  const [deltaStatus, setDeltaStatus] = useState(null)

  useEffect(() => {
    // Simulate Delta Lake metadata
    const deltaData = {
      tables: [
        {
          name: "customer_metrics",
          version: 42,
          lastUpdate: "2025-10-30T22:45Z",
          schema: ["customer_id", "region", "revenue", "last_purchase"],
          status: "Healthy",
          rowCount: 1250000,
          sizeGB: 2.3,
          schemaChanges: 3
        },
        {
          name: "product_catalog",
          version: 18,
          lastUpdate: "2025-10-30T21:30Z",
          schema: ["product_id", "category", "price", "inventory"],
          status: "Healthy",
          rowCount: 45000,
          sizeGB: 0.8,
          schemaChanges: 1
        },
        {
          name: "sales_transactions",
          version: 156,
          lastUpdate: "2025-10-30T23:15Z",
          schema: ["transaction_id", "customer_id", "amount", "timestamp"],
          status: "Warning",
          rowCount: 8900000,
          sizeGB: 15.2,
          schemaChanges: 0
        }
      ]
    }
    setDeltaStatus(deltaData)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Healthy': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default: return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return 'text-green-600 bg-green-50 border-green-200'
      case 'Warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-red-600 bg-red-50 border-red-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Database className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Delta Lake Integration</h2>
        <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
          Live Metadata
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deltaStatus?.tables.map((table, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{table.name}</h3>
                <p className="text-sm text-gray-500">Version {table.version}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(table.status)}`}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(table.status)}
                  <span>{table.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last Update</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="font-medium">
                    {new Date(table.lastUpdate).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Row Count</span>
                <span className="font-medium">{table.rowCount.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Size</span>
                <span className="font-medium">{table.sizeGB} GB</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Schema Changes</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-gray-400" />
                  <span className="font-medium">{table.schemaChanges}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Schema Fields:</p>
              <div className="flex flex-wrap gap-1">
                {table.schema.map((field, fieldIndex) => (
                  <span
                    key={fieldIndex}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schema Evolution Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">customer_metrics v42</p>
              <p className="text-xs text-gray-500">Added 'last_purchase' field • 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">product_catalog v18</p>
              <p className="text-xs text-gray-500">Updated 'price' field type • 1 day ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">sales_transactions v156</p>
              <p className="text-xs text-gray-500">No recent changes • 3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeltaLake
