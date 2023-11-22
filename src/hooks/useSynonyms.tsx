import { fetchSynonyms } from '@/lib/api';
import { useState } from 'react';

export type Synonyms = {
  word: string;
  score: number;
};
export const useSysnonyms = () => {
  const [synonyms, setSynonyms] = useState<Synonyms[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSynonyms = (word: string) => {
    setLoading(true);
    return fetchSynonyms(word)
      .then(setSynonyms)
      .then(() => setLoading(false));
  };

  return { loading, getSynonyms, synonyms, setSynonyms };
};
