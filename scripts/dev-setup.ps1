# MiniDataMesh Development Setup Script
# PowerShell version

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MiniDataMesh Development Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to write colored output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Check if Node.js is installed
Write-ColorOutput "🚀 Step 1: Checking Node.js installation" "Cyan"
try {
    $nodeVersion = node --version
    Write-ColorOutput "✅ Node.js version $nodeVersion is installed" "Green"
} catch {
    Write-ColorOutput "❌ Node.js is not installed or not in PATH" "Red"
    Write-ColorOutput "Please install Node.js from https://nodejs.org/" "Yellow"
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is available
Write-ColorOutput "🚀 Step 2: Checking npm availability" "Cyan"
try {
    $npmVersion = npm --version
    Write-ColorOutput "✅ npm version $npmVersion is available" "Green"
} catch {
    Write-ColorOutput "❌ npm is not available" "Red"
    Write-ColorOutput "Please reinstall Node.js with npm" "Yellow"
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if we're in the right directory
Write-ColorOutput "🚀 Step 3: Checking project directory" "Cyan"
if (-not (Test-Path "package.json")) {
    Write-ColorOutput "❌ package.json not found. Please run this script from the project root." "Red"
    Read-Host "Press Enter to exit"
    exit 1
}
Write-ColorOutput "✅ Project directory is correct" "Green"

# Check if dependencies are installed
Write-ColorOutput "🚀 Step 4: Checking dependencies" "Cyan"
if (-not (Test-Path "node_modules")) {
    Write-ColorOutput "⚠️  Dependencies not found. Installing..." "Yellow"
    try {
        npm install
        Write-ColorOutput "✅ Dependencies installed successfully" "Green"
    } catch {
        Write-ColorOutput "❌ Failed to install dependencies" "Red"
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-ColorOutput "✅ Dependencies are installed" "Green"
}

# Display project information
Write-ColorOutput "🚀 Step 5: Project Information" "Cyan"
Write-Host ""
Write-Host "📊 MiniDataMesh - Data Mesh Platform Demo" -ForegroundColor BrightWhite
Write-Host "A modern data mesh platform demonstration" -ForegroundColor Gray
Write-Host ""
Write-Host "🎯 Features:" -ForegroundColor BrightWhite
Write-Host "• Interactive Dashboard with real-time metrics" -ForegroundColor Gray
Write-Host "• Data Catalog for asset discovery" -ForegroundColor Gray
Write-Host "• Data Lineage visualization with D3.js" -ForegroundColor Gray
Write-Host "• Data Quality monitoring and alerts" -ForegroundColor Gray
Write-Host "• Responsive design with Tailwind CSS" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Available Scripts:" -ForegroundColor BrightWhite
Write-Host "• npm run dev     - Start development server" -ForegroundColor Gray
Write-Host "• npm run build   - Build for production" -ForegroundColor Gray
Write-Host "• npm run preview - Preview production build" -ForegroundColor Gray
Write-Host "• npm run lint    - Run ESLint" -ForegroundColor Gray

# Start the development server
Write-ColorOutput "🚀 Step 6: Starting development server" "Cyan"
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "🎉 MiniDataMesh is starting up!" -ForegroundColor BrightGreen
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Setup complete! Starting development server..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 Open your browser and go to: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 The server will automatically reload when you make changes" -ForegroundColor Magenta
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Start the dev server
try {
    npm run dev
} catch {
    Write-ColorOutput "❌ Failed to start development server" "Red"
    Read-Host "Press Enter to exit"
    exit 1
}
