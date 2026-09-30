import { useContext } from 'react';
import { DeckContext } from '../context/DeckContext';
export function useDeckLibrary() {
  const context = useContext(DeckContext);
  if (!context) throw new Error('DeckProvider eksik');
  return context;
}
