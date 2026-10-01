import fs from 'node:fs/promises';
import path from 'node:path';
import { reputations } from '../src/features/reputations/data/reputations.js';

const OUTPUT = path.resolve(
  'src/features/reputations/data/reputationMedals.generated.js',
);

const BASE = 'https://warofdragons.com';
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/154 Safari/537.36';

const medalPatterns = [
  ['grey', /Medal\s+of\s+Recognition/i],
  ['green', /Medal\s+of\s+Friendship/i],
  ['blue', /Medal\s+of\s+Respect/i],
  ['fio', /Medal\s+of\s+Honou?r/i],
  ['red', /Medal\s+of\s+Worship/i],
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          Referer: BASE + '/',
          Accept: 'text/html,application/xhtml+xml',
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await sleep(500 * attempt);
      }
    }
  }

  throw lastError;
}

function stripHtml(value = '') {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function artifactIdsFromLibrary(html) {
  const ids = new Set();

  for (const match of html.matchAll(/artifact_info\.php\?[^"'<>]*artikul_id=(\d+)/gi)) {
    ids.add(match[1]);
  }

  return [...ids];
}

function detectMedalColor(html) {
  const text = stripHtml(html);

  for (const [color, pattern] of medalPatterns) {
    if (pattern.test(text)) {
      return color;
    }
  }

  return null;
}

function detectMedalName(html, color) {
  const text = stripHtml(html);
  const pattern = medalPatterns.find(([candidate]) => candidate === color)?.[1];
  const match = pattern ? text.match(pattern) : null;

  return match?.[0] || null;
}

function detectArtifactImage(html) {
  const patterns = [
    /(?:background|src)\s*=\s*["']?((?:https?:\/\/[^"' >]+\/)?images\/data\/artifacts\/[^"' >]+)/i,
    /(https?:\/\/warofdragons\.com\/images\/data\/artifacts\/[^"' <>]+)/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);

    if (match) {
      const value = match[1];

      return value.startsWith('http')
        ? value
        : `${BASE}/${value.replace(/^\//, '')}`;
    }
  }

  return null;
}

async function scanReputation(reputation) {
  const libraryUrl = `${BASE}/info/library/index.php?obj=cat&id=${reputation.libraryId}`;
  const libraryHtml = await fetchText(libraryUrl);
  const artifactIds = artifactIdsFromLibrary(libraryHtml);
  const found = {};

  console.log(
    `\n[${reputation.id}] library ${reputation.libraryId}: ${artifactIds.length} artifact bağlantısı`,
  );

  const queue = [...artifactIds];
  const workers = Array.from({ length: 6 }, async () => {
    while (queue.length && Object.keys(found).length < 5) {
      const itemId = queue.shift();

      try {
        const source = `${BASE}/artifact_info.php?artikul_id=${itemId}`;
        const html = await fetchText(source, 2);
        const color = detectMedalColor(html);

        if (!color || found[color]) {
          continue;
        }

        const sourceImage = detectArtifactImage(html);

        if (!sourceImage) {
          console.warn(`  ! ${color}: ${itemId} bulundu fakat GIF yolu çözülemedi`);
          continue;
        }

        found[color] = {
          itemId,
          name: detectMedalName(html, color) || `Medal ${color}`,
          sourceImage,
          source,
        };

        console.log(`  ✓ ${color}: ${itemId} -> ${sourceImage}`);
      } catch (error) {
        console.warn(`  ! item ${itemId}: ${error.message}`);
      }
    }
  });

  await Promise.all(workers);

  return found;
}

function serialize(data) {
  return `// Bu dosya scripts/sync-reputation-medals.mjs tarafından otomatik üretilir.
// Elle düzenlemeyin.

export const generatedReputationMedals = ${JSON.stringify(data, null, 2)};
`;
}

const result = {};

for (const reputation of reputations) {
  try {
    const medals = await scanReputation(reputation);

    if (Object.keys(medals).length) {
      result[reputation.id] = medals;
    }
  } catch (error) {
    console.warn(`\n[${reputation.id}] atlandı: ${error.message}`);
  }

  await sleep(150);
}

await fs.writeFile(OUTPUT, serialize(result), 'utf8');

const reputationCount = Object.keys(result).length;
const medalCount = Object.values(result).reduce(
  (total, medals) => total + Object.keys(medals).length,
  0,
);

console.log(
  `\nTamamlandı: ${reputationCount} itibar için ${medalCount} madalya bulundu.`,
);
console.log(`Yazıldı: ${OUTPUT}`);
