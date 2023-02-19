import { CircleButton } from '@/components/CircleButton'
import Head from 'next/head'
import React from 'react'
import io from 'Socket.IO-client'

export default function Home() {

  const [ socket, setSocket ] = React.useState<any>(null)
  const [ title, setTitle ] = React.useState<string>('Foto Arte')
  const [ rgb, setRgb ] = React.useState<string>('rgb(0, 0, 0)')
  const [ colorList, setColorList ] = React.useState<string[]>([])
  const [ showColorList, setShowColorList ] = React.useState<boolean>(false)


  const switchColor = () => {
    const newColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    setColorList([...colorList, newColor])
    sendData(newColor)
  }

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
      setRgb(value)
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
    <div style={{
      background: rgb,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
    }} onClick={() => !showColorList ? switchColor() : setShowColorList(false) } >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }} >
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: showColorList ? 'white' : 'black',
            color: showColorList ? 'black' : 'white',
            width: '100px',
            height: '100px',
            cursor: 'pointer',
            borderRadius: '50px'}} onClick={ e => {
          e.preventDefault()
          e.stopPropagation()
          setShowColorList(prev => !prev)
        }} >
          Foto Arte
        </div>

        
        {showColorList && <CircleButton label="Blanco" onClick={() => setRgb('rgb(255, 255, 255)')} />}
        {showColorList && <CircleButton label="Rojo" onClick={() => setRgb('rgb(255, 0, 0)')} />}
        {showColorList && <CircleButton label="Verde" onClick={() => setRgb('rgb(0, 155, 0)')} />}
        {showColorList && <CircleButton label="Azul" onClick={() => setRgb('rgb(0, 0, 255)')} />}

        {showColorList && <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'blue',
            color: 'white',
            width: '80px',
            height: '80px',
            cursor: 'pointer',
            borderRadius: '50px'}} onClick={ e => {
          e.preventDefault()
          e.stopPropagation()
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
          }
        }} >
          Expandir
        </div>}

        {showColorList && <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'red',
            color: 'white',
            width: '100px',
            height: '100px',
            cursor: 'pointer',
            borderRadius: '50px'}} onClick={ e => {
          e.preventDefault()
          e.stopPropagation()
          setColorList([])
          setShowColorList(false)
        }} >
          Limpiar
        </div>}
      </div>
      {showColorList && <div style={{background: 'white'}} onClick={ e => e.stopPropagation() } >
        { colorList.map(
          (rgbColor) => <div
            key={rgbColor}
            onClick={ () => setRgb(rgbColor) }
            style={{
              display: 'inline-block',
              width: '200px',
              height: '100px',
              cursor: 'pointer',
              background: rgbColor }}>{rgbColor}</div>
        )}
      </div>}
    </div>
    </>)
}
