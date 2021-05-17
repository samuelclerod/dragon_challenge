import useSWR from 'swr';
import { fetcher } from '../services/fetcher';

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, isValidating, mutate } = useSWR<Data, Error>(url, async url => {
    const { data } = await fetcher.get(url);
    return data;
  });

  return { data, error, isValidating, mutate }
}