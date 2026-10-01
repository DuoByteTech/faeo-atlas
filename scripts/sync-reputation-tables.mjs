import fs from 'node:fs/promises';
import path from 'node:path';
import { reputations } from '../src/features/reputations/data/reputations.js';

const OUTPUT = path.resolve(
  'src/features/reputations/data/reputationTables.generated.js',
);

const BASE = 'https://warofdragons.com';
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/154 Safari/537.36';

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

function decodeHtml(value = '') {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function stripHtml(value = '') {
  return decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<br\s*\/?>/gi, ' / ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function absoluteUrl(value = '') {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return `${BASE}/${value.replace(/^\//, '')}`;
}

function parseCell(cellHtml) {
  const items = [];

  for (const match of cellHtml.matchAll(
    /<a\b[^>]*href=["']([^"']*artifact_info\.php\?[^"']*artikul_id=(\d+)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi,
  )) {
    const source = absoluteUrl(match[1]);
    const itemId = match[2];
    const inner = match[3];
    const imageMatch = inner.match(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/i);
    const titleMatch = inner.match(/<img\b[^>]*(?:title|alt)=["']([^"']+)["'][^>]*>/i);
    const name = stripHtml(inner) || decodeHtml(titleMatch?.[1] || '') || `Item ${itemId}`;

    items.push({
      itemId,
      name,
      sourceImage: absoluteUrl(imageMatch?.[1] || ''),
      source,
    });
  }

  const textWithoutItems = cellHtml.replace(
    /<a\b[^>]*href=["'][^"']*artifact_info\.php\?[^"']*artikul_id=\d+[^"']*["'][^>]*>[\s\S]*?<\/a>/gi,
    ' ',
  );

  return {
    text: stripHtml(textWithoutItems),
    items,
  };
}

function rowCells(rowHtml) {
  return [...rowHtml.matchAll(/<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(
    (match) => parseCell(match[2]),
  );
}

function cellText(cell) {
  return cell?.text || '';
}

function detectKind(headers, rows) {
  const headerText = headers.join(' ').toLocaleLowerCase('en-US');
  const bodyText = rows
    .flat()
    .map(cellText)
    .join(' ')
    .toLocaleLowerCase('en-US');

  if (
    headerText.includes('quicksilver') ||
    headerText.includes('exchange') ||
    headerText.includes('trade') ||
    bodyText.includes('quicksilver')
  ) {
    return 'exchange';
  }

  if (
    headerText.includes('medal') ||
    headerText.includes('reward') ||
    /\breputation\b/.test(headerText) &&
      /\b(500|1000|2000|3000|quest)\b/.test(bodyText)
  ) {
    return 'rewards';
  }

  return 'farm';
}

function isUsefulTable(headers, rows) {
  if (headers.length < 2 || rows.length < 1) {
    return false;
  }

  const cellCount = rows.reduce((total, row) => total + row.length, 0);

  if (cellCount < 4) {
    return false;
  }

  const joined = [
    ...headers,
    ...rows.flat().map((cell) => cellText(cell)),
  ]
    .join(' ')
    .trim();

  const itemCount = rows
    .flat()
    .reduce((total, cell) => total + (cell.items?.length || 0), 0);

  return joined.length >= 20 || itemCount > 0;
}

function tableTitle(index, kind) {
  if (kind === 'rewards') return `Resmî puan ve ödül tablosu ${index + 1}`;
  if (kind === 'exchange') return `Resmî takas tablosu ${index + 1}`;
  return `Resmî görev ve teslimat tablosu ${index + 1}`;
}

function parseTables(html, libraryId) {
  const result = [];
  const tables = [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)];

  tables.forEach((tableMatch, index) => {
    const tableHtml = tableMatch[1];
    const rowsRaw = [...tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];

    const parsedRows = rowsRaw
      .map((match) => rowCells(match[1]))
      .filter((cells) =>
        cells.some((cell) => cell.text || (cell.items && cell.items.length)),
      );

    if (parsedRows.length < 2) {
      return;
    }

    let headers = parsedRows[0].map((cell) => cell.text);
    let dataRows = parsedRows.slice(1);

    // İlk satır tek hücreliyse başlık gibi davranır; gerçek header bir sonraki satırdır.
    if (headers.length === 1 && dataRows[0]?.length > 1) {
      headers = dataRows[0].map((cell) => cell.text);
      dataRows = dataRows.slice(1);
    }

    const width = Math.max(
      headers.length,
      ...dataRows.map((row) => row.length),
    );

    if (width < 2) {
      return;
    }

    headers = Array.from({ length: width }, (_, i) => headers[i] || `Sütun ${i + 1}`);

    dataRows = dataRows
      .map((row) =>
        Array.from(
          { length: width },
          (_, i) => row[i] || { text: '', items: [] },
        ),
      )
      .filter((row) =>
        row.some((cell) => cell.text || (cell.items && cell.items.length)),
      );

    if (!isUsefulTable(headers, dataRows)) {
      return;
    }

    const kind = detectKind(headers, dataRows);

    result.push({
      id: `${libraryId}-generated-${result.length + 1}`,
      title: tableTitle(result.length, kind),
      kind,
      headers,
      rows: dataRows,
      source: `${BASE}/info/library/index.php?obj=cat&id=${libraryId}`,
    });
  });

  return result;
}

function serialize(data) {
  return `// Bu dosya scripts/sync-reputation-tables.mjs tarafından otomatik üretilir.
// Elle düzenlemeyin.

export const generatedReputationTables = ${JSON.stringify(data, null, 2)};
`;
}

const result = {};

for (const reputation of reputations) {
  const libraryId = reputation.tableLibraryId || reputation.libraryId;

  try {
    const url = `${BASE}/info/library/index.php?obj=cat&id=${libraryId}`;
    const html = await fetchText(url);
    const tables = parseTables(html, libraryId);

    if (tables.length) {
      result[libraryId] = tables;
      console.log(
        `✓ ${reputation.name}: ${tables.length} tablo bulundu (library ${libraryId})`,
      );
    } else {
      console.log(
        `- ${reputation.name}: kullanılabilir tablo bulunamadı (library ${libraryId})`,
      );
    }
  } catch (error) {
    console.warn(
      `! ${reputation.name} (library ${libraryId}) atlandı: ${error.message}`,
    );
  }

  await sleep(150);
}

await fs.writeFile(OUTPUT, serialize(result), 'utf8');

const reputationCount = Object.keys(result).length;
const tableCount = Object.values(result).reduce(
  (total, tables) => total + tables.length,
  0,
);

console.log(
  `\nTamamlandı: ${reputationCount} reputation için ${tableCount} tablo bulundu.`,
);
console.log(`Yazıldı: ${OUTPUT}`);
