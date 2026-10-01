import { AppItemImage } from '@/components/ui/AppItemImage';
import { reputationItems } from '../data/reputationItems';

const tiers = [
  ['grey', 'Gri', '500'],
  ['green', 'Yeşil', '1000'],
  ['blue', 'Mavi', '2000'],
  ['fio', 'Mor', '3000'],
  ['red', 'Kırmızı', 'Worship görevi'],
];

export function ReputationMilestones({ reputation }) {
  const imagePrefix = reputation.id.replaceAll('-', '_');

  return (
    <ol className="rep-milestones" aria-label="Madalya aşamaları">
      {tiers.map(([color, label, points]) => {
        const medalItemId = reputation.medalItemIds?.[color];
        const medalItem = medalItemId ? reputationItems[medalItemId] : null;

        const medalSource =
          medalItem?.sourceImage ||
          medalItem?.image ||
          `/images/reputations/medals/${reputation.id}/${imagePrefix}_${color}.gif`;

        return (
          <li key={color}>
            <AppItemImage
              src={medalSource}
              name={
                medalItem?.name ||
                `${reputation.title} ${label.toLocaleLowerCase('tr')} madalya`
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
