import useSWR from 'swr';
import { fetcher } from '../lib/prisma';
import { DisplayAdminUser } from '../types/typings';

export function useAllUsersForAdmin() {
   const { data, error } = useSWR<DisplayAdminUser[]>(
      `/api/admin/users`,
      fetcher
   );

   return {
      users: data,
      isLoading: !error && !data,
      isError: error,
   };
}
