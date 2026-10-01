import { reputationItems } from '../data/reputationItems';
import { reputationTables } from '../data/reputationTables';
import { generatedReputationMedals } from '../data/reputationMedals.generated';

const tierColorMap = {
  500: 'grey',
  1000: 'green',
  2000: 'blue',
  3000: 'fio',
  'Kırmızı görev': 'red',
};

const tierOrder = ['500', '1000', '2000', '3000', 'Kırmızı görev'];

function normalize(value = '') {
  return value.toLocaleLowerCase('tr').trim();
}

function isMedalHeader(header) {
  return normalize(header).startsWith('madalya');
}

function isReputationHeader(header) {
  return normalize(header) === 'itibar';
}

function getExplicitMedal(reputation, color) {
  const itemId = reputation.medalItemIds?.[color];

  if (!itemId) {
    return null;
  }

  return reputationItems[itemId] || null;
}

function getGeneratedMedal(reputation, color) {
  return generatedReputationMedals[reputation.id]?.[color] || null;
}

function getTableMedal(reputation, reputationPoint) {
  const tableId = reputation.tableLibraryId || reputation.libraryId;
  const tables = reputationTables[tableId] || [];

  const rewardsTable = tables.find(
    (table) => table.kind === 'rewards' && table.headers.some(isMedalHeader),
  );

  if (!rewardsTable) {
    return null;
  }

  const medalColumnIndex = rewardsTable.headers.findIndex(isMedalHeader);

  if (medalColumnIndex === -1) {
    return null;
  }

  const reputationColumnIndex = rewardsTable.headers.findIndex(isReputationHeader);

  let row = null;

  if (reputationColumnIndex !== -1) {
    row = rewardsTable.rows.find(
      (currentRow) => currentRow[reputationColumnIndex]?.text === reputationPoint,
    );
  } else {
    const tierIndex = tierOrder.indexOf(reputationPoint);
    row = tierIndex === -1 ? null : rewardsTable.rows[tierIndex];
  }

  const medalItemId = row?.[medalColumnIndex]?.items?.[0]?.itemId;

  return medalItemId ? reputationItems[medalItemId] || null : null;
}

export function getReputationMedalItem(reputation, reputationPoint, requestedColor) {
  const color = requestedColor || tierColorMap[reputationPoint];

  if (!color) {
    return null;
  }

  return (
    getExplicitMedal(reputation, color) ||
    getGeneratedMedal(reputation, color) ||
    getTableMedal(reputation, reputationPoint)
  );
}

export function getRedMedalItem(reputation) {
  return getReputationMedalItem(reputation, 'Kırmızı görev', 'red');
}
