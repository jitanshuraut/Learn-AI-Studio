'use server'

import { signOut } from '../../auth'

export const logout = async () => {
  const val= await signOut()
  console.log(val)


}
