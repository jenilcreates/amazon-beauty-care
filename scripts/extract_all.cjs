const { execSync } = require('child_process');

console.log('Extracting high-resolution visual assets from Figma composite...');

// 1. Hero banner & bottles
// Full Hero: y=112 to y=1240, width 2880
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[2880x1130+0+112] public/assets/crops/hero_full.png');
// Hero products right side: x=1360, y=112, w=1520, h=1130
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[1520x1130+1360+112] public/assets/crops/hero_products.png');

// 2. The 5 Listicle product cards (Left visual side of each card)
// Card 1: Augustinus Bader + Vogue quote (w=632, h=684, x=615, y=1491)
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[632x684+615+1491] public/assets/crops/card1_augustinus.png');

// Card 2: Sunday Riley C.E.O. (w=632, h=632, x=615, y=2437)
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[632x632+615+2437] public/assets/crops/card2_sunday_riley.png');

// Card 3: Nuxe Huile Prodigieuse (w=632, h=632, x=615, y=3365)
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[632x632+615+3365] public/assets/crops/card3_nuxe.png');

// Card 4: Caudalie Beauty Elixir (w=632, h=632, x=615, y=4327)
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[632x632+615+4327] public/assets/crops/card4_caudalie.png');

// Card 5: Embryolisse (w=632, h=632, x=615, y=5255)
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[632x632+615+5255] public/assets/crops/card5_embryolisse.png');

// 3. Spotlight bottle & thumbnails
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[850x950+380+6420] -trim +repage public/assets/crops/spotlight_bottle.png');

// Thumbnail strip: x=430 to 1110, y=7530 to 7660
execSync('convert public/assets/aistudio/Desktop_-_1_111fe488.png[680x120+435+7540] -trim +repage public/assets/crops/spotlight_thumbnails_strip.png');

// 6 individual thumbnails from the strip
// Let's crop the 6 individual thumbnail items for interactive switching!
// Total width ~ 670px, each is ~90px wide with ~20px gap
const thumbX = 437;
const thumbY = 7545;
const thumbW = 92;
const thumbH = 92;
const thumbGap = 20;

for (let i = 0; i < 6; i++) {
  const curX = thumbX + i * (thumbW + thumbGap);
  execSync(`convert public/assets/aistudio/Desktop_-_1_111fe488.png[${thumbW}x${thumbH}+${curX}+${thumbY}] public/assets/crops/thumb_${i + 1}.png`);
}

console.log('All visual assets extracted successfully!');
