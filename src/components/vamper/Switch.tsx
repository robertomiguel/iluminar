import React from 'react'
interface SwitchProps {
    checked?: boolean
    onChange?: (checked: boolean) => void
    label?: string
}

export const Switch = ({checked, label, onChange}: SwitchProps) => {

    const [check, setCheck] = React.useState<boolean>(checked || false)

    React.useEffect(() => {
        setCheck(checked || false)
    }, [checked])

    const BOX = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80px',
        height: '30px',
        cursor: 'pointer',
    }

    return <div style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1px',
        }}>
        <div style={{
            color: 'white',
            fontSize: '16px',
            letterSpacing: '2px',
            background: 'black',
            padding: '5px',
            borderRadius: '7px',
        }}
        >{label}</div>
        <div style={{
            display: 'flex',
            background: check ? '#1D4AB2' : 'black',
            color: check ? 'yellow' : 'gray',
            border: '1px solid yellow',
            borderRadius: '15px',
            overflow: 'hidden',
            width: '80px'
        }}>
            <div aria-label='sw-button' style={BOX} onClick={ e => {
                e.stopPropagation()
                setCheck(!check)
                onChange && onChange(!check)
            }} >{check ? 'SI' : 'NO'}</div>
        </div>
    </div>
}