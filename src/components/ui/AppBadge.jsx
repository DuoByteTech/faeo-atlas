export function AppBadge({ children, tone = 'neutral' }) {
  return <span className={`app-badge tone-${tone}`}>{children}</span>;
}
