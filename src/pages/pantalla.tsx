import React from 'react'
import Head from 'next/head'
import { PageProps } from '@/type/global';
import { PantallaEstilo } from '@/type/pantallaEstilo';
import { Lineas } from '@/components/pantalla/lineas';
import { useRouter } from 'next/router';

export default function Pantalla({ socket, title}: PageProps ) {

    const [ socketData, setSocketData ] = React.useState<PantallaEstilo>()
    const router = useRouter()

    React.useEffect(() => {
        if (!socket) return
        socket.on('pantalla', (value: PantallaEstilo) => {
          setSocketData(value)
        });
        socket.on('control', (value: string) => {
          if (value === 'logout') router.replace('/login?p=/pantalla')
        });
        return () => {
          socket.off('pantalla')
          socket.off('control')
        };
      }, [socket, router])

    return (<>
        <Head>
          <title>{title}</title>
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <div>
            {socketData?.mostrarLineas && <Lineas pantalla={socketData} /> }
        </div>
    </>)
}