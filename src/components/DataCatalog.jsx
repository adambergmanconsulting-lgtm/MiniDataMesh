import { useState, useEffect } from 'react'
import { Search, Filter, Database, Globe, FileText, Server, Eye, Download, Star } from 'lucide-react'

const DataCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dataAssets, setDataAssets] = useState([])
  const [filteredAssets, setFilteredAssets] = useState([])

  const categories = [
    { id: 'all', label: 'All', count: 0 },
    { id: 'database', label: 'Databases', count: 0 },
    { id: 'api', label: 'APIs', count: 0 },
    { id: 'file', label: 'Files', count: 0 },
    { id: 'stream', label: 'Streams', count: 0 }
  ]

  useEffect(() => {
    // Generate mock data assets
    const mockAssets = [
      {
        id: 1,
        name: 'Customer Database',
        description: 'Primary customer data including profiles, preferences, and transaction history',
        category: 'database',
        owner: 'Customer Team',
        lastUpdated: '2024-01-15',
        size: '2.3 GB',
        quality: 'excellent',
        tags: ['customer', 'profile', 'transaction'],
        schema: { fields: 25, tables: 8 },
        access: 'read-write'
      },
      {
        id: 2,
        name: 'Sales Analytics API',
        description: 'RESTful API providing real-time sales metrics and analytics',
        category: 'api',
        owner: 'Analytics Team',
        lastUpdated: '2024-01-14',
        size: 'N/A',
        quality: 'good',
        tags: ['sales', 'analytics', 'api'],
        schema: { endpoints: 12, version: 'v2.1' },
        access: 'read-only'
      },
      {
        id: 3,
        name: 'Product Catalog Files',
        description: 'CSV files containing product information, pricing, and inventory data',
        category: 'file',
        owner: 'Product Team',
        lastUpdated: '2024-01-13',
        size: '156 MB',
        quality: 'good',
        tags: ['product', 'catalog', 'inventory'],
        schema: { columns: 15, rows: '50K+' },
        access: 'read-only'
      },
      {
        id: 4,
        name: 'Real-time Events Stream',
        description: 'Kafka stream of user events and system metrics',
        category: 'stream',
        owner: 'Platform Team',
        lastUpdated: '2024-01-15',
        size: 'Streaming',
        quality: 'excellent',
        tags: ['events', 'streaming', 'metrics'],
        schema: { topics: 8, partitions: 16 },
        access: 'read-write'
      },
      {
        id: 5,
        name: 'Financial Data Warehouse',
        description: 'Centralized financial data including transactions, budgets, and reports',
        category: 'database',
        owner: 'Finance Team',
        lastUpdated: '2024-01-12',
        size: '8.7 GB',
        quality: 'excellent',
        tags: ['finance', 'transactions', 'budget'],
        schema: { fields: 45, tables: 12 },
        access: 'read-only'
      },
      {
        id: 6,
        name: 'Marketing Campaign API',
        description: 'API for managing marketing campaigns and tracking performance',
        category: 'api',
        owner: 'Marketing Team',
        lastUpdated: '2024-01-11',
        size: 'N/A',
        quality: 'good',
        tags: ['marketing', 'campaigns', 'tracking'],
        schema: { endpoints: 8, version: 'v1.3' },
        access: 'read-write'
      }
    ]

    setDataAssets(mockAssets)
    setFilteredAssets(mockAssets)

    // Update category counts
    const updatedCategories = categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? mockAssets.length : mockAssets.filter(asset => asset.category === cat.id).length
    }))
    categories.splice(0, categories.length, ...updatedCategories)
  }, [])

  useEffect(() => {
    let filtered = dataAssets

    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(asset => asset.category === selectedCategory)
    }

    setFilteredAssets(filtered)
  }, [searchTerm, selectedCategory, dataAssets])

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return 'status-good'
      case 'good': return 'status-warning'
      case 'poor': return 'status-error'
      default: return 'status-warning'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'database': return Database
      case 'api': return Globe
      case 'file': return FileText
      case 'stream': return Server
      default: return Database
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Catalog</h1>
          <p className="text-gray-600 mt-1">Discover and explore data assets across your organization</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredAssets.length} of {dataAssets.length} assets
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search data assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const CategoryIcon = getCategoryIcon(asset.category)
          return (
            <div key={asset.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <CategoryIcon className="w-5 h-5 text-primary-600" />
                  <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Star className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{asset.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Owner:</span>
                  <span className="font-medium">{asset.owner}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="font-medium">{asset.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Size:</span>
                  <span className="font-medium">{asset.size}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Quality:</span>
                  <span className={`${getQualityColor(asset.quality)}`}>
                    {asset.quality}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {asset.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
                {asset.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{asset.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-700">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  asset.access === 'read-write' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {asset.access}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data assets found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default DataCatalog
