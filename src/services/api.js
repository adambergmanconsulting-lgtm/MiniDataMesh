// Mock API service for the data mesh platform
import { generateMockData, generateTrendData, generateSourceMetrics } from './dataGenerator'

class MockAPI {
  constructor() {
    this.baseUrl = '/api/v1'
    this.mockData = generateMockData()
  }

  // Simulate API delay
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Dashboard endpoints
  async getDashboardMetrics() {
    await this.delay(300)
    return {
      totalDataAssets: this.mockData.dataSources.length,
      activeConnections: Math.floor(Math.random() * 20) + 80,
      dataQualityScore: this.mockData.qualityMetrics.overall,
      systemHealth: 98.5 + Math.random() * 1.5,
      lastUpdated: new Date()
    }
  }

  async getTrendData() {
    await this.delay(200)
    return generateTrendData()
  }

  // Data Catalog endpoints
  async getDataAssets(filters = {}) {
    await this.delay(400)
    let assets = [...this.mockData.dataSources]
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      assets = assets.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm) ||
        asset.description.toLowerCase().includes(searchTerm) ||
        asset.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }
    
    if (filters.category && filters.category !== 'all') {
      assets = assets.filter(asset => asset.type === filters.category)
    }
    
    return assets
  }

  async getDataAsset(id) {
    await this.delay(200)
    const asset = this.mockData.dataSources.find(a => a.id === id)
    if (!asset) {
      throw new Error('Data asset not found')
    }
    return asset
  }

  // Data Lineage endpoints
  async getDataLineage() {
    await this.delay(300)
    return this.mockData.dataLineage
  }

  async getNodeDetails(nodeId) {
    await this.delay(200)
    const node = this.mockData.dataLineage.nodes.find(n => n.id === nodeId)
    if (!node) {
      throw new Error('Node not found')
    }
    return {
      ...node,
      details: {
        lastUpdated: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        throughput: Math.floor(Math.random() * 1000) + 100,
        latency: Math.floor(Math.random() * 100) + 10,
        status: 'active'
      }
    }
  }

  // Data Quality endpoints
  async getQualityMetrics() {
    await this.delay(250)
    return this.mockData.qualityMetrics
  }

  async getQualityTrends() {
    await this.delay(200)
    return generateTrendData()
  }

  async getSourceMetrics() {
    await this.delay(300)
    return generateSourceMetrics()
  }

  async getQualityAlerts() {
    await this.delay(200)
    return this.mockData.alerts
  }

  // Real-time updates (WebSocket simulation)
  subscribeToUpdates(callback) {
    const interval = setInterval(() => {
      const updates = {
        timestamp: new Date(),
        metrics: {
          totalDataAssets: Math.floor(Math.random() * 50) + 150,
          activeConnections: Math.floor(Math.random() * 20) + 80,
          dataQualityScore: Math.floor(Math.random() * 20) + 80
        },
        alerts: Math.random() > 0.8 ? [{
          id: Date.now(),
          type: 'warning',
          source: 'System',
          message: 'New quality alert detected',
          timestamp: 'Just now',
          severity: 'medium'
        }] : []
      }
      callback(updates)
    }, 5000)

    return () => clearInterval(interval)
  }
}

export default new MockAPI()
