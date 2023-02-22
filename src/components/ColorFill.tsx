import { SendData } from '@/type/global'
import React from 'react'
import { Button } from './vamper/Button'

export const ColorFill = ({ sendData, socketData }: SendData ) => {
    const [ rgb, setRgb ] = React.useState<string>('rgb(0, 0, 0)')
    const [ colorList, setColorList ] = React.useState<string[]>([])
    const [ showColorList, setShowColorList ] = React.useState<boolean>(false)

    const switchColor = () => {
        const newColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        setColorList([...colorList, newColor])
        sendData(newColor)
    }

    React.useEffect(() => {
        if (socketData) {
            setRgb(socketData)
        }
    }, [socketData])
  
    return <div style={{
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
  
          
          {showColorList && <Button circle label="Blanco" background='white' color='black' onClick={() => setRgb('rgb(255, 255, 255)')} />}
          {showColorList && <Button circle label="Rojo" background='red' onClick={() => setRgb('rgb(255, 0, 0)')} />}
          {showColorList && <Button circle label="Verde" background='green' onClick={() => setRgb('rgb(0, 155, 0)')} />}
          {showColorList && <Button circle label="Azul" background='blue' onClick={() => setRgb('rgb(0, 0, 255)')} />}
  
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
}
