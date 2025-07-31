import { Link } from 'react-router-dom';

import { Superhero } from '~entities/superhero/superhero.ts';

import { Img } from '~shared/components/Img.tsx';

interface Props {
  hero: Superhero;
}

export default function SuperheroListItem({ hero }: Props) {
  return (
    <Link
      to={`/${hero.id}`}
      className="block h-[100px] w-full rounded-md border bg-white p-4 shadow-md transition hover:opacity-90 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <Img
          src={hero.image?.url}
          alt={hero.name}
          className="h-16 w-16 rounded-full border object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold">{hero.name}</h2>
          <p className="text-sm text-gray-600">
            {hero.biography?.['full-name'] || 'Unknown'}
          </p>
        </div>
      </div>
    </Link>
  );
}
