// Mock data generator for the data mesh platform
export const generateMockData = () => {
  const dataSources = [
    {
      id: 'customer-api',
      name: 'Customer API',
      type: 'api',
      description: 'RESTful API providing customer data and profiles',
      owner: 'Customer Team',
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      quality: 'excellent',
      tags: ['customer', 'api', 'profile'],
      metrics: {
        requests: Math.floor(Math.random() * 10000) + 5000,
        latency: Math.floor(Math.random() * 100) + 50,
        uptime: 99.5 + Math.random() * 0.5
      }
    },
    {
      id: 'sales-db',
      name: 'Sales Database',
      type: 'database',
      description: 'PostgreSQL database containing sales transactions and customer orders',
      owner: 'Sales Team',
      lastUpdated: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000),
      quality: 'good',
      tags: ['sales', 'database', 'transactions'],
      metrics: {
        size: '2.3 GB',
        records: Math.floor(Math.random() * 1000000) + 500000,
        lastBackup: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
      }
    },
    {
      id: 'product-files',
      name: 'Product Catalog Files',
      type: 'file',
      description: 'CSV files containing product information, pricing, and inventory',
      owner: 'Product Team',
      lastUpdated: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000),
      quality: 'good',
      tags: ['product', 'catalog', 'inventory'],
      metrics: {
        fileCount: Math.floor(Math.random() * 50) + 10,
        totalSize: '156 MB',
        lastSync: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000)
      }
    },
    {
      id: 'analytics-stream',
      name: 'Analytics Event Stream',
      type: 'stream',
      description: 'Kafka stream of user events and system metrics for real-time analytics',
      owner: 'Analytics Team',
      lastUpdated: new Date(Date.now() - Math.random() * 60 * 60 * 1000),
      quality: 'excellent',
      tags: ['analytics', 'streaming', 'events'],
      metrics: {
        throughput: Math.floor(Math.random() * 10000) + 5000,
        partitions: 16,
        replication: 3
      }
    }
  ]

  const dataLineage = {
    nodes: [
      { id: 'source1', name: 'Customer API', type: 'api', x: 50, y: 100, status: 'active' },
      { id: 'source2', name: 'Sales Database', type: 'database', x: 50, y: 200, status: 'active' },
      { id: 'source3', name: 'Product Files', type: 'file', x: 50, y: 300, status: 'active' },
      { id: 'transform1', name: 'Data Cleaner', type: 'transform', x: 200, y: 150, status: 'active' },
      { id: 'transform2', name: 'Schema Mapper', type: 'transform', x: 200, y: 250, status: 'active' },
      { id: 'warehouse', name: 'Data Warehouse', type: 'warehouse', x: 400, y: 200, status: 'active' },
      { id: 'lake', name: 'Data Lake', type: 'lake', x: 400, y: 300, status: 'active' },
      { id: 'analytics', name: 'Analytics API', type: 'api', x: 600, y: 150, status: 'active' },
      { id: 'dashboard', name: 'Dashboard', type: 'dashboard', x: 600, y: 250, status: 'active' }
    ],
    links: [
      { source: 'source1', target: 'transform1', type: 'data' },
      { source: 'source2', target: 'transform1', type: 'data' },
      { source: 'source3', target: 'transform2', type: 'data' },
      { source: 'transform1', target: 'warehouse', type: 'data' },
      { source: 'transform2', target: 'lake', type: 'data' },
      { source: 'warehouse', target: 'analytics', type: 'api' },
      { source: 'warehouse', target: 'dashboard', type: 'api' },
      { source: 'lake', target: 'analytics', type: 'api' }
    ]
  }

  const qualityMetrics = {
    overall: Math.floor(Math.random() * 20) + 80,
    completeness: Math.floor(Math.random() * 15) + 85,
    accuracy: Math.floor(Math.random() * 10) + 90,
    consistency: Math.floor(Math.random() * 25) + 75,
    timeliness: Math.floor(Math.random() * 30) + 70
  }

  const alerts = [
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
    }
  ]

  return {
    dataSources,
    dataLineage,
    qualityMetrics,
    alerts
  }
}

export const generateTrendData = (days = 7) => {
  const now = new Date()
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(now.getTime() - (days - 1 - i) * 24 * 60 * 60 * 1000)
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dataVolume: Math.floor(Math.random() * 1000) + 500,
      qualityScore: Math.floor(Math.random() * 20) + 80,
      completeness: Math.floor(Math.random() * 15) + 85,
      accuracy: Math.floor(Math.random() * 10) + 90,
      consistency: Math.floor(Math.random() * 25) + 75,
      timeliness: Math.floor(Math.random() * 30) + 70
    }
  })
}

export const generateSourceMetrics = () => {
  return [
    { name: 'Customer API', completeness: 98, accuracy: 95, consistency: 92, timeliness: 88, issues: 2 },
    { name: 'Sales Database', completeness: 94, accuracy: 97, consistency: 89, timeliness: 95, issues: 1 },
    { name: 'Product Files', completeness: 87, accuracy: 93, consistency: 85, timeliness: 78, issues: 5 },
    { name: 'Analytics API', completeness: 96, accuracy: 91, consistency: 94, timeliness: 92, issues: 1 },
    { name: 'Marketing Data', completeness: 89, accuracy: 88, consistency: 82, timeliness: 85, issues: 3 }
  ]
}
