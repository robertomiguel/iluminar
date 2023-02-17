import React from 'react'

export default function Home() {

  const [ rgb, setRgb ] = React.useState<string>('rgb(0, 0, 0)')
  const [ colorList, setColorList ] = React.useState<string[]>([])
  const [ showColorList, setShowColorList ] = React.useState<boolean>(false)


  const switchColor = () => {
    const newColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    setRgb(newColor)
    setColorList([...colorList, newColor])
  }

  return (
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
  )
}
