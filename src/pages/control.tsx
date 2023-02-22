import { Lineas } from '@/components/control/lineas'
import { Button } from '@/components/vamper/Button'
import { Caja } from '@/components/vamper/Caja'
import { AuthContext } from '@/context'
import { PageProps } from '@/type/global'
import Head from 'next/head'
import React, { useContext } from 'react'

export default function Control({ socket, title}: PageProps ) {

  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <div style={{width: '100%'}} >
        <Lineas socket={socket} />
        <Caja>
          {isLoggedIn &&
            <Button label='Salir' onClick={()=>{
              socket && socket.emit('control', 'logout')
            }} />
          }
        </Caja>
      </div>
    </>)
}
