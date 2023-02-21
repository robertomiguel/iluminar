import { User } from '@/type/global'
import { createContext } from 'react'

export interface ContextProps {
    isLoggedIn: boolean
    user?: User
    logoutUser: () => void
}

export const AuthContext = createContext({} as ContextProps)
