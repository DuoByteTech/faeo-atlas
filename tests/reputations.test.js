import test from 'node:test';
import assert from 'node:assert/strict';
import { reputations } from '../src/features/reputations/data/reputations.js';
import { reputationTables } from '../src/features/reputations/data/reputationTables.js';
import { reputationItems } from '../src/features/reputations/data/reputationItems.js';
import fs from 'node:fs';

test('Every reputation has sourced, rectangular tables and resolvable item/image references', () => {
  const manifest = JSON.parse(
    fs.readFileSync(new URL('../public/images/reputations/manifest.json', import.meta.url), 'utf8'),
  );
  const paths = new Set(manifest.map((r) => r.file));
  assert.equal(paths.size, manifest.length);
  for (const rep of reputations) {
    const tables = reputationTables[rep.tableLibraryId || rep.libraryId];
    assert.ok(tables?.length, rep.id);
    for (const t of tables) {
      assert.match(t.source, /^https:\/\/warofdragons\.com\//);
      for (const row of t.rows) {
        assert.equal(row.length, t.headers.length, t.id);
        for (const cell of row)
          for (const ref of cell.items) {
            const item = reputationItems[ref.itemId];
            assert.ok(item, ref.itemId);
            assert.ok(paths.has('public' + item.image));
          }
      }
    }
    for (const material of rep.materials) {
      assert.ok(reputationItems[material.itemId]);
      assert.ok(paths.has('public' + material.image));
    }
  }
});
test('Mystic resource quantities and faction-specific rewards stay distinct', () => {
  const first = reputationTables['312'].find((t) => t.kind === 'farm').rows[0][1].items;
  assert.deepEqual(
    first.map((i) => i.quantity),
    ['200', '200', '20', '20', '50', '50'],
  );
  assert.equal(reputations.find((r) => r.id === 'stone-lotus').tableLibraryId, 218);
  assert.equal(reputations.find((r) => r.id === 'red-axes').tableLibraryId, 219);
  assert.ok(reputationTables['83'].some((t) => t.kind === 'exchange'));
  assert.equal(reputations.filter((r) => r.partial).length, 1);
});
