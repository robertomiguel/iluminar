import { PropsWithChildren, ReactElement } from "react"

interface CajaProps extends PropsWithChildren<any> {
    vertical?: boolean
    w?: string
    h?: string
    color?: string
    background?: string
    gap?: string
    top?: string
    left?: string
    right?: string
    bottom?: string
    position?: 'absolute' | 'relative' | 'fixed' | 'static' | 'sticky',
    padding?: string,
    center?: boolean,
}

export const Caja = (props: CajaProps): ReactElement => {

    return <div style={{
        position: props?.position,
        width: props?.w || 'auto',
        height: props?.h || 'auto',
        top: props?.top,
        left: props?.left,
        right: props?.right,
        bottom: props?.bottom,
        background: props?.background,
        color: props?.color,
        display: 'flex',
        gap: props?.gap,
        flexDirection: props?.vertical ? 'column' : 'row',
        justifyContent: props?.gap ? undefined : props?.center ? 'center' : 'space-between',
        alignItems: 'center',
        padding: props?.padding,
    }} >{props?.children}</div>
}