import { AppItemImage } from '@/components/ui/AppItemImage';
const tiers = [
  ['grey', 'Gri', '500'],
  ['green', 'Yeşil', '1000'],
  ['blue', 'Mavi', '2000'],
  ['purple', 'Mor', '3000'],
  ['red', 'Kırmızı', 'Worship görevi'],
];
export function ReputationMilestones({ reputation }) {
  return (
    <ol className="rep-milestones" aria-label="Madalya aşamaları">
      {tiers.map(([color, label, points]) => (
        <li key={color}>
          <AppItemImage
            src={`/images/reputations/medals/${reputation.id}-${color}.webp`}
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
