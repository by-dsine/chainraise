import useSWR from 'swr'
import { fetcher } from '../lib/prisma'
import { DisplayUser } from '../types/typings'

export function useAllUsersForAdmin() {

    const { data, error } = useSWR<DisplayUser[]>(`/api/admin/users`, fetcher)
  
    return {
      users: data,
      isLoading: !error && !data,
      isError: error
    }
  }
