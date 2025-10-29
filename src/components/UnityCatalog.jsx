import { useState, useEffect } from 'react'
import { Shield, Users, Tag, Eye, Lock, Database, GitBranch } from 'lucide-react'

const UnityCatalog = () => {
  const [catalogData, setCatalogData] = useState(null)

  useEffect(() => {
    // Simulate Unity Catalog data
    const catalog = {
      catalogs: [
        {
          name: "main",
          owner: "data.platform@company.com",
          comment: "Primary data catalog",
          createdAt: "2025-01-15T10:00:00Z",
          updatedAt: "2025-10-30T23:45:00Z",
          status: "ACTIVE"
        },
        {
          name: "ml_models",
          owner: "ml.team@company.com", 
          comment: "ML model artifacts and features",
          createdAt: "2025-03-20T14:30:00Z",
          updatedAt: "2025-10-30T22:15:00Z",
          status: "ACTIVE"
        }
      ],
      schemas: [
        {
          name: "sales",
          catalog: "main",
          owner: "sales.team@company.com",
          comment: "Sales and customer data",
          createdAt: "2025-02-01T09:00:00Z",
          updatedAt: "2025-10-30T23:30:00Z",
          tables: 8,
          views: 3
        },
        {
          name: "marketing",
          catalog: "main", 
          owner: "marketing.team@company.com",
          comment: "Marketing campaigns and analytics",
          createdAt: "2025-02-15T11:30:00Z",
          updatedAt: "2025-10-30T21:45:00Z",
          tables: 5,
          views: 2
        },
        {
          name: "features",
          catalog: "ml_models",
          owner: "ml.engineer@company.com",
          comment: "ML feature store",
          createdAt: "2025-04-10T16:00:00Z",
          updatedAt: "2025-10-30T20:30:00Z",
          tables: 12,
          views: 0
        }
      ],
      tables: [
        {
          name: "customers",
          schema: "sales",
          catalog: "main",
          owner: "data.engineer@company.com",
          tableType: "MANAGED",
          dataSourceFormat: "DELTA",
          location: "s3://company-data-lake/sales/customers/",
          createdAt: "2025-02-01T09:00:00Z",
          updatedAt: "2025-10-30T23:30:00Z",
          properties: {
            classification: "PII",
            sensitivity: "HIGH",
            retention: "7 years",
            lastAudit: "2025-10-25T14:00:00Z"
          },
          columns: [
            { name: "customer_id", type: "string", nullable: false },
            { name: "email", type: "string", nullable: false },
            { name: "region", type: "string", nullable: true },
            { name: "created_at", type: "timestamp", nullable: false }
          ],
          tags: ["pii", "customer", "sales"],
          lineage: {
            upstream: ["raw.customers", "external.crm_system"],
            downstream: ["analytics.customer_metrics", "ml.features.customer_profile"]
          }
        },
        {
          name: "products",
          schema: "sales",
          catalog: "main",
          owner: "product.team@company.com",
          tableType: "MANAGED",
          dataSourceFormat: "DELTA",
          location: "s3://company-data-lake/sales/products/",
          createdAt: "2025-02-05T10:30:00Z",
          updatedAt: "2025-10-30T22:15:00Z",
          properties: {
            classification: "PUBLIC",
            sensitivity: "LOW",
            retention: "10 years",
            lastAudit: "2025-10-20T11:00:00Z"
          },
          columns: [
            { name: "product_id", type: "string", nullable: false },
            { name: "name", type: "string", nullable: false },
            { name: "category", type: "string", nullable: true },
            { name: "price", type: "decimal(10,2)", nullable: false }
          ],
          tags: ["product", "catalog", "sales"],
          lineage: {
            upstream: ["raw.products", "external.product_catalog"],
            downstream: ["analytics.product_metrics", "ml.features.product_features"]
          }
        },
        {
          name: "customer_features",
          schema: "features",
          catalog: "ml_models",
          owner: "ml.engineer@company.com",
          tableType: "MANAGED",
          dataSourceFormat: "DELTA",
          location: "s3://company-data-lake/ml/features/customer/",
          createdAt: "2025-04-10T16:00:00Z",
          updatedAt: "2025-10-30T20:30:00Z",
          properties: {
            classification: "INTERNAL",
            sensitivity: "MEDIUM",
            retention: "2 years",
            lastAudit: "2025-10-28T16:30:00Z"
          },
          columns: [
            { name: "customer_id", type: "string", nullable: false },
            { name: "total_spent", type: "decimal(12,2)", nullable: true },
            { name: "purchase_frequency", type: "int", nullable: true },
            { name: "last_purchase_days", type: "int", nullable: true }
          ],
          tags: ["ml", "features", "customer"],
          lineage: {
            upstream: ["main.sales.customers", "main.sales.transactions"],
            downstream: ["ml.models.churn_predictor", "analytics.customer_segments"]
          }
        }
      ],
      summary: {
        totalCatalogs: 2,
        totalSchemas: 3,
        totalTables: 3,
        piiTables: 1,
        lastAudit: "2025-10-28T16:30:00Z"
      }
    }
    setCatalogData(catalog)
  }, [])

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'PII': return 'text-red-600 bg-red-50 border-red-200'
      case 'INTERNAL': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'PUBLIC': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSensitivityColor = (sensitivity) => {
    switch (sensitivity) {
      case 'HIGH': return 'text-red-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'LOW': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Shield className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Unity Catalog</h2>
        <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
          Data Governance
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Catalogs</p>
              <p className="text-2xl font-bold text-gray-900">{catalogData?.summary.totalCatalogs}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Schemas</p>
              <p className="text-2xl font-bold text-gray-900">{catalogData?.summary.totalSchemas}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">PII Tables</p>
              <p className="text-2xl font-bold text-gray-900">{catalogData?.summary.piiTables}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Eye className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Audit</p>
              <p className="text-sm font-bold text-gray-900">
                {new Date(catalogData?.summary.lastAudit).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Assets</h3>
        <div className="space-y-4">
          {catalogData?.tables.map((table, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getClassificationColor(table.properties.classification)}`}>
                    {table.properties.classification}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{table.catalog}.{table.schema}.{table.name}</h4>
                    <p className="text-sm text-gray-500">Owner: {table.owner}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Format: {table.dataSourceFormat}</p>
                  <p>Type: {table.tableType}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-500">Sensitivity</p>
                  <p className={`font-medium ${getSensitivityColor(table.properties.sensitivity)}`}>
                    {table.properties.sensitivity}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Retention</p>
                  <p className="font-medium">{table.properties.retention}</p>
                </div>
                <div>
                  <p className="text-gray-500">Last Audit</p>
                  <p className="font-medium">
                    {new Date(table.properties.lastAudit).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Columns</p>
                  <p className="font-medium">{table.columns.length}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-1">
                  {table.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Data Lineage:</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <GitBranch className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">Upstream:</span>
                    <span className="font-medium">{table.lineage.upstream.length} sources</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitBranch className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">Downstream:</span>
                    <span className="font-medium">{table.lineage.downstream.length} consumers</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Control */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Control & Permissions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="font-medium">PII Data Access</span>
            </div>
            <span className="text-green-600 font-medium">Restricted to Data Team</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="font-medium">ML Features Access</span>
            </div>
            <span className="text-blue-600 font-medium">ML Team + Data Scientists</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Eye className="w-4 h-4 text-yellow-600" />
              <span className="font-medium">Public Data Access</span>
            </div>
            <span className="text-yellow-600 font-medium">All Authenticated Users</span>
          </div>
        </div>
      </div>

      {/* Unity Catalog API Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Unity Catalog API Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.1/unity-catalog/catalogs</span>
            <span className="text-green-600 font-medium">200 OK (34ms)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.1/unity-catalog/schemas</span>
            <span className="text-green-600 font-medium">200 OK (28ms)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-mono text-sm">GET /api/2.1/unity-catalog/tables</span>
            <span className="text-green-600 font-medium">200 OK (45ms)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnityCatalog
