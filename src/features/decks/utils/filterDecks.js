export function filterDecks(
  decks,
  {
    query = '',
    category = 'all',
    status = 'all',
    favoritesOnly = false,
    favorites = [],
    sort = 'name',
  } = {},
) {
  const normalized = query.toLocaleLowerCase('tr-TR').trim();
  return decks
    .filter(
      (deck) =>
        (category === 'all' || deck.category === category) &&
        (status === 'all' || deck.status === status) &&
        (!favoritesOnly || favorites.includes(deck.id)) &&
        (!normalized ||
          `${deck.title} ${deck.name} ${deck.effect} ${deck.note}`
            .toLocaleLowerCase('tr-TR')
            .includes(normalized)),
    )
    .sort((a, b) =>
      sort === 'category'
        ? a.category.localeCompare(b.category) || a.title.localeCompare(b.title, 'tr')
        : a.title.localeCompare(b.title, 'tr'),
    );
}
