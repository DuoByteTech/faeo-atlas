import { AppItemImage } from '@/components/ui/AppItemImage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getReputationMedalItem } from '../utils/reputationMedals';

const tiers = [
  ['500', 'Gri', '500', 'grey'],
  ['1000', 'Yeşil', '1000', 'green'],
  ['2000', 'Mavi', '2000', 'blue'],
  ['3000', 'Mor', '3000', 'fio'],
  ['Kırmızı görev', 'Kırmızı', 'Worship görevi', 'red'],
];

const tierColors = new Set(tiers.map(([, , , color]) => color));

export function ReputationMilestones({ reputation }) {
  const [ownedMedal, setOwnedMedal] = useLocalStorage(
    `faeo-owned-medal-v1-${reputation.id}`,
    null,
    (value) => value === null || tierColors.has(value),
  );

  return (
    <div>
      <ol className="rep-milestones" aria-label="Madalya aşamaları">
        {tiers.map(([reputationPoint, label, points, color]) => {
          const medalItem = getReputationMedalItem(reputation, reputationPoint, color);
          const image = medalItem?.sourceImage || medalItem?.image || null;
          const isOwned = ownedMedal === color;

          return (
            <li key={color} className={isOwned ? 'is-owned' : undefined}>
              <button
                type="button"
                className="rep-milestone-button"
                aria-pressed={isOwned}
                aria-label={`${label} madalyayı ${isOwned ? 'bende yok olarak işaretle' : 'bende var olarak işaretle'}`}
                onClick={() => setOwnedMedal((current) => (current === color ? null : color))}
              >
                <AppItemImage
                  src={image}
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
                  {isOwned && <small>Bende var</small>}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="rep-milestone-help">
        Sahip olduğun madalyayı seç. Seçimin bu tarayıcıda saklanır.
      </p>
    </div>
  );
}
