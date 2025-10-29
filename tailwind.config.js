/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx,html}',
    './app/**/*.{js,ts,jsx,tsx,html}',
    './pages/**/*.{js,ts,jsx,tsx,html}',
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
  // Keep any dynamic classes that Tailwind can't see at build time
  safelist: [
    // Grid patterns
    { pattern: /(grid|grid-cols|col-span|row-span)-\d+/ },
    // Sizes like w-*, h-*
    { pattern: /^(w|h|min-w|min-h|max-w|max-h)-.+/ },
    // Colors you build dynamically e.g. `text-${color}-600`
    { pattern: /(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/ },
    // Fill and stroke patterns
    { pattern: /(fill|stroke)-(current|none)/ },
    // Common utility classes used in components
    'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
    'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4',
    'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4',
    'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4', 'w-full',
    'h-64', 'h-96', 'h-screen', 'min-h-screen',
    // Status classes
    'status-good', 'status-warning', 'status-error',
    'btn-primary', 'btn-secondary',
    // Chart and visualization classes
    'w-16', 'h-2', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500', 'bg-cyan-500', 'bg-lime-500',
  ],
}