// Hook to get user data in a more convenient way
import { useSession } from 'next-auth/react'

export const useCurrentUser = () => {
  const session = useSession()
  console.log(session.data?.user)
  return session.data?.user
}
