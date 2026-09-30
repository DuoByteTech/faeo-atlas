import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DeckContext } from './DeckContext';
import { decks } from '../data/decks';
const validIds = new Set(decks.map((deck) => deck.id));
const validList = (value) =>
  Array.isArray(value) &&
  value.every((id) => validIds.has(id)) &&
  new Set(value).size === value.length;
export function DeckProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('faeo:favorites:v1', [], validList);
  const [compare, setCompare] = useLocalStorage(
    'faeo:compare:v1',
    [],
    (value) => validList(value) && value.length <= 3,
  );
  const toggleFavorite = (id) =>
    setFavorites((old) => (old.includes(id) ? old.filter((item) => item !== id) : [...old, id]));
  const toggleCompare = (id) =>
    setCompare((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : old.length < 3 ? [...old, id] : old,
    );
  return (
    <DeckContext.Provider
      value={{
        favorites,
        compare,
        toggleFavorite,
        toggleCompare,
        clearCompare: () => setCompare([]),
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}
