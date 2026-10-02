import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_FILE = 'src/features/decks/data/decks.js';
const OUT_DIR = 'public/images/decks';
const IMAGE_BASE = 'https://dwar.ru/images/data/artifacts/';
const UA = 'Mozilla/5.0 (compatible; FaeoAtlasDeckImageSync/3.0)';

// Dwar-info "Список существующих колод" bölümündeki 56 aktif deste.
// Dosya adları 02.10.2026 tarihinde kaynak sayfadaki gerçek görsel hedeflerinden doğrulandı.
// Sıra bağımlılığı yoktur: her site deck id'si doğrudan kendi resmi oyun görseline bağlıdır.
const deckFiles = {
  'black-joker': 'rar_blackdeck.gif',
  'white-joker': 'rar_whitedeck.gif',
  'legacy-of-magish': 'coloda_full_magish.gif',
  'magical-flora': 'coloda_flora.gif',
  'great-mages': 'coloda_mag_fio.gif',
  'magical-rocks': 'coloda_kamni.gif',
  'chaos': 'coloda_haos_green.gif',
  'magical-fish': 'coloda_fish.gif',
  'snow-deck': 'coloda_finish2.gif',
  'military-ranks-1': 'koloda_ranks.gif',
  'super-being': 'koloda_sverxsyw.gif',
  'military-ranks-2': 'koloda_ranks2.gif',
  'underground-knights': 'kolodapodzemn_blue.gif',
  'mounts-of-faeo': 'koloda_maunt.gif',
  'legendary-humans-1': 'koloda_hum1_fio.gif',
  'legendary-magmars-1': 'koloda_magmar1_fio.gif',
  'legendary-humans-2': 'kol_leg_hum_2.gif',
  'legendary-magmars-2': 'kol_leg_mag_2.gif',
  'legendary-humans-3': 'kol_leg_hum_3.gif',
  'legendary-magmars-3': 'kol_leg_mag_3.gif',
  'exiles-fortress': 'coloda_krepost_blue.gif',
  'cursed-and-dead': 'koloda_mertv.gif',
  'gnome-runes': 'coloda_runy_green.gif',
  'aladeya': 'koloda_alad.gif',
  'guardians-of-truth': 'koloda_hraniteli.gif',
  'great-dragons': 'koloda_drak.gif',
  'water-nymph': 'koloda_nimf.gif',
  'sylph': 'koloda_silf.gif',
  'zurkhass': 'koloda_zur.gif',
  'miuri-tao': 'koloda_maur.gif',
  'eshu-followers': 'koloda_sverhskvern.gif',
  'battlefields': 'koloda_pb.gif',
  'seasons': 'koloda_event.gif',
  'might': 'coloda_mog.gif',
  'gadgets-1': 'sharper_card_set.gif',
  'art-of-castling': 'card_rokirovk_04.gif',
  'farmers-gift': 'dar_dobirchika_sbor.gif',
  'foundlings-of-rangas': 'rangas_koloda_04.gif',
  'legendary-cutthroats': 'koloda_gang_0.gif',
  'craftsmans-oracle': 'taro_05.gif',
  'jesters': 'image_Card9.gif',
  'monsters-of-mystras': 'koloda_1.png',
  'eternal-domain': 'deck_cards_04.gif',
  'secrets-of-the-deep': 'cards_ocean_pack1_04.gif',
  'forbidden-city': 'deck_cards_1_04.gif',
  'kings-burden': 'deck_1_04.gif',
  'fortune': 'deck_cards_fortune_04.gif',
  'fates-punishments': 'deck_cards_fatum_04.gif',
  'elemental-anger': 'wrath_stihiya_04.gif',
  'feast-for-ravens': 'deck_cards_1_0_4.gif',
  'dragon-gift': 'deck_cards_2_04.gif',
  'great-cube': 'velmozh_deck_04.gif',
  'marauders': 'koloda_marauders_red.gif',
  'unity': 'tuman_deck2_red_04.gif',
  'emerald': 'izum_deck_cards_1.gif',
  'malice': 'zlob_anim_deck_cards_0.gif',
};

const data = await fs.readFile(DATA_FILE, 'utf8');
await fs.mkdir(OUT_DIR, { recursive: true });

const resolved = new Map();
const failed = [];

for (const [id, sourceFile] of Object.entries(deckFiles)) {
  const url = new URL(sourceFile, IMAGE_BASE).href;
  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': UA,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      failed.push(`${id}: HTTP ${response.status}`);
      console.warn(`MISS ${id}: HTTP ${response.status} <- ${url}`);
      continue;
    }

    const type = response.headers.get('content-type') || '';
    if (!type.startsWith('image/')) {
      failed.push(`${id}: content-type ${type || 'unknown'}`);
      console.warn(`MISS ${id}: not an image (${type}) <- ${url}`);
      continue;
    }

    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.length < 100) {
      failed.push(`${id}: empty/suspicious image (${bytes.length} bytes)`);
      console.warn(`MISS ${id}: suspiciously small file <- ${url}`);
      continue;
    }

    const ext = path.extname(sourceFile).slice(1).toLowerCase() || 'gif';
    const file = `${id}.${ext}`;
    await fs.writeFile(path.join(OUT_DIR, file), bytes);
    resolved.set(id, `images/decks/${file}`);
    console.log(`OK ${id} <- ${url} (${bytes.length} bytes)`);
  } catch (error) {
    failed.push(`${id}: ${error.message}`);
    console.warn(`MISS ${id}: ${error.message} <- ${url}`);
  }
}

let next = data;
for (const [id, image] of resolved) {
  const record = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?image:\\s*)(?:null|'[^']*')`);
  next = next.replace(record, `$1'${image}'`);
}
await fs.writeFile(DATA_FILE, next);

console.log(`Resolved ${resolved.size}/${Object.keys(deckFiles).length} verified active deck images.`);

if (failed.length) {
  console.warn('Failed images:');
  for (const item of failed) console.warn(` - ${item}`);
}

// Kısmi ağ/CDN hataları yüzünden başarılı indirmeleri kaybetme.
// Hiçbir görsel indirilemediyse workflow'u hata ile durdur.
if (resolved.size === 0) process.exitCode = 2;
