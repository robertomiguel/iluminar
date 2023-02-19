import React from 'react'
import Head from 'next/head'
import { PageProps } from '@/type/global';
import { PantallaEstilo } from '@/type/pantallaEstilo';
import { Lineas } from '@/components/pantalla/lineas';


export default function Pantalla({ socket, title}: PageProps ) {

    const [ socketData, setSocketData ] = React.useState<PantallaEstilo>()

    React.useEffect(() => {
        if (!socket) return
          socket.on('pantalla', (value: PantallaEstilo) => {
          setSocketData(value)
        });
        return () => {
          socket.off('pantalla')
        };
      }, [socket])

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