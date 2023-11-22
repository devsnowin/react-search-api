import { useState } from 'react';
import styles from './home.module.css';
import Spinner from '@/component/ui/spinner';
import { useSysnonyms } from '@/hooks/useSynonyms';
import { debounce } from '@/lib/utils';

export default function HomePage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const { loading, getSynonyms, synonyms, setSynonyms } = useSysnonyms();

  // Assuming debounce is the debounce function you've defined
  const debouncedHandleSearch = debounce(async (value: string) => {
    if (value.trim() !== '') {
      await getSynonyms(value);
    }
  }, 1000); // Set an appropriate delay (e.g., 300 milliseconds)

  const handleSearch: React.ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault();
    debouncedHandleSearch(searchValue);
  };

  const handleSynonymsClick = async (word: string) => {
    setSearchValue(word);
    await getSynonyms(word);
  };

  return (
    <div className={styles['home']}>
      <div className={styles.home_container}>
        <header className={styles.header}>
          <form className={styles['header_search-bar']} onSubmit={handleSearch}>
            <label htmlFor='search' hidden>
              Search word
            </label>
            <input
              type='text'
              name='search'
              value={searchValue}
              onChange={(e) => {
                const value = e.currentTarget.value;
                if (value.trim() === '') setSynonyms(null);
                setSearchValue(value);
                debouncedHandleSearch(value);
              }}
              className={styles['search-bar_input']}
              placeholder='search anything...'
              autoComplete='off'
            />
            <button>{loading ? <Spinner /> : 'Search'}</button>
          </form>
        </header>
        {synonyms && synonyms.length > 0 ? (
          <div className={styles['search-results']}>
            <ul className={styles['search-results_wrapper']}>
              {synonyms.map((synonym, i) => (
                <li key={`${synonym.word}-${i}`}>
                  <a
                    onClick={async () =>
                      await handleSynonymsClick(synonym.word)
                    }
                  >
                    {synonym.word}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !loading &&
          synonyms && <p className={styles['empty-text']}>No synonym found</p>
        )}
      </div>
    </div>
  );
}
