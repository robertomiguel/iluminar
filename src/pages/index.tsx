import { Button } from '@/components/vamper/Button'
import { Caja } from '@/components/vamper/Caja'
import { PageProps } from '@/type/global'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export default function Home({ socket, title}: PageProps ) {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Caja vertical center color='orange' gap='10px' >
        <h1>iluminador</h1>
        <Button label="Control" onClick={() => router.push('/control')} />
        <Button label="Pantalla" onClick={() => router.push('/pantalla')} />
        <Button label="ColorFill" onClick={() => router.push('/colorfill')} />
        <h6>powered by Roberto</h6>
      </Caja>

    </>)
}
