import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        primary: '#007AFF',
        'primary-hover': '#0056b3',
        'sent-bg': '#007AFF',
        'received-bg': '#F2F2F7',
        'bg-main': '#FFFFFF',
        'bg-light': '#F5F5F7',
        'text-dark': '#1c1c1e',
        'text-light': '#ffffff',
        'text-secondary': '#8A8A8E',
        'border-color': '#E5E5E5',

        // Dark Theme Colors (with dark- prefix)
        'dark-primary': '#0b84ff',
        'dark-primary-hover': '#2563eb',
        'dark-sent-bg': '#0b84ff',
        'dark-received-bg': '#2c2c2e',
        'dark-bg-main': '#121212',
        'dark-bg-light': '#1c1c1e',
        'dark-text-dark': '#e1e1e1',
        'dark-text-light': '#ffffff',
        'dark-text-secondary': '#8d8d92',
        'dark-border-color': '#3a3a3c',
      },
      borderRadius: {
        small: '8px',
        medium: '12px',
        large: '20px',
      },
      boxShadow: {
        light: '0 2px 12px rgba(0, 0, 0, 0.08)',
        medium: '0 4px 20px rgba(0, 0, 0, 0.12)',
        heavy: '0 10px 40px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
export default config
