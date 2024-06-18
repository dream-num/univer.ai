import type { IUser as IUniverserUser } from '@univerjs/protocol'
import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

export type IUser = Partial<IUniverserUser>

export const UserContext = createContext<{
  user: IUser
  setUser: Dispatch<SetStateAction<IUser>> | null
}>({
  user: {},
  setUser: null,
})
