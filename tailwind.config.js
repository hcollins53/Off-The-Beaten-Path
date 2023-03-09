/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ['Pacifico'],
        title: ['Special Elite']
      }, 
      colors: {
      timberwolf: '#D8D5D3ff',
      lion: '#BE8E71ff',
      silver: '#CCBEB8ff',
      aliceBlue: '#DAE7EDff',
      blue: '#57819Cff',
      frenchGray: '#A9ADB3ff',
      powderBlue: '#ADBBD4ff',
      caribbeanCurrent: '#116B77ff',
      davysGray: '#555F61ff',
      midnightGreen: '#0F424Eff',
      carolinaBlue: '#73A8D0ff',
      blueunsell:' #17929Eff',
      celticBlue: '#036DD0ff',
      buff: '#DA9C65ff',
      airSuperiorityBlue: '#82A7C5ff',
      paleDogwood:'#C4AFA7ff',
      platinum: '#DFE7E2ff',
      }
    },
  },
  plugins: [require("daisyui")],
}
