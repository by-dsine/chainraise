import { useSession } from "next-auth/react"
import useSWR from "swr"
import { fetcher } from "../lib/prisma"

export default function useUserProfile() {
  const { data: session } = useSession()

  const { data, error } = useSWR(() => `/api/userProfile/getUserProfileById/${session!.user.uid}`, fetcher)

  return {
    userProfile: data,
    isLoading: !error && !data,
    isError: error
  }
}