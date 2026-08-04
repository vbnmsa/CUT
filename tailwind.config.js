/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        panel: '#2A2A2A',
        bone: '#F4F1EA',
        red: '#900020',
        redHover: '#B3123A',
        muted: '#9B978F',
        line: '#2A2A2A',
        light: '#E5E7EB',
        blue: '#900020'
      },
      fontFamily: {
        podium: ['FSP DEMO - PODIUM Sharp 4.11', 'Space Grotesk', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
