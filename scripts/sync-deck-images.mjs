import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_FILE = 'src/features/decks/data/decks.js';
const OUT_DIR = 'public/images/decks';
const SOURCE = 'https://dwar-info.ru/?page_id=2816';
const UA = 'Mozilla/5.0 (compatible; FaeoAtlasDeckImageSync/2.0)';

// dwar-info "Список существующих колод" sırası.
// Aynı sıra sayfadaki gerçek deste görsellerinin sırasıdır.
const deckOrder = [
  'black-joker','white-joker','legacy-of-magish','magical-flora','great-mages','magical-rocks',
  'chaos','magical-fish','snow-deck','military-ranks-1','super-being','military-ranks-2',
  'underground-knights','mounts-of-faeo','legendary-humans-1','legendary-magmars-1',
  'legendary-humans-2','legendary-magmars-2','legendary-humans-3','legendary-magmars-3',
  'exiles-fortress','cursed-and-dead','gnome-runes','aladeya','guardians-of-truth','great-dragons',
  'water-nymph','sylph','zurkhass','miuri-tao','eshu-followers','battlefields','seasons','might',
  'gadgets-1','art-of-castling','farmers-gift','foundlings-of-rangas','legendary-cutthroats',
  'craftsmans-oracle','jesters','monsters-of-mystras','eternal-domain','secrets-of-the-deep',
  'forbidden-city','kings-burden','fortune','fates-punishments','elemental-anger','feast-for-ravens',
  'dragon-gift','great-cube','marauders','unity','emerald','malice'
];

const data = await fs.readFile(DATA_FILE, 'utf8');
await fs.mkdir(OUT_DIR, { recursive: true });

const page = await fetch(SOURCE, { headers: { 'user-agent': UA } });
if (!page.ok) throw new Error(`dwar-info HTTP ${page.status}`);
const html = await page.text();

const raw = [...html.matchAll(/<img[^>]+(?:src|data-src)=["']([^"']+)["']/gi)]
  .map((m) => {
    try { return new URL(m[1].replaceAll('&amp;', '&'), SOURCE).href; } catch { return null; }
  })
  .filter(Boolean);

const artifactImages = raw.filter((url) => /\/images\/data\/artifacts\//i.test(new URL(url).pathname));
const first = artifactImages.findIndex((url) => /rar_blackdeck\.gif$/i.test(url));
const last = artifactImages.findIndex((url) => /zlob_anim_deck_cards_0\.gif$/i.test(url));

if (first < 0 || last < first) {
  throw new Error('Dwar-info deste görsel bloğu bulunamadı.');
}

const deckImages = artifactImages.slice(first, last + 1);
if (deckImages.length !== deckOrder.length) {
  throw new Error(`Deste/görsel sırası uyuşmuyor: ${deckOrder.length} deste, ${deckImages.length} görsel. Yanlış eşleştirme yapılmadı.`);
}

const resolved = new Map();

for (let i = 0; i < deckOrder.length; i += 1) {
  const id = deckOrder[i];
  const url = deckImages[i];
  const response = await fetch(url, {
    headers: { 'user-agent': UA, referer: SOURCE },
    redirect: 'follow',
  });
  if (!response.ok) {
    console.warn(`MISS ${id}: image HTTP ${response.status}`);
    continue;
  }
  const type = response.headers.get('content-type') || '';
  if (!type.startsWith('image/')) {
    console.warn(`MISS ${id}: not an image`);
    continue;
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  const ext = path.extname(new URL(url).pathname).slice(1).toLowerCase() || 'gif';
  const file = `${id}.${ext}`;
  await fs.writeFile(path.join(OUT_DIR, file), bytes);
  resolved.set(id, `images/decks/${file}`);
  console.log(`OK ${id} <- ${url}`);
}

let next = data;
for (const [id, image] of resolved) {
  const record = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?image:\\s*)(?:null|'[^']*')`);
  next = next.replace(record, `$1'${image}'`);
}
await fs.writeFile(DATA_FILE, next);

console.log(`Resolved ${resolved.size}/${deckOrder.length} verified deck images from dwar-info.`);
if (resolved.size === 0) process.exitCode = 2;
