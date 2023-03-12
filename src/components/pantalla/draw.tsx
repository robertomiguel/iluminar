import { PantallaEstilo } from "@/type/pantallaEstilo"
import Image from "next/image"
import React from "react"

interface PantallaComponenteProps {
    pantalla: PantallaEstilo
}
  
export const Draw = ({pantalla}: PantallaComponenteProps) => {


    return <div style={{color: 'white'}} >
        <div style={{border: '1px solid cyan', width: '1024px', height: '768px', margin: 'auto'}} >
            {pantalla?.imagen &&
                <Image src={pantalla.imagen} alt='canvas' width={1024} height={768} />
            }
        </div>
    </div>
  }
  