import { useState } from 'react';
import { AppIcon } from './AppIcon';

export function AppItemImage({ src, name, tone = 'neutral', icon = 'Gem' }) {
  const [failedSource, setFailedSource] = useState(null);
  const [loadedSource, setLoadedSource] = useState(null);

  const loaded = src && loadedSource === src;

  const imageSrc = src
    ? /^https?:\/\//i.test(src)
      ? src
      : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`
    : null;

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
          src={imageSrc}
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
