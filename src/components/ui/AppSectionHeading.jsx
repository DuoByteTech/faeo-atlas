export function AppSectionHeading({ eyebrow, title, description, children }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="muted mt-3 max-w-2xl">{description}</p>}
      </div>
      {children}
    </div>
  );
}
