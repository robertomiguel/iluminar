import { ColorFill } from '@/components/ColorFill'
import Head from 'next/head'
import React from 'react'
import io from 'socket.io-client'

export default function Home() {

  const [ socket, setSocket ] = React.useState<any>(null)
  const [ title, setTitle ] = React.useState<string>('Foto Arte')
  const [ socketData, setSocketData ] = React.useState<string>('')

  React.useEffect( () => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault()
    });
  },[])

  const socketInitializer: any = async () => {
    await fetch('/api/socket')
    const st = io()
    setSocket(st)
    st.on('connect', () => {
      setTitle('Foto Arte - (online)')
    })
    st.on('disconnect', () => {
      setTitle('Foto Arte - (offline)')
    })
  }

  React.useEffect(() => {
    socketInitializer()
  }, [])

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
