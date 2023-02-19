import React from 'react'

interface SliderProps {
    value?: number
    min?: number
    max?: number
    step?: number
    onChange?: (value: number) => void
    label?: string
    w?: string
}

export const Slider = ({label, value, min, max, step, w, onChange}: SliderProps) => {

    const [val, setVal] = React.useState<number>(value || 0)

    return <div style={{
        background: 'black',
        borderRadius: '7px',
        textAlign: 'center',
        border: '1px solid yellow',
        overflow: 'hidden',
        width: w || '50%',
    }} >
        <div style={{marginLeft: '5px', fontSize: '18px', color: 'white'}}>
            {label}
        </div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'black',
            borderTop: '1px solid yellow',
        }} >
            <div style={{
                width: '50px',
                color: 'yellow',
                padding: '3px 0px 3px 5px',
                letterSpacing: '2px',
                borderRight: '1px solid yellow',
            }} >{val}</div>
            <input
                style={{
                    marginRight: '5px',
                    marginLeft: '5px',
                    width: w || '100%',
                }}
                type="range"
                min={min || 0}
                max={max || 9999}
                step={step || 1}
                value={val}
                onChange={e => {
                        const val = parseFloat(e.target.value)
                        setVal(val)
                        onChange && onChange(val)
                    }
                }
            />
        </div>
    </div>
}