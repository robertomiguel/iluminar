import React, { useContext } from 'react'
import { Button } from '@/components/vamper/Button'
import { Caja } from '@/components/vamper/Caja'
import { PageProps } from '@/type/global'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context'

export default function Home({ title}: PageProps ) {

  const router = useRouter()

  const context = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Caja vertical center color='orange' gap='10px' >
        <Caja>
          {context?.isLoggedIn && <div>{context?.user?.name}
            <a href="#" style={{color: 'orange', marginLeft: '16px'}} onClick={ e => {
              e.preventDefault()
              context?.logoutUser()
            }} >Salir</a>
          </div>}
        </Caja>
        <h1>iluminador</h1>
        <Button label="Control" onClick={() => router.push('/control')} />
        <Button label="Pantalla" onClick={() => router.push('/pantalla')} />
        <Button label="ColorFill" onClick={() => router.push('/colorfill')} />
        <h6>powered by Roberto</h6>
      </Caja>

    </>)
}
