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
        async jwt({token, account, user}) {
            /// console.log({token, account, user});
            token.accessToken = account?.access_token
            switch (account?.provider) {
                case 'credentials':
                    token = {
                        ...token,
                        user
                    }
                    break
                default:
                    break
            }
            return token
        },
        async session({token, session, user}): Promise<any> {
            const newSession = {
                ...session,
                accessToken: token?.accessToken,
                user: token?.user
            }
            return newSession
        }
    }

})
