// Colors.js

const basicColors = [
  '#0090ff', // Blue
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#00FFFF', // Cyan
  '#800080', // Purple
  '#FF00FF', // Magenta
  '#FFA500', // Orange
  '#808080', // Grey
  '#000000', // Black
  '#FFFFFF', // White
  '#FFC0CB', // Pink
  '#808000', // Olive
  '#008080', // Teal
  '#A52A2A', // Brown
  '#C0C0C0', // Silver
  '#FFD700', // Gold
  '#8A2BE2', // Violet
  '#5F9EA0', // Cadet Blue
  '#D2691E', // Copper
  '#9370DB', // Medium Purple
  '#40E0D0', // Turquoise
  '#FF69B4', // Hot Pink
  '#FF6347', // Tomato
  '#008080', // Teal
  '#4B0082', // Indigo
  '#B8860B', // Dark Goldenrod
  '#DA70D6', // Orchid
  '#B22222', // Firebrick
  '#FF4500', // Orange Red
  '#2E8B57', // Sea Green
  '#6A5ACD', // Slate Blue
  '#4682B4', // Steel Blue
  '#9ACD32', // Yellow Green
];

const gradientColors = [
  ['#FF0000', '#FFFF00'], // Red to Yellow
  ['#FF0000', '#FF00FF'], // Red to Purple
  ['#00FF00', '#FFFFFF'], // Green to White
  ['#0000FF', '#FFFFFF'], // Blue to White
  ['#800000', '#FF0000'], // Dark Red to Red
  ['#808000', '#FFFF00'], // Dark Yellow to Yellow
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
  ['#FF0000', '#0000FF'], // Red to Blue
  ['#FFFF00', '#00FF00'], // Yellow to Green
  ['#FFFF00', '#0000FF'], // Yellow to Blue
  ['#FF00FF', '#0000FF'], // Purple to Blue
  ['#FF0000', '#FFFFFF'], // Red to White
  ['#FFFF00', '#FFFFFF'], // Yellow to White
  ['#FFFFFF', '#87CEFA'], // White to Light Blue
  ['#FFFFFF', '#FFB6C1'], // White to Light Pink
  ['#FFFFFF', '#D8BFD8'], // White to Light Purple
  ['#FFFFFF', '#98FB98'], // White to Light Green
  ['#FFFFFF', '#F08080'], // White to Light Coral
  ['#FFFFFF', '#FFDAB9'], // White to Peach Puff
  ['#FFFFFF', '#E6E6FA'], // White to Lavender
  ['#FFFFFF', '#D3D3D3'], // White to Light Grey
  ['#FFFFFF', '#FFFFE0'], // White to Soft Yellow
  ['#FFFFFF', '#AFEEEE'], // White to Pale Turquoise
  ['#FFFF00', '#FFA500'], // Yellow to Orange
  ['#FFFACD', '#FFDAB9'], // Pale Yellow to Peach
  ['#FFFF00', '#FF8C00'], // Yellow to Deep Orange
  ['#FFFF00', '#FF7F50'], // Yellow to Coral
  ['#FFFFE0', '#F08080'], // Soft Yellow to Light Coral
  ['#FFFF00', '#DAA520'], // Yellow to Goldenrod
  ['#FFFF00', '#FF4500'], // Yellow to Dark Orange
  ['#FFFF00', '#FF6347'], // Yellow to Tomato
  ['#FF6347', '#FFA500'], // Tomato to Orange
  ['#FF4500', '#FF8C00'], // Orange Red to Deep Orange
  ['#FF7F50', '#FFD700'], // Coral to Gold
  ['#FF8C00', '#FF4500'], // Deep Orange to Orange Red
  ['#FF4500', '#FF6347'], // Orange Red to Tomato
  ['#FFA07A', '#FF4500'], // Light Salmon to Orange Red
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
