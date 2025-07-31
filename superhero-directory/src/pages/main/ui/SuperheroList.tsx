import { useRef } from 'react';

import SuperheroListItem from '~pages/main/ui/SuperheroListItem.tsx';

import { Superhero } from '~entities/superhero/superhero.ts';

import { useVirtualizer } from '@tanstack/react-virtual';

interface Props {
  superheroes: Superhero[];
}

export default function SuperheroList({ superheroes }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: superheroes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
    gap: 12,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto"
      style={{ position: 'relative' }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {items.map((virtualRow) => {
          const hero = superheroes[virtualRow.index];
          return (
            <div
              key={hero.id}
              data-index={virtualRow.index}
              ref={(el) => {
                if (el) virtualizer.measureElement(el);
              }}
              className="absolute left-0 w-full px-1"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <SuperheroListItem hero={hero} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
