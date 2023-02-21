import { ColorFill } from '@/components/ColorFill'
import { PageProps } from '@/type/global'
import Head from 'next/head'
import React from 'react'

export default function Color({ socket, title}: PageProps ) {

  const [ socketData, setSocketData ] = React.useState<string>('')

  const sendData = (data: string) => socket.emit('pantalla', data)

  React.useEffect(() => {
    if (!socket) return
      socket.on('pantalla', (value: string) => {
      setSocketData(value)
    });
    return () => {
      socket.off('pantalla')
    };
  }, [socket])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <ColorFill sendData={sendData} socketData={socketData} />
    </>)
}
