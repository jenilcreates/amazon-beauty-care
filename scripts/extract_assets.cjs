const { execSync } = require('child_process');
const fs = require('fs');

// We know the image is 2880 x 9134
// Let's find black horizontal bars and cards boundaries
// Let's sample key sections across the height
const output = execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png -scale 1x9134! txt:-').toString();
const lines = output.split('\n');

const rowColors = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const match = line.match(/0,(\d+):.*#([0-9A-Fa-f]{6})/);
  if (match) {
    rowColors.push({ y: parseInt(match[1]), hex: match[2].toUpperCase() });
  }
}

// Top announcement bar is black
const topBlackEnd = rowColors.find(r => r.y > 10 && r.hex !== '000000');
console.log('Top bar ends at y =', topBlackEnd ? topBlackEnd.y : 'not found');

// Let's find where the hero purple gradient ends and white begins
const heroEnd = rowColors.find(r => r.y > 500 && r.hex === 'FFFFFF');
console.log('Hero ends around y =', heroEnd ? heroEnd.y : 'not found');

// Let's find horizontal black lines (the headers of cards have thick black lines or card borders)
// Let's also check column 500x9134 to find the cards
fs.writeFileSync('scripts/row_colors_sample.json', JSON.stringify(rowColors.filter((r, idx) => idx % 50 === 0), null, 2));
