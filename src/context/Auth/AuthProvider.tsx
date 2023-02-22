import { User } from '@/type/global'
import { FC, useReducer, PropsWithChildren, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { useSession, signOut } from 'next-auth/react'

export interface AuthState {
    isLoggedIn: boolean
    user?: User
    logoutUser?: () => void
}

interface Props {
    children: React.ReactNode | undefined,
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<PropsWithChildren<Props>> = ({ children  }) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    
    const { data, status} = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({
                type: 'LOGIN',
                payload: {
                    isLoggedIn: true,
                    user: data.user as User,
                    logoutUser: () => signOut()
                },
            })
        } else {
            dispatch({
                type: 'LOGOUT',
            })
        }   
    }, [data, status])

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}