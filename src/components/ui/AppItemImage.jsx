import { useState } from 'react';
import { AppIcon } from './AppIcon';

// Replacing a file at the documented public path requires no component changes.
export function AppItemImage({ src, name, tone = 'neutral', icon = 'Gem' }) {
  const [failedSource, setFailedSource] = useState(null);
  const [loadedSource, setLoadedSource] = useState(null);
  const loaded = src && loadedSource === src;
  return (
    <span className={`app-item-image image-tone-${tone}`}>
      <span
        role="img"
        aria-hidden={loaded ? true : undefined}
        aria-label={`${name} — görsel henüz eklenmedi`}
        title={`${name} — görsel bekleniyor`}
      >
        <AppIcon name={icon} size={22} />
      </span>
      {src && failedSource !== src && (
        <img
          src={`${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`}
          alt={name}
          loading="lazy"
          width="48"
          height="48"
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoadedSource(src)}
          onError={() => setFailedSource(src)}
        />
      )}
    </span>
  );
}
