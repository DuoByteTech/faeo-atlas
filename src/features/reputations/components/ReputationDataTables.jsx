import { useState } from 'react';
import { reputationTables } from '../data/reputationTables';
import { generatedReputationTables } from '../data/reputationTables.generated';
import { reputationItems } from '../data/reputationItems';
import { AppItemImage } from '@/components/ui/AppItemImage';
import { AppIcon } from '@/components/ui/AppIcon';

export function ReputationItem({
  itemId,
  quantity,
  name,
  sourceImage,
  source,
}) {
  const catalogItem = reputationItems[itemId];

  const resolvedItem = catalogItem || {
    id: itemId,
    name: name || `Item ${itemId}`,
    sourceImage: sourceImage || null,
    source: source || null,
  };

  const image =
    sourceImage ||
    resolvedItem.sourceImage ||
    resolvedItem.image ||
    null;

  const resolvedName =
    name ||
    resolvedItem.name ||
    `Item ${itemId}`;

  const resolvedSource =
    source ||
    resolvedItem.source ||
    null;

  const content = (
    <>
      <AppItemImage src={image} name={resolvedName} />

      <span>
        <strong>{resolvedName}</strong>

        {quantity && <small>{quantity} adet</small>}
      </span>
    </>
  );

  return resolvedSource ? (
    <a
      className="reputation-item"
      href={resolvedSource}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <span className="reputation-item">{content}</span>
  );
}
function DataTable({ table }) {
  return (
    <article className="rep-data-table">
      <div className="rep-table-heading">
        <h3>{table.title}</h3>
        <a href={table.source} target="_blank" rel="noreferrer" className="text-link">
          Kaynak <AppIcon name="ExternalLink" size={14} />
        </a>
      </div>
      <div
        className="rep-table-scroll"
        tabIndex={0}
        role="region"
        aria-label={`${table.title}; geniş tablolar yatay kaydırılabilir`}
      >
        <table>
          <caption className="sr-only">{table.title}</caption>
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th scope="col" key={i}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    {cell.text && <p className="rep-cell-text">{cell.text}</p>}
                    {cell.items.length > 0 && (
                      <div className="rep-cell-items">
                        {cell.items.map((item, k) => (
                          <ReputationItem key={`${item.itemId}-${k}`} {...item} />
                        ))}
                      </div>
                    )}
                    {!cell.text && !cell.items.length && <span className="muted">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
export function ReputationDataTables({ reputation }) {
  const [view, setView] = useState('farm');
  const tableId = reputation.tableLibraryId || reputation.libraryId;
  const staticTables = reputationTables[tableId] || [];
  const generatedTables = generatedReputationTables[tableId] || [];
  const all = staticTables.length ? staticTables : generatedTables;
  const tabs = [
    ['farm', 'Görevler ve teslimatlar'],
    ['rewards', 'Puan ve ödüller'],
    ['exchange', 'Takas oranları'],
  ].filter(([key]) => all.some((t) => t.kind === key));
  const active = tabs.some(([key]) => key === view) ? view : tabs[0]?.[0];
  const tables = all.filter((t) => t.kind === active);
  return (
    <section className="reputation-reference" id="puan-tablolari">
      <p className="eyebrow">PUAN PUAN İLERLEME</p>
      <h2>Görev, teslimat ve ödül tabloları</h2>
      <p className="muted mt-3">
        Hangi aşamada ne yapacağını ve hangi eşyaya erişeceğini karşılaştır. Eşya adına tıklayarak
        oyun içi açıklamasını açabilirsin.
      </p>
      <div className="rep-tab-list" role="tablist" aria-label="İtibar tabloları">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            id={`rep-tab-${key}`}
            role="tab"
            aria-selected={active === key}
            aria-controls="rep-table-panel"
            onClick={() => setView(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="rep-table-note">
        <AppIcon name="CircleHelp" size={19} />
        <p>
          {active === 'rewards'
            ? 'Bu tablolar çoğunlukla dükkân veya tarif erişimidir: puana ulaşmak, listelenen eşyaları ücretsiz olarak çantana eklemez. Fiyat, ek görev ve kullanım seviyesi eşya sayfasında belirtilir.'
            : active === 'exchange'
              ? 'Quicksilver sütunları kaynak başına takas miktarıdır; kazanılan itibar değildir. Parantez içindeki puan, avın itibar üst sınırını gösterir.'
              : '“Üst sınır” yöntemin itibar vermeyi bıraktığı puandır. Kaynak seti miktarları görev başınadır; 0’dan 3000’e toplam maliyet değildir. Eşya adları oyunda aranabilmesi için özgün bırakılmıştır.'}
        </p>
      </div>
      <div id="rep-table-panel" role="tabpanel" aria-labelledby={`rep-tab-${active}`}>
        {tables.map((t) => (
          <DataTable key={t.id} table={t} />
        ))}
      </div>
      {reputation.id === 'underground-knights' && (
        <p className="notice mt-5">
          * Spawn of Spilt Blood cesaret ödülü: 2000 itibar. ** Zafer serileri ve etkinlik cesaret
          ödülü: 3000 itibar. *** Revival of the Ancient Guard: 11+ seviye, Awakening görevi
          tamamlanmış olmalı. Etkinlik takvimi sunucu duyurusuyla değişebilir.
        </p>
      )}
    </section>
  );
}
