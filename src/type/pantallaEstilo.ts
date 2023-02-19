import { CSSProperties } from "react"

export interface PantallaEstilo {

    rgb?: string

    mostrarLineas?: boolean

    rotarSpeed?: number
    lineasSpin?: boolean
    cambiarVerticalHorizontal: boolean
    lineaMultiColor: boolean
    lineasAnchoVerticales?: number
    lineasDos?: boolean
    lineasVerticales?: number
    lineasVerticalesEstilo?: CSSProperties
    lineaVerticalColor?: string
    rotarLineaVertical?: number

}