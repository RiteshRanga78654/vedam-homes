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
const refs = new Set();
for (const f of files) {
  const c = fs.readFileSync(f, "utf8");
  for (const m of c.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    if (m[1].includes("homepage/components") || m[1].startsWith("@/app/components"))
      refs.add(f + "  ->  " + m[1]);
  }
}
console.log([...refs].sort().join("\n"));