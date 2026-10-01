import { AppItemImage } from '@/components/ui/AppItemImage';

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
      {tiers.map(([color, label, points]) => (
        <li key={color}>
          <AppItemImage
            src={`/images/reputations/medals/${reputation.id}/${imagePrefix}_${color}.gif`}
            name={`${reputation.title} ${label.toLocaleLowerCase('tr')} madalya`}
            icon="Shield"
            tone={color}
          />

          <div>
            <strong>{label}</strong>
            <span>{points}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
