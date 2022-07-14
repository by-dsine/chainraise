import { Profile } from '@prisma/client';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetcher } from '../lib/prisma';

export default function useOrCreateProfile() {
   const { data: session } = useSession();

   const { data, error } = useSWR<Profile>(
      () => `/api/userProfile/upsert/${session!.user.uid}`,
      fetcher
   );

   return {
      profile: data,
      session: session,
      isLoading: !error && !data,
      isError: error,
   };
}
