import { AppIcon } from './AppIcon';
export function AppEmptyState({ title, description, children }) {
  return (
    <div className="empty-state">
      <AppIcon name="Search" size={32} />
      <h2>{title}</h2>
      <p className="muted">{description}</p>
      {children}
    </div>
  );
}
