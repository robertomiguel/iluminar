import { AuthState } from './'

type AuthAction = { type: 'LOGIN', payload: AuthState } | { type: 'LOGOUT' }

export const authReducer = (state: any, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload?.user,
                logoutUser: action.payload?.logoutUser
            }
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined
            }
        default:
            return state
    }
}