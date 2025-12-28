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
        // Light Theme Colors - Better contrast
        primary: '#0A84FF',
        'primary-hover': '#0066CC',
        'sent-bg': '#0A84FF',
        'received-bg': '#E9ECEF',
        'bg-main': '#FFFFFF',
        'bg-light': '#F8F9FA',
        'text-dark': '#212529',
        'text-light': '#FFFFFF',
        'text-secondary': '#6C757D',
        'border-color': '#DEE2E6',

        // Dark Theme Colors - Much better visibility
        'dark-primary': '#0A84FF',
        'dark-primary-hover': '#409CFF',
        'dark-sent-bg': '#0A84FF',
        'dark-received-bg': '#2C2C2E',
        'dark-bg-main': '#000000',
        'dark-bg-light': '#1C1C1E',
        'dark-text-dark': '#FFFFFF',
        'dark-text-light': '#FFFFFF',
        'dark-text-secondary': '#98989D',
        'dark-border-color': '#38383A',
      },
      borderRadius: {
        small: '8px',
        medium: '12px',
        large: '18px',
      },
      boxShadow: {
        light: '0 2px 8px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.15)',
        heavy: '0 8px 32px rgba(0, 0, 0, 0.2)',
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
