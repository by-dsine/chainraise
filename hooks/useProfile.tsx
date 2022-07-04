import { PlatformRole, Profile } from '@prisma/client';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetcher } from '../lib/prisma';

export default function useProfile() {
   const { data: session } = useSession();

   const { data, error } = useSWR<
      | (Profile & {
           platformRoles: (PlatformRole & {
              role: {
                 isAdmin: boolean;
              };
           })[];
        })
      | null
   >(() => `/api/profile/${session!.user.uid}`, fetcher);

   return {
      profile: data,
      isLoading: !error && !data,
      isError: error,
   };
}
