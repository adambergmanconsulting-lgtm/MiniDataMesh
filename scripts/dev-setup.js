#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const logStep = (step, message) => {
  log(`\n${colors.cyan}🚀 Step ${step}: ${message}${colors.reset}`);
};

const logSuccess = (message) => {
  log(`✅ ${message}`, 'green');
};

const logWarning = (message) => {
  log(`⚠️  ${message}`, 'yellow');
};

const logError = (message) => {
  log(`❌ ${message}`, 'red');
};

// Check if Node.js version is compatible
const checkNodeVersion = () => {
  logStep(1, 'Checking Node.js version');
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 18) {
    logError('Node.js 18+ is required. Current version: ' + nodeVersion);
    log('Please upgrade Node.js: https://nodejs.org/', 'yellow');
    process.exit(1);
  }
  
  logSuccess(`Node.js version ${nodeVersion} is compatible`);
};

// Check if dependencies are installed
const checkDependencies = () => {
  logStep(2, 'Checking dependencies');
  
  if (!fs.existsSync('node_modules')) {
    logWarning('Dependencies not found. Installing...');
    try {
      execSync('npm install', { stdio: 'inherit' });
      logSuccess('Dependencies installed successfully');
    } catch (error) {
      logError('Failed to install dependencies');
      process.exit(1);
    }
  } else {
    logSuccess('Dependencies are installed');
  }
};

// Check if build works
const checkBuild = () => {
  logStep(3, 'Testing build process');
  try {
    execSync('npm run build', { stdio: 'pipe' });
    logSuccess('Build test passed');
  } catch (error) {
    logWarning('Build test failed, but continuing with dev server...');
  }
};

// Check for common issues
const checkCommonIssues = () => {
  logStep(4, 'Checking for common issues');
  
  // Check if port 5173 is available
  try {
    execSync('netstat -an | findstr :5173', { stdio: 'pipe' });
    logWarning('Port 5173 might be in use. If the server fails to start, try a different port.');
  } catch (error) {
    logSuccess('Port 5173 is available');
  }
  
  // Check if .env file exists
  if (!fs.existsSync('.env')) {
    logWarning('No .env file found. Creating a basic one...');
    fs.writeFileSync('.env', 'NODE_ENV=development\nVITE_APP_TITLE=MiniDataMesh\n');
    logSuccess('.env file created');
  }
};

// Display project information
const displayProjectInfo = () => {
  logStep(5, 'Project Information');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  log(`\n${colors.bright}📊 MiniDataMesh - Data Mesh Platform Demo${colors.reset}`);
  log(`Version: ${packageJson.version}`);
  log(`Description: ${packageJson.description || 'A modern data mesh platform demonstration'}`);
  
  log(`\n${colors.bright}🎯 Features:${colors.reset}`);
  log('• Interactive Dashboard with real-time metrics');
  log('• Data Catalog for asset discovery');
  log('• Data Lineage visualization with D3.js');
  log('• Data Quality monitoring and alerts');
  log('• Responsive design with Tailwind CSS');
  
  log(`\n${colors.bright}🚀 Available Scripts:${colors.reset}`);
  log('• npm run dev     - Start development server');
  log('• npm run build   - Build for production');
  log('• npm run preview - Preview production build');
  log('• npm run lint    - Run ESLint');
};

// Start the development server
const startDevServer = () => {
  logStep(6, 'Starting development server');
  
  log('\n' + '='.repeat(60));
  log(`${colors.bright}🎉 MiniDataMesh is starting up!${colors.reset}`);
  log('='.repeat(60));
  
  log(`\n${colors.green}✅ Setup complete! Starting development server...${colors.reset}`);
  log(`\n${colors.cyan}📱 Open your browser and go to: http://localhost:5173${colors.reset}`);
  log(`\n${colors.yellow}💡 Press Ctrl+C to stop the server${colors.reset}`);
  log(`\n${colors.magenta}🔧 The server will automatically reload when you make changes${colors.reset}`);
  
  log('\n' + '='.repeat(60));
  
  // Start the actual dev server
  const devProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });
  
  // Handle process termination
  process.on('SIGINT', () => {
    log('\n\n' + colors.yellow + '🛑 Shutting down development server...' + colors.reset);
    devProcess.kill('SIGINT');
    process.exit(0);
  });
  
  devProcess.on('error', (error) => {
    logError('Failed to start development server: ' + error.message);
    process.exit(1);
  });
};

// Main execution
const main = () => {
  try {
    log(`${colors.bright}🚀 MiniDataMesh Development Setup${colors.reset}\n`);
    
    checkNodeVersion();
    checkDependencies();
    checkBuild();
    checkCommonIssues();
    displayProjectInfo();
    startDevServer();
    
  } catch (error) {
    logError('Setup failed: ' + error.message);
    process.exit(1);
  }
};

// Run the setup
main();
