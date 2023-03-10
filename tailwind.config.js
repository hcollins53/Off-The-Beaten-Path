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
      lion: '#BE8E71ff', 
      silver: '#CCBEB8ff',
      aliceBlue: '#DAE7EDff',
      blue: '#57819Cff',
      powderBlue: '#ADBBD4ff',
      caribbeanCurrent: '#116B77ff',
      midnightGreen: '#0F424Eff',
      carolinaBlue: '#73A8D0ff',
      blueunsell:' #17929Eff',
      buff: '#DA9C65ff',
      airSuperiorityBlue: '#82A7C5ff',
      paleDogwood:'#C4AFA7ff',
      platinum: '#DFE7E2ff',
      lightSand: '#EDC9AF',
      sunset: '#EECB9Fff',
      gamboge: '#F49B11ff',
    caramel:'#D47D44ff',
    apricot: '#FACBB7ff',
    ashGray: '#A7CAC3ff',
      }
    },
  },
  plugins: [require("daisyui")],
}
