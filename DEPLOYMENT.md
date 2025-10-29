# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - What's your project's name? **minidatamesh** (or your preferred name)
   - In which directory is your code located? **./** (current directory)

5. **Your app will be deployed!** You'll get a URL like `https://minidatamesh-xxx.vercel.app`

### Option 2: Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/MiniDataMesh.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"

## Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

## Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## Environment Variables

No environment variables are required for this demo. All data is generated client-side.

## Custom Domain (Optional)

### Vercel
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records

## Performance Optimization

The app is already optimized with:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression
- ✅ CDN delivery (Vercel/Netlify)

## Troubleshooting

### Build Errors
- Make sure Node.js version is 18+
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### Deployment Issues
- Ensure all files are committed to git
- Check that `dist` folder is generated after build
- Verify Vercel/Netlify build settings

### Performance Issues
- Check browser dev tools for errors
- Verify all assets are loading
- Test on different devices/browsers

## Monitoring

After deployment, monitor:
- **Performance**: Use Lighthouse in Chrome DevTools
- **Uptime**: Vercel/Netlify provide built-in monitoring
- **Analytics**: Add Google Analytics if needed

---

**Your data mesh demo is ready to impress! 🚀**
