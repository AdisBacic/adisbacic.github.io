/**
 * Generates og.png (1200x630) with no dependencies.
 *
 * There is no image library on this machine, so the PNG is encoded by hand:
 * raw RGBA scanlines, deflated with node:zlib, wrapped in IHDR/IDAT/IEND with
 * hand-computed CRCs. Shapes are filled by point-in-polygon testing at 3x
 * supersampling, which is what keeps the diagonals from looking like stairs.
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const W = 1200, H = 630, SS = 3;

const NAVY = [10, 16, 36], GOLD = [244, 183, 64], CREAM = [242, 240, 234], BLUE = [107, 147, 255];

/* ── letterforms ─────────────────────────────────────────────────────────
   I, N, A and T are all straight edges, so each is just a set of polygons. */
const bar = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];

function letter(ch, x, y, w, h, t) {
  switch (ch) {
    case 'I':
      return [bar(x + (w - t) / 2, y, t, h)];
    case 'N':
      return [
        bar(x, y, t, h),
        bar(x + w - t, y, t, h),
        [[x + t, y], [x + t + t * 0.9, y], [x + w - t, y + h], [x + w - t - t * 0.9, y + h]],
      ];
    case 'A':
      return [
        [[x + w / 2 - t / 2, y], [x + w / 2 + t / 2, y], [x + w, y + h], [x + w - t, y + h]],
        [[x + w / 2 - t / 2, y], [x + w / 2 + t / 2, y], [x + t, y + h], [x, y + h]],
        bar(x + w * 0.24, y + h * 0.62, w * 0.52, t * 0.72),
      ];
    case 'T':
      return [bar(x, y, w, t), bar(x + (w - t) / 2, y, t, h)];
    default:
      return [];
  }
}

const shapes = [];
const push = (polys, color) => polys.forEach((p) => shapes.push({ poly: p, color }));

// A big, barely-there triangle on the right so the composition is not all
// weight on the left. Slightly lighter than the ground, not a shape you notice.
push([[[760, 630], [1010, 150], [1260, 630]]], [22, 32, 66]);

// Bosnian-flag triangle, the same mark as the favicon.
push([[[80, 250], [190, 90], [300, 250]]], GOLD);

// INAT
const LH = 150, LY = 300, LT = 30;
let lx = 80;
for (const ch of 'INAT') {
  const lw = ch === 'I' ? 60 : 120;
  push(letter(ch, lx, LY, lw, LH, LT), CREAM);
  lx += lw + 28;
}

// Accent rule + a blue tick, echoing the site's card top-borders.
push([bar(80, 510, 420, 12)], GOLD);
push([bar(520, 510, 90, 12)], BLUE);

function inside(poly, px, py) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

for (const s of shapes) {
  const xs = s.poly.map((p) => p[0]), ys = s.poly.map((p) => p[1]);
  s.bb = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

const px = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let r = NAVY[0], g = NAVY[1], b = NAVY[2];

    // Dotted grid, matching the page background.
    if ((x % 22 === 0) && (y % 22 === 0)) { r += 14; g += 16; b += 22; }

    let acc = null, cov = 0;
    for (const s of shapes) {
      const [x0, y0, x1, y1] = s.bb;
      if (x + 1 < x0 || x > x1 || y + 1 < y0 || y > y1) continue;
      let hits = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          if (inside(s.poly, x + (sx + 0.5) / SS, y + (sy + 0.5) / SS)) hits++;
        }
      }
      if (hits) { acc = s.color; cov = Math.max(cov, hits / (SS * SS)); }
    }
    if (acc) {
      r = Math.round(r + (acc[0] - r) * cov);
      g = Math.round(g + (acc[1] - g) * cov);
      b = Math.round(b + (acc[2] - b) * cov);
    }

    const i = (y * W + x) * 4;
    px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255;
  }
}

const raw = Buffer.alloc(H * (W * 4 + 1));
for (let y = 0; y < H; y++) {
  raw[y * (W * 4 + 1)] = 0; // filter: none
  px.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
}

const table = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc = (buf) => {
  let c = 0xffffffff;
  for (const byte of buf) c = table[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const cr = Buffer.alloc(4); cr.writeUInt32BE(crc(body));
  return Buffer.concat([len, body, cr]);
};

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

writeFileSync(
  new URL('../og.png', import.meta.url),
  Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
);
console.log('og.png skriven');
