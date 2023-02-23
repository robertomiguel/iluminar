import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmailAndPassword } from '@/database/getUserByEmailAndPassword';
import { User } from '@/type/global';

export default NextAuth({
  providers: [
    // Sign in with passwordless email link
    Credentials({
        name: 'Cuenta Iluminada',
        credentials: {
            email: { label: "Usuario:", type: "text", placeholder: "usuario" },
            password: {  label: "Contraseña:", type: "password", placeholder: "contraseña" }
        },
        async authorize(credentials): Promise<User | null> {
            return await getUserByEmailAndPassword(credentials!.email, credentials!.password)
        }
    }),
    ],
    pages: {
        signIn: '/login',
    },
    jwt: {
        ///
    },
    session: {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        updateAge: 60 * 60 * 24, // 24 hours
    },
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.accessToken = account.access_token
              }
            return token
        },
        async session({token, session}) {
            Object.assign(session, {accessToken: token.accessToken} )
            return session
        },
        async redirect({ url, baseUrl }) {
            const params = url.split('?')
            const urlParams = new URLSearchParams(params[1])
            if (urlParams.has('p')) {
                return `${baseUrl}${urlParams.get('p')}`
            }
            return url
        },
    }

})
