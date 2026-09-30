import test from 'node:test';
import assert from 'node:assert/strict';
import { decks } from '../src/features/decks/data/decks.js';
import { categories } from '../src/features/decks/data/categories.js';
import { strategies } from '../src/features/guides/data/strategies.js';
import { filterDecks } from '../src/features/decks/utils/filterDecks.js';
test('Research records have unique identifiers, valid sources and complete core fields', () => {
  assert.equal(new Set(decks.map((d) => d.id)).size, decks.length);
  const categoryIds = new Set(categories.map((c) => c.id));
  for (const deck of decks) {
    assert.ok(categoryIds.has(deck.category));
    for (const field of [
      'id',
      'title',
      'name',
      'frequency',
      'effect',
      'note',
      'source',
      'updatedAt',
    ])
      assert.ok(deck[field], `${deck.id}: ${field}`);
    assert.equal(new URL(deck.source).protocol, 'https:');
    assert.ok(['verified', 'partial', 'ru'].includes(deck.status));
    if (deck.status === 'verified') assert.equal(new URL(deck.source).hostname, 'warofdragons.com');
  }
});
test('Every editorial pick references a verified existing deck', () => {
  for (const strategy of strategies)
    for (const [id] of strategy.picks)
      assert.equal(decks.find((d) => d.id === id)?.status, 'verified');
});
test('Search combines Turkish text, category, source status and favorites', () => {
  assert.ok(filterDecks(decks, { query: 'KRALIN' }).some((d) => d.id === 'kings-burden'));
  assert.equal(filterDecks(decks, { query: 'xyz-no-match' }).length, 0);
  assert.ok(filterDecks(decks, { status: 'ru' }).every((d) => d.status === 'ru'));
  assert.deepEqual(
    filterDecks(decks, { favoritesOnly: true, favorites: ['might'], category: 'boss' }),
    [],
  );
  assert.equal(filterDecks(decks, { favoritesOnly: true, favorites: ['might'] })[0].id, 'might');
});
