# Development Setup Scripts

This directory contains scripts to help you set up and run the MiniDataMesh project locally with additional checks and information.

## Available Scripts

### 1. Node.js Script (Cross-platform)
```bash
npm run dev:setup
```
- Checks Node.js version compatibility
- Verifies dependencies are installed
- Tests build process
- Displays project information
- Starts development server with helpful output

### 2. Windows Batch Script
```bash
npm run dev:windows
```
- Windows-specific setup script
- Checks Node.js and npm installation
- Runs the Node.js setup script
- Pauses for user input on errors

### 3. PowerShell Script
```bash
npm run dev:powershell
```
- PowerShell-specific setup script
- Colored output and better error handling
- Windows PowerShell execution policy bypass
- Comprehensive project information display

## What the Scripts Do

### Pre-flight Checks
- ✅ Node.js version compatibility (18+)
- ✅ npm availability
- ✅ Project directory validation
- ✅ Dependencies installation check
- ✅ Build process test

### Project Information
- 📊 Project name and description
- 🎯 Feature overview
- 🚀 Available npm scripts
- 📱 Local development URL

### Development Server
- 🚀 Starts Vite development server
- 🔧 Auto-reload on file changes
- 📱 Browser-ready at http://localhost:5173
- 💡 Clear instructions and status updates

## Usage Examples

### Quick Start (Recommended)
```bash
npm run dev:setup
```

### Windows Users
```bash
# Batch file
npm run dev:windows

# PowerShell
npm run dev:powershell
```

### Manual Start (if scripts fail)
```bash
npm install
npm run dev
```

## Troubleshooting

### Node.js Version Issues
- Update to Node.js 18+ from https://nodejs.org/
- Or use a Node version manager like nvm

### Permission Issues (Windows)
- Run PowerShell as Administrator
- Or use: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Port Already in Use
- The script will warn if port 5173 is occupied
- Kill existing processes or use a different port

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for network/proxy issues

### Tailwind CSS Issues
- If you see PostCSS plugin errors, the versions are incompatible
- The setup script uses stable versions: Tailwind CSS 3.4.0
- If issues persist, try: `npm install tailwindcss@3.4.0 postcss@8.4.31 autoprefixer@10.4.16`

## Script Features

- 🎨 Colored console output
- 📊 Progress indicators
- ⚠️ Warning messages
- ❌ Error handling
- ✅ Success confirmations
- 🔧 Helpful instructions
- 📱 Browser-ready notifications
