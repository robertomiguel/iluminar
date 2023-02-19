import { PantallaEstilo } from "@/type/pantallaEstilo";
import { useEffect, useState } from "react";

interface PantallaComponenteProps {
  pantalla: PantallaEstilo
}

export const Lineas = ({pantalla}: PantallaComponenteProps) => {
  const [ rotar, setRotar ] = useState<number>(0)

  useEffect(()=>{
    const intervalId = setInterval(() => {
      setRotar(prev => rotar === 360 ? 0 : prev + .1)
    }, pantalla?.rotarSpeed || 7 )
    if (!pantalla?.lineasSpin) {
      clearInterval(intervalId)
      setRotar(0)
    }
    return () => clearInterval(intervalId);
  },[pantalla?.lineasSpin, rotar, pantalla?.rotarSpeed])

  return <><div 
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: pantalla?.cambiarVerticalHorizontal ? 'grid' : 'flex',
    height: '100%',
    transform: `rotate(${pantalla?.lineasSpin ? rotar : (pantalla?.rotarLineaVertical || 0)}deg)`,
    ...pantalla?.lineasVerticalesEstilo
  }} >
    {
        [...Array(pantalla?.lineasVerticales)].map((_, i) => 
            <div
              style={{
                borderColor: pantalla?.lineaMultiColor ? 'blue' : undefined,
                borderLeft: !pantalla?.cambiarVerticalHorizontal ? `${pantalla?.lineasAnchoVerticales}px solid ${pantalla?.lineaVerticalColor}` : '',
                borderBottom: pantalla?.cambiarVerticalHorizontal ? `${pantalla.lineasAnchoVerticales}px solid ${pantalla.lineaVerticalColor}`: '',
                width: '100%',
                height: '100%',
                padding: '0px',
              }}
              key={`linea${i}`}
            />
        )
    }
  </div>
  <div 
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: pantalla?.cambiarVerticalHorizontal ? 'grid' : 'flex',
    height: '100%',
    transform: `rotate(${pantalla?.lineasSpin ? rotar * -1 : ((Number(pantalla?.rotarLineaVertical) * -1) || 0)}deg)`,
    ...pantalla?.lineasVerticalesEstilo
  }} >
    {pantalla?.lineasDos && Boolean(rotar + Number(pantalla.rotarLineaVertical)||0) &&
        [...Array(pantalla?.lineasVerticales)].map((_, i) => 
            <div
              style={{
                borderColor: pantalla?.lineaMultiColor ? 'blue' : undefined,
                borderLeft: !pantalla?.cambiarVerticalHorizontal ? `${pantalla?.lineasAnchoVerticales}px solid ${pantalla?.lineaVerticalColor}` : '',
                borderBottom: pantalla?.cambiarVerticalHorizontal ? `${pantalla?.lineasAnchoVerticales}px solid ${pantalla.lineaVerticalColor}`: '',
                width: '100%',
                height: '100%',
                padding: '0px',
              }}
              key={`linea2${i}`}
            />
        )
    }
  </div>
  </>
}
