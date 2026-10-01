import { AppItemImage } from '@/components/ui/AppItemImage';
import { getReputationMedalItem } from '../utils/reputationMedals';

const tiers = [
  ['500', 'Gri', '500', 'grey'],
  ['1000', 'Yeşil', '1000', 'green'],
  ['2000', 'Mavi', '2000', 'blue'],
  ['3000', 'Mor', '3000', 'fio'],
  ['Kırmızı görev', 'Kırmızı', 'Worship görevi', 'red'],
];

export function ReputationMilestones({ reputation }) {
  return (
    <ol className="rep-milestones" aria-label="Madalya aşamaları">
      {tiers.map(([reputationPoint, label, points, color]) => {
        const medalItem = getReputationMedalItem(reputation, reputationPoint, color);
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
