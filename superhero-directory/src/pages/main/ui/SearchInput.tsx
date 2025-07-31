interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchInput({ query, setQuery }: Props) {
  return (
    <input
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setQuery('');
        }
      }}
      autoFocus
      type="search"
      placeholder="Search superheroes..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className={
        'sticky top-10 mb-6 w-full rounded-md border bg-gray-100 px-4 py-2 font-bold uppercase italic shadow-sm'
      }
    />
  );
}
