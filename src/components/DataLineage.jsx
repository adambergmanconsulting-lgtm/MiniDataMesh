import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { ZoomIn, ZoomOut, RotateCcw, Download, Eye } from 'lucide-react'

const DataLineage = () => {
  const svgRef = useRef()
  const [selectedNode, setSelectedNode] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 800
    const height = 600
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }

    svg.attr("width", width).attr("height", height)

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Sample data lineage
    const nodes = [
      { id: "source1", name: "Customer API", type: "api", x: 50, y: 100, status: "active" },
      { id: "source2", name: "Sales Database", type: "database", x: 50, y: 200, status: "active" },
      { id: "source3", name: "Product Files", type: "file", x: 50, y: 300, status: "active" },
      { id: "transform1", name: "Data Cleaner", type: "transform", x: 200, y: 150, status: "active" },
      { id: "transform2", name: "Schema Mapper", type: "transform", x: 200, y: 250, status: "active" },
      { id: "warehouse", name: "Data Warehouse", type: "warehouse", x: 400, y: 200, status: "active" },
      { id: "lake", name: "Data Lake", type: "lake", x: 400, y: 300, status: "active" },
      { id: "analytics", name: "Analytics API", type: "api", x: 600, y: 150, status: "active" },
      { id: "dashboard", name: "Dashboard", type: "dashboard", x: 600, y: 250, status: "active" }
    ]

    const links = [
      { source: "source1", target: "transform1", type: "data" },
      { source: "source2", target: "transform1", type: "data" },
      { source: "source3", target: "transform2", type: "data" },
      { source: "transform1", target: "warehouse", type: "data" },
      { source: "transform2", target: "lake", type: "data" },
      { source: "warehouse", target: "analytics", type: "api" },
      { source: "warehouse", target: "dashboard", type: "api" },
      { source: "lake", target: "analytics", type: "api" }
    ]

    // Create links
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("x1", d => nodes.find(n => n.id === d.source).x)
      .attr("y1", d => nodes.find(n => n.id === d.source).y)
      .attr("x2", d => nodes.find(n => n.id === d.target).x)
      .attr("y2", d => nodes.find(n => n.id === d.target).y)

    // Create nodes
    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => setSelectedNode(d))

    // Add circles for nodes
    node.append("circle")
      .attr("r", 25)
      .attr("fill", d => {
        switch (d.type) {
          case "api": return "#3b82f6"
          case "database": return "#10b981"
          case "file": return "#f59e0b"
          case "transform": return "#8b5cf6"
          case "warehouse": return "#ef4444"
          case "lake": return "#06b6d4"
          case "dashboard": return "#84cc16"
          default: return "#6b7280"
        }
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)

    // Add node labels
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#ffffff")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text(d => d.name.split(" ").map(word => word[0]).join(""))

    // Add type labels below nodes
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "2.5em")
      .attr("fill", "#374151")
      .attr("font-size", "12px")
      .text(d => d.name)

    // Add status indicators
    node.append("circle")
      .attr("cx", 20)
      .attr("cy", -20)
      .attr("r", 4)
      .attr("fill", d => d.status === "active" ? "#10b981" : "#ef4444")

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
        setZoomLevel(event.transform.k)
      })

    svg.call(zoom)

  }, [])

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current)
    svg.transition().call(d3.zoom().scaleBy, 1.5)
  }

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current)
    svg.transition().call(d3.zoom().scaleBy, 1 / 1.5)
  }

  const handleReset = () => {
    const svg = d3.select(svgRef.current)
    svg.transition().call(d3.zoom().transform, d3.zoomIdentity)
  }

  const getNodeTypeInfo = (type) => {
    const typeInfo = {
      api: { color: "bg-blue-100 text-blue-800", description: "RESTful API endpoint" },
      database: { color: "bg-green-100 text-green-800", description: "Relational database" },
      file: { color: "bg-yellow-100 text-yellow-800", description: "File storage system" },
      transform: { color: "bg-purple-100 text-purple-800", description: "Data transformation process" },
      warehouse: { color: "bg-red-100 text-red-800", description: "Data warehouse" },
      lake: { color: "bg-cyan-100 text-cyan-800", description: "Data lake storage" },
      dashboard: { color: "bg-lime-100 text-lime-800", description: "Visualization dashboard" }
    }
    return typeInfo[type] || { color: "bg-gray-100 text-gray-800", description: "Unknown type" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Lineage</h1>
          <p className="text-gray-600 mt-1">Visualize data flow and dependencies across your ecosystem</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handleZoomIn} className="btn-secondary">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={handleZoomOut} className="btn-secondary">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={handleReset} className="btn-secondary">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Node Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: "api", label: "API" },
            { type: "database", label: "Database" },
            { type: "file", label: "File" },
            { type: "transform", label: "Transform" },
            { type: "warehouse", label: "Warehouse" },
            { type: "lake", label: "Data Lake" },
            { type: "dashboard", label: "Dashboard" }
          ].map(({ type, label }) => {
            const typeInfo = getNodeTypeInfo(type)
            return (
              <div key={type} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  type === "api" ? "bg-blue-500" :
                  type === "database" ? "bg-green-500" :
                  type === "file" ? "bg-yellow-500" :
                  type === "transform" ? "bg-purple-500" :
                  type === "warehouse" ? "bg-red-500" :
                  type === "lake" ? "bg-cyan-500" :
                  type === "dashboard" ? "bg-lime-500" : "bg-gray-500"
                }`}></div>
                <span className="text-sm text-gray-700">{label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lineage Visualization */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Data Flow Diagram</h3>
          <div className="text-sm text-gray-500">
            Zoom: {Math.round(zoomLevel * 100)}%
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <svg ref={svgRef} className="w-full h-96 bg-gray-50"></svg>
        </div>
      </div>

      {/* Node Details */}
      {selectedNode && (
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Node Details</h3>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">{selectedNode.name}</h4>
              <p className="text-sm text-gray-600">{getNodeTypeInfo(selectedNode.type).description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedNode.status === "active" ? "status-good" : "status-error"
              }`}>
                {selectedNode.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                getNodeTypeInfo(selectedNode.type).color
              }`}>
                {selectedNode.type}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Position:</span>
                <span className="ml-2 font-medium">({selectedNode.x}, {selectedNode.y})</span>
              </div>
              <div>
                <span className="text-gray-500">Last Updated:</span>
                <span className="ml-2 font-medium">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataLineage
