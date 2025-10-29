/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx,html}',
    './app/**/*.{js,ts,jsx,tsx,html}',
    './pages/**/*.{js,ts,jsx,tsx,html}',
  ],
  // Disable purge entirely for Vercel
  purge: false,
  // Force include all classes to prevent purging
  safelist: [
    // Include everything - this should prevent any purging
    { pattern: /.*/ },
    // Explicitly include common classes we use
    'flex', 'grid', 'block', 'hidden', 'inline', 'inline-block',
    'w-full', 'h-full', 'min-h-screen', 'max-w-7xl', 'mx-auto',
    'p-1', 'p-2', 'p-3', 'p-4', 'p-6', 'p-8', 'px-4', 'py-2', 'py-4', 'py-8',
    'm-1', 'm-2', 'm-3', 'm-4', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-6',
    'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-6', 'ml-2', 'ml-4', 'mr-2', 'mr-4',
    'text-xs', 'text-sm', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
    'font-medium', 'font-semibold', 'font-bold',
    'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-200',
    'border', 'border-gray-200', 'border-gray-300',
    'rounded', 'rounded-md', 'rounded-lg', 'rounded-full',
    'shadow-sm', 'shadow-md',
    'hover:bg-gray-50', 'hover:bg-gray-100', 'hover:text-gray-600', 'hover:text-gray-700',
    'focus:ring-2', 'focus:ring-primary-500', 'focus:border-transparent',
    'transition', 'transition-colors', 'transition-all',
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
    'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4',
    'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4',
    'space-x-1', 'space-x-2', 'space-x-3', 'space-x-4', 'space-x-8',
    'space-y-2', 'space-y-3', 'space-y-4', 'space-y-6',
    'gap-1', 'gap-2', 'gap-4', 'gap-6',
    'items-center', 'items-start', 'justify-between', 'justify-center',
    'flex-col', 'flex-row', 'flex-wrap',
    'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4',
    'h-12', 'h-16', 'h-64', 'h-96', 'h-screen',
    'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-12', 'w-16',
    'h-2', 'h-3', 'h-4', 'h-5', 'h-6',
    'text-center', 'text-left', 'text-right',
    'uppercase', 'tracking-wider',
    'overflow-hidden', 'overflow-x-auto',
    'whitespace-nowrap',
    'divide-y', 'divide-gray-200',
    'last:border-b-0',
    'transform', '-translate-y-1/2',
    'sm:flex-row', 'sm:px-6',
    'md:grid-cols-2', 'md:grid-cols-4',
    'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4', 'lg:px-8',
    // Color classes
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-cyan-500', 'bg-lime-500',
    'text-blue-600', 'text-green-600', 'text-yellow-600', 'text-purple-600', 'text-red-600', 'text-cyan-600', 'text-lime-600',
    'border-blue-500', 'border-green-500', 'border-yellow-500', 'border-purple-500', 'border-red-500', 'border-cyan-500', 'border-lime-500',
    // Status classes
    'status-good', 'status-warning', 'status-error',
    'btn-primary', 'btn-secondary',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}