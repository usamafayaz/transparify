// Colors.js

const basicColors = [
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#00FFFF', // Cyan
  '#0000FF', // Blue
  '#800080', // Purple
  '#FF00FF', // Magenta
  '#FFA500', // Orange
  '#808080', // Grey
  '#000000', // Black
  '#FFFFFF', // White
  '#FFC0CB', // Pink
  '#808000', // Olive
  '#008080', // Teal
  '#800080', // Purple
  '#A52A2A', // Brown
  '#C0C0C0', // Silver
  '#FFD700', // Gold
  '#8A2BE2', // Violet
  '#5F9EA0', // Teal
  '#D2691E', // Copper
  '#9370DB', // Purple
  '#40E0D0', // Turquoise
  '#FF69B4', // Pink
  '#008080', // Teal
  '#FF00FF', // Purple
  '#FFD700', // Gold
  '#FF8C00', // Orange
];

const gradientColors = [
  ['#FF0000', '#FFFF00'], // Red to Yellow
  ['#FF0000', '#FF00FF'], // Red to Purple
  ['#FF0000', '#00FF00'], // Red to Green
  ['#FF0000', '#0000FF'], // Red to Blue
  ['#FFFF00', '#00FF00'], // Yellow to Green
  ['#FFFF00', '#0000FF'], // Yellow to Blue
  ['#00FF00', '#0000FF'], // Green to Blue
  ['#FF00FF', '#0000FF'], // Purple to Blue
  ['#FF0000', '#FFFFFF'], // Red to White
  ['#FFFF00', '#FFFFFF'], // Yellow to White
  ['#00FF00', '#FFFFFF'], // Green to White
  ['#0000FF', '#FFFFFF'], // Blue to White
  ['#800000', '#FF0000'], // Dark Red to Red
  ['#808000', '#FFFF00'], // Dark Yellow to Yellow
  ['#008000', '#00FF00'], // Dark Green to Green
  ['#000080', '#0000FF'], // Dark Blue to Blue
  ['#C0C0C0', '#FFFFFF'], // Light Grey to White
  ['#FFA500', '#FF0000'], // Orange to Red
  ['#A52A2A', '#FF0000'], // Brown to Red
  ['#8A2BE2', '#FF00FF'], // Purple to Pink
  ['#5F9EA0', '#00FF00'], // Teal to Green
  ['#D2691E', '#FF0000'], // Copper to Red
  ['#808080', '#FFFFFF'], // Grey to White
  ['#808080', '#000000'], // Grey to Black
  ['#FFD700', '#FF8C00'], // Gold to Orange
  ['#9370DB', '#FFB6C1'], // Purple to Pink
  ['#40E0D0', '#FF8C00'], // Turquoise to Orange
  ['#FF69B4', '#FFD700'], // Pink to Gold
  ['#008080', '#FF00FF'], // Teal to Purple
];

export {basicColors, gradientColors};

/*
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
}*/

//    "react-native-reanimated": "^3.8.1",
