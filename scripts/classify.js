const fs = require("fs");
const files = ["HeroSection","ProjectSection","HorizontalShowcase","AmenitiesSection","GallerySection","ArticlesSection","CTASection","InteractiveVisual"];
for (const f of files) {
  const c = fs.readFileSync("app/homepage/components/" + f + ".jsx", "utf8");
  console.log("=== " + f + " ===");
  const anchors = c.split("export default");
  const body = anchors[anchors.length - 1];
  const cls = body.match(/<section[^>]*className="([^"]+)"/) || body.match(/<div[^>]*className="([^"]+)"/);
  if (cls) console.log("  ROOT: " + cls[1].slice(0, 260));
  const re = /className="([^"]*?(?:bg-\[#|bg-white|bg-black|bg-charcoal|bg-ivory|bg-\[var)[^"]*)"/g;
  let m, count = 0;
  while ((m = re.exec(body)) && count < 6) { console.log("  " + m[1].slice(0, 220)); count++; }
}