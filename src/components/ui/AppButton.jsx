import { Link } from 'react-router-dom';
export function AppButton({ children, to, variant = 'primary', className = '', ...props }) {
  const classes = `app-button app-button--${variant} ${className}`;
  return to ? (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  ) : (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
