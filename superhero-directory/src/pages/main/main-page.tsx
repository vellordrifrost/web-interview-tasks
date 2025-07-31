import { useSearchParams } from 'react-router-dom';

import SearchInput from '~pages/main/ui/SearchInput.tsx';
import SuperheroList from '~pages/main/ui/SuperheroList.tsx';

import { superheroApi } from '~entities/superhero';

import { useDebounceValue } from 'usehooks-ts';

export function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const [debouncedQuery] = useDebounceValue(query, 300);

  const setQuery = (value: string) =>
    setSearchParams(value ? { search: value } : {});

  const {
    data: superheroesRaw,
    isLoading,
    error,
  } = superheroApi.useSearchSuperheros({ query: debouncedQuery });

  const total = superheroesRaw?.results.length ?? 0;
  const foundFor = superheroesRaw?.['results-for'];

  const superheroes = superheroesRaw?.results || [];

  const showNotFound =
    !isLoading && !superheroes?.length && !!debouncedQuery.length;
  const showError = error && !showNotFound;

  return (
    <section className="mx-auto my-4 h-full max-w-2xl rounded-2xl bg-gray-200 p-6">
      <SearchInput query={query} setQuery={setQuery} />

      {isLoading && (
        <div className="flex flex-col gap-4 text-center text-gray-500">
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
          </div>
          Searching...
        </div>
      )}

      {showError && (
        <p className="text-center text-red-500">Failed to load heroes.</p>
      )}

      {showNotFound && (
        <p className="text-center text-gray-500">No results found.</p>
      )}

      {!!superheroes?.length && (
        <>
          <p className="mb-4 text-sm text-gray-600">
            Found {total} heroes {foundFor && `for "${foundFor}"`}
          </p>

          <SuperheroList superheroes={superheroes} />
        </>
      )}
    </section>
  );
}
