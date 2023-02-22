import { Caja } from "../vamper/Caja"
import React from 'react'
import { PantallaEstilo } from "@/type/pantallaEstilo"
import { Slider } from "../vamper/Slider"
import { Switch } from "../vamper/Switch"
import { AuthContext } from "@/context"
import { PageProps } from "@/type/global"

export const Lineas = ({ socket }: PageProps ) => {

    const { logoutUser } = React.useContext(AuthContext)

    const [ config, setConfig ] = React.useState<PantallaEstilo>({
        mostrarLineas: false,
        lineasVerticales: 20,
        lineasAnchoVerticales: 2,
        rotarLineaVertical: 0,
        lineaVerticalColor: '#FFFFFF',
        cambiarVerticalHorizontal: false,
        lineaMultiColor: false,
        lineasSpin: false,
        lineasDos: false,
        rotarSpeed: 5,
  })

  const updateConfig = (key: string, value: any) => setConfig({...config, [key]: value})

  React.useEffect(()=>{
    socket && socket.emit('pantalla', config)
  },[socket, config])

  React.useEffect(() => {
    if (!socket) return
    socket.on('control', (value: string) => {
      if (value === 'logout') logoutUser()
    });
    return () => {
      socket.off('control')
    };
  }, [socket, logoutUser])


    return <>
        <Caja gap='5px'>
            <Slider min={1} max={100} value={20} label='lineas Verticales' w='100%' onChange={ v => updateConfig('lineasVerticales', v)} />
            <Slider min={0} max={360} value={0} label='Rotar lineas' w='100%' onChange={ v => updateConfig('rotarLineaVertical', v)} />
            <Caja vertical gap='5px' w='100%' >
                <Slider min={1} max={10} value={5} label='Rotar Speed' w='100%' onChange={ v => updateConfig('rotarSpeed', v)} />
                <Slider min={1} max={50} value={2} label='Linea Ancho' w='100%' onChange={ v => updateConfig('lineasAnchoVerticales', v)} />
            </Caja>
        </Caja>
        <Caja gap='20px' >
            <Switch checked={config?.mostrarLineas} label='Ver lineas' onChange={ v => updateConfig('mostrarLineas', v)} />
            <Switch checked={config?.lineasSpin} label='Rotar' onChange={ v => updateConfig('lineasSpin', v) } />
            <Switch checked={config?.lineasDos} label='Dos Lineas' onChange={ v => updateConfig('lineasDos', v) } />
            <Switch checked={config?.cambiarVerticalHorizontal} label='Cambiar a Vertical' onChange={ v => updateConfig('cambiarVerticalHorizontal', v) } />
        </Caja>
    </>
}