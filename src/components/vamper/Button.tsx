interface ButtonProps {
    label: string
    onClick?: () => void
    circle?: boolean,
    color?: string,
    background?: string,
    w?: string,
    h?: string,
    isDisabled?: boolean,
  }
  
export const Button = ({label, color, background, w, h, isDisabled, circle, onClick}: ButtonProps) => <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: isDisabled ? 'gray' : (background || '#1D4AB2'),
        color: color || 'white',
        width: circle ? '70px' : (w || '100px'),
        height: circle ? '70px' : (h || '30px'),
        padding: '10px',
        cursor: isDisabled ? 'no-drop' : 'pointer',
        border: '1px solid black',
        borderRadius: circle ? '50px' : '7px',
        fontSize: '1.2rem',
        letterSpacing: '2px',
    }} onClick={ e => {
        e.preventDefault()
        if (isDisabled) return
        e.stopPropagation()
        onClick && onClick()
    }} >
    {label}
</div>
  