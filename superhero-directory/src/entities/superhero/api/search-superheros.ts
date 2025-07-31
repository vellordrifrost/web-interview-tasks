import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/response';

import { useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../superhero';

export type Params = {
  query?: string;
};

type ResponsePayload = {
  'results-for': string;
  results: Superhero[];
};

export function useSearchSuperheros(params: Params) {
  const { query } = params;
  return useQuery({
    enabled: !!query,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 минут данные считаются свежими
    queryKey: superheroKeys.search(query ?? ''),
    queryFn: async () => {
      const res = await fetch(
        `${config.apiHost}/${config.apiToken}/search/${query?.toLowerCase()}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data: ResponseSuccess<ResponsePayload> | ResponseError =
        await res.json();

      if (!res.ok || data.response === 'error') {
        const errorMessage =
          data.response === 'error' ? data.error : 'Unknown error';

        throw new Error(
          `Error ${res.status}: ${res.statusText} - ${errorMessage}`
        );
      }

      return data;
    },
  });
}
