import type { AppProps } from 'next/app'
import React from 'react'
import io from 'socket.io-client'
import '../style/global.css'

export default function App({ Component, pageProps }: AppProps) {

  const [ socket, setSocket ] = React.useState<any>(null)
  const [ title, setTitle ] = React.useState<string>('Foto Arte')

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

  React.useEffect( () => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault()
    });
  },[])

  return <Component {...{...pageProps, socket, title}} />
}
