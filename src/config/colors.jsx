// Colors.js

const basicColors = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFFFFF',
  '#800000',
  '#808000',
  '#008000',
  '#800080',
  '#008080',
  '#000080',
  '#C0C0C0',
  '#FFA500',
  '#A52A2A',
  '#8A2BE2',
  '#5F9EA0',
  '#D2691E',
];

function getRandomColor() {
  return basicColors[Math.floor(Math.random() * basicColors.length)];
}

const gradientColors = [];
for (let i = 0; i < 20; i++) {
  const color1 = getRandomColor();
  let color2 = getRandomColor();
  while (color1 === color2) {
    color2 = getRandomColor();
  }
  gradientColors.push([color1, color2]);
}

export {basicColors, gradientColors};
