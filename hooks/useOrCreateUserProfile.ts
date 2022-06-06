import { UserProfile } from '@prisma/client'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { fetcher } from '../lib/prisma'

export default function useOrCreateUserProfile() {
  const { data: session } = useSession()

  const { data, error } = useSWR<UserProfile>(() => `/api/userProfile/${session!.user.uid}`, fetcher)

  return {
    userProfile: data,
    session: session,
    isLoading: !error && !data,
    isError: error,
  }
}
