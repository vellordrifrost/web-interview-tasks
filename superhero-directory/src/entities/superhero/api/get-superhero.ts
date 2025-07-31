import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/response';

import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../superhero';

export type Params = {
  id?: string;
};

export function useSuperhero(params: Params) {
  const { id } = params;

  return useQuery({
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 минут данные считаются свежими
    queryKey: superheroKeys.superhero(id ?? ''),
    queryFn: id
      ? async () => {
          const response = await fetch(
            `${config.apiHost}/${config.apiToken}/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const data: ResponseSuccess<Superhero> | ResponseError =
            await response.json();

          if (!response.ok || data.response === 'error') {
            const errorMessage =
              data.response === 'error' ? data.error : 'Unknown error';

            throw new Error(
              `Error ${response.status}: ${response.statusText} - ${errorMessage}`
            );
          }

          return data;
        }
      : skipToken,
    retry: false,
  });
}
