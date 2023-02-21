import React from 'react'
import { Caja } from "@/components/vamper/Caja";
import Head from "next/head";
import { useRouter } from 'next/router';
import { PageProps } from '@/type/global';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function Login({ socket }: PageProps) {

    const router = useRouter()

    const [email, setemail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    React.useEffect(() => {
        if (!socket) return
        socket.on('control', (value: string) => {
            if (value === 'logged' )
                router.replace(router.query?.p?.toString() || '/')
        });
        return () => {
            socket.off('control')
        };
    }, [socket, router])
    
    const handleClick = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        await signIn('credentials', { email, password })
        /* try {
            const res = await checkAuth()
            if (res === true) {
                socket.emit('control', 'logged')
                return
            }
            const res2 = await loginUser(email, password)
            if (res2 === true) {
                socket.emit('control', 'logged')
                // router.replace(router.query.redirect?.toString() || '/')
            }
        } catch (error) {
            console.log('error: ', error)
        } */
    }

    return (<>
        <Head>
          <title>Foto Arte - Acceso</title>
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <Caja color='orange' center>
            <h1>Acceso</h1>
        </Caja>
        <form noValidate>
            <Caja vertical color='yellow' gap='10px' padding='20px' >
                <label>email</label>
                <input type="text" value={email} onChange={ e => setemail(e.target.value)} />
                <label>Contraseña</label>
                <input type="password" value={password} onChange={ e => setPassword(e.target.value)} />
                <button onClick={handleClick} >Entrar</button>
            </Caja>
        </form>
    </>)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session
        }
    }
}