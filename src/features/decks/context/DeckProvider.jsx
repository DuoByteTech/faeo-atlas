import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DeckContext } from './DeckContext';
import { decks } from '../data/decks';

const validIds = new Set(decks.map((deck) => deck.id));
const validList = (value) =>
  Array.isArray(value) &&
  value.every((id) => validIds.has(id)) &&
  new Set(value).size === value.length;

function getLegacyOwnedDecks() {
  try {
    const value = JSON.parse(localStorage.getItem('faeo:favorites:v1'));
    return validList(value) ? value : [];
  } catch {
    return [];
  }
}

export function DeckProvider({ children }) {
  const [owned, setOwned] = useLocalStorage(
    'faeo:owned-decks:v1',
    getLegacyOwnedDecks(),
    validList,
  );
  const [compare, setCompare] = useLocalStorage(
    'faeo:compare:v1',
    [],
    (value) => validList(value) && value.length <= 3,
  );

  const toggleOwned = (id) =>
    setOwned((old) => (old.includes(id) ? old.filter((item) => item !== id) : [...old, id]));

  const toggleCompare = (id) =>
    setCompare((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : old.length < 3 ? [...old, id] : old,
    );

  return (
    <DeckContext.Provider
      value={{
        owned,
        compare,
        toggleOwned,
        toggleCompare,
        clearCompare: () => setCompare([]),
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}
