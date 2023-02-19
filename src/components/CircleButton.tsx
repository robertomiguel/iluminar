interface CircleButtonProps {
    label: string
    onClick: () => void
  }
  
export const CircleButton = ({label, onClick}: CircleButtonProps) => <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    color: 'black',
    width: '80px',
    height: '80px',
    cursor: 'pointer',
    border: '1px solid black',
    borderRadius: '50px'}} onClick={ e => {
        e.preventDefault()
        e.stopPropagation()
        onClick()    
    }} >
    {label}
</div>
  