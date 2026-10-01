import { AppItemImage } from '@/components/ui/AppItemImage';
import { reputationItems } from '../data/reputationItems';
import { reputationTables } from '../data/reputationTables';

const tiers = [
  ['500', 'Gri', '500', 'grey'],
  ['1000', 'Yeşil', '1000', 'green'],
  ['2000', 'Mavi', '2000', 'blue'],
  ['3000', 'Mor', '3000', 'fio'],
  ['Kırmızı görev', 'Kırmızı', 'Worship görevi', 'red'],
];

const tierColorMap = {
  500: 'grey',
  1000: 'green',
  2000: 'blue',
  3000: 'fio',
  'Kırmızı görev': 'red',
};

const tierOrder = ['500', '1000', '2000', '3000', 'Kırmızı görev'];

function getMedalItem(reputation, reputationPoint) {
  const color = tierColorMap[reputationPoint];
  const explicitMedalId = color ? reputation.medalItemIds?.[color] : null;

  if (explicitMedalId) {
    return reputationItems[explicitMedalId] || null;
  }

  const tableId = reputation.tableLibraryId || reputation.libraryId;
  const tables = reputationTables[tableId] || [];

  const rewardsTable = tables.find(
    (table) =>
      table.kind === 'rewards' &&
      table.headers.some((header) =>
        header.toLocaleLowerCase('tr').startsWith('madalya'),
      ),
  );

  if (!rewardsTable) {
    return null;
  }

  const medalColumnIndex = rewardsTable.headers.findIndex((header) =>
    header.toLocaleLowerCase('tr').startsWith('madalya'),
  );

  if (medalColumnIndex === -1) {
    return null;
  }

  const reputationColumnIndex = rewardsTable.headers.findIndex(
    (header) => header.toLocaleLowerCase('tr').trim() === 'itibar',
  );

  let row = null;

  if (reputationColumnIndex !== -1) {
    row = rewardsTable.rows.find(
      (currentRow) => currentRow[reputationColumnIndex]?.text === reputationPoint,
    );
  } else {
    const tierIndex = tierOrder.indexOf(reputationPoint);
    row = tierIndex === -1 ? null : rewardsTable.rows[tierIndex];
  }

  if (!row) {
    return null;
  }

  const medalCell = row[medalColumnIndex];

  if (!medalCell?.items?.length) {
    return null;
  }

  const medalItemId = medalCell.items[0].itemId;

  return reputationItems[medalItemId] || null;
}

export function ReputationMilestones({ reputation }) {
  return (
    <ol className="rep-milestones" aria-label="Madalya aşamaları">
      {tiers.map(([reputationPoint, label, points, color]) => {
        const medalItem = getMedalItem(reputation, reputationPoint);

        const image = medalItem?.sourceImage || medalItem?.image || null;

        return (
          <li key={color}>
            <AppItemImage
              src={image}
              name={
                medalItem?.name || `${reputation.title} ${label.toLocaleLowerCase('tr')} madalya`
              }
              icon="Shield"
              tone={color}
            />

            <div>
              <strong>{label}</strong>
              <span>{points}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
