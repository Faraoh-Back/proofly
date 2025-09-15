const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Cores baseadas no databahn.ai
        'db-dark-blue': '#0a101e',
        'db-cyan': '#00f0ff',
        'db-blue-light': '#36a9e1', // Para alguns gradientes ou destaques
        'db-blue-dark': '#1e3a8a', // Para botões ou fundos mais escuros
      },
      fontFamily: {
        // Definindo a fonte Inter, já carregada pelo Next.js
        sans: ['Inter', 'sans-serif'],
      },
      // ANIMAÇÃO - Certifique-se de ter esta animação se estiver usando-a no placeholder
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.8' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
      },
    }
  },
  plugins: [require('tailwindcss-animate')]
};
