const fs = require("fs");
const files = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = d + "\\" + f;
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (f.endsWith(".jsx") || f.endsWith(".js")) files.push(p);
  }
}
walk("app");
const skip = ["vedam-landscaped", "project", "homepage\\components\\HeroSection.jsx", "homepage\\components\\InteractiveVisual.jsx", "homepage\\components\\CTASection.jsx", "homepage\\components\\Footer.jsx", "homepage\\components\\Header.jsx"];
const hexes = {};
for (const f of files) {
  if (skip.some((s) => f.includes(s))) continue;
  const c = fs.readFileSync(f, "utf8");
  const re = /#[0-9a-fA-F]{6}/g;
  let m;
  while ((m = re.exec(c))) {
    const h = m[0].toLowerCase();
    (hexes[h] = hexes[h] || []).push(f.replaceAll("app\\", ""));
  }
}
for (const h of Object.keys(hexes).sort((a, b) => hexes[b].length - hexes[a].length)) {
  console.log(h + "  (" + hexes[h].length + ")  " + [...new Set(hexes[h])].join(", "));
}