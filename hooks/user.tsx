import useSWR from 'swr'
import { fetcher } from '../lib/prisma'

export function useUser (id: string) {

    const { data, error } = useSWR(`/api/user/${id}`, fetcher)
  
    return {
      user: data,
      isLoading: !error && !data,
      isError: error
    }
  }
