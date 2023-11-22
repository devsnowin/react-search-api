import { Synonyms } from '@/hooks/useSynonyms';

const API_URL = String(import.meta.env.VITE_API_URL);

export async function fetchSynonyms(value: string): Promise<Synonyms[]> {
  const res = await fetch(`${API_URL}/words?rel_syn=${value}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
  return [];
}
