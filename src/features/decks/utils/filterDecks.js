export function filterDecks(
  decks,
  {
    query = '',
    category = 'all',
    status = 'all',
    ownership = 'all',
    owned = [],
    sort = 'name',
  } = {},
) {
  const normalized = query.toLocaleLowerCase('tr-TR').trim();

  return decks
    .filter((deck) => {
      const isOwned = owned.includes(deck.id);

      return (
        (category === 'all' || deck.category === category) &&
        (status === 'all' || deck.status === status) &&
        (ownership === 'all' ||
          (ownership === 'owned' && isOwned) ||
          (ownership === 'missing' && !isOwned)) &&
        (!normalized ||
          `${deck.title} ${deck.name} ${deck.effect} ${deck.note}`
            .toLocaleLowerCase('tr-TR')
            .includes(normalized))
      );
    })
    .sort((a, b) =>
      sort === 'category'
        ? a.category.localeCompare(b.category) || a.title.localeCompare(b.title, 'tr')
        : a.title.localeCompare(b.title, 'tr'),
    );
}
