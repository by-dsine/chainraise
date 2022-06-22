import { PlatformRole, UserProfile } from '@prisma/client'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { fetcher } from '../lib/prisma'

export default function useUserProfile() {
  const { data: session } = useSession()

  const { data, error } = useSWR<
    | (UserProfile & {
        platformRoles: (PlatformRole & {
          role: {
            isAdmin: boolean
          }
        })[]
      })
    | null
  >(() => `/api/userProfile/${session!.user.uid}`, fetcher)

  return {
    userProfile: data,
    isLoading: !error && !data,
    isError: error,
  }
}
