import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_FILE = 'src/features/decks/data/decks.js';
const OUT_DIR = 'public/images/decks';
const UA = 'Mozilla/5.0 (compatible; FaeoAtlasDeckImageSync/1.0)';

const text = await fs.readFile(DATA_FILE, 'utf8');
const records = [...text.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?source:\s*'([^']+)'[\s\S]*?image:\s*(null|'[^']*')[\s\S]*?\n\s*\},/g)]
  .map((m) => ({ block: m[0], id: m[1], source: m[2], image: m[3] }));

await fs.mkdir(OUT_DIR, { recursive: true });

const bad = /(tbl-|\/images\/(?:d|s|1)\.gif|icon|smil|logo|arrow|button|corner|line|spacer|pixel|avatar|forum|flags?)/i;
const preferred = /\/images\/data\/(?:artifacts?|items?|cards?)\//i;

function urlsFromHtml(html, base) {
  const raw = [];
  for (const re of [
    /<img[^>]+(?:src|data-src)\s*=\s*["']([^"']+)["']/gi,
    /url\(\s*["']?([^"'\)]+)["']?\s*\)/gi,
  ]) {
    for (const m of html.matchAll(re)) raw.push(m[1]);
  }
  return [...new Set(raw)]
    .map((u) => {
      try { return new URL(u.replaceAll('&amp;', '&'), base).href; } catch { return null; }
    })
    .filter(Boolean)
    .filter((u) => !bad.test(new URL(u).pathname))
    .sort((a, b) => Number(preferred.test(b)) - Number(preferred.test(a)));
}

function extension(contentType, url) {
  const type = (contentType || '').toLowerCase();
  if (type.includes('webp')) return 'webp';
  if (type.includes('png')) return 'png';
  if (type.includes('jpeg') || type.includes('jpg')) return 'jpg';
  if (type.includes('gif')) return 'gif';
  const ext = path.extname(new URL(url).pathname).slice(1).toLowerCase();
  return ['webp','png','jpg','jpeg','gif'].includes(ext) ? ext.replace('jpeg','jpg') : null;
}

const resolved = new Map();
for (const deck of records) {
  if (!/^https?:\/\/(?:www\.)?(?:warofdragons\.com|w1\.dwar\.ru)\//i.test(deck.source)) continue;
  try {
    const page = await fetch(deck.source, { headers: { 'user-agent': UA } });
    if (!page.ok) throw new Error(`page HTTP ${page.status}`);
    const html = await page.text();
    const candidates = urlsFromHtml(html, deck.source);
    let saved = false;
    for (const candidate of candidates) {
      try {
        const res = await fetch(candidate, {
          headers: { 'user-agent': UA, referer: deck.source },
          redirect: 'follow',
        });
        if (!res.ok) continue;
        const type = res.headers.get('content-type') || '';
        if (!type.startsWith('image/')) continue;
        const bytes = new Uint8Array(await res.arrayBuffer());
        if (bytes.byteLength < 1000) continue;
        const ext = extension(type, candidate);
        if (!ext) continue;
        const file = `${deck.id}.${ext}`;
        await fs.writeFile(path.join(OUT_DIR, file), bytes);
        resolved.set(deck.id, `images/decks/${file}`);
        console.log(`OK  ${deck.id} <- ${candidate}`);
        saved = true;
        break;
      } catch {}
    }
    if (!saved) console.warn(`MISS ${deck.id}: no usable item image found`);
  } catch (error) {
    console.warn(`MISS ${deck.id}: ${error.message}`);
  }
}

let next = text;
for (const deck of records) {
  const image = resolved.get(deck.id);
  if (!image) continue;
  const oldBlock = deck.block;
  const newBlock = oldBlock.replace(/image:\s*(?:null|'[^']*')/, `image: '${image}'`);
  next = next.replace(oldBlock, newBlock);
}
await fs.writeFile(DATA_FILE, next);
console.log(`Resolved ${resolved.size}/${records.length} deck images.`);
if (resolved.size === 0) process.exitCode = 2;
