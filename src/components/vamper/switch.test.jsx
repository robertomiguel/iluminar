import { fireEvent, render, screen } from '@testing-library/react'
import { Switch } from './switch'

describe('Prueba del Switch', () => {
    test('match con snapshot', () => {
        const { container } = render(<Switch />)
        expect(container).toMatchSnapshot()
    })

    test('si está activo muestra SI', () => {
        const { container, getByText } = render(<Switch checked={true} />)
        const button = getByText('SI')
        expect(button).toBeTruthy()
    })

    test('si no está activo muestra NO', () => {
        const { container, getByText } = render(<Switch checked={false} />)
        const button = getByText('NO')
        expect(button).toBeTruthy()
    })

    test('screen test cuando checked es false', () => {
        render(<Switch checked={false} />)
        expect(screen.getByText('NO')).toBeTruthy()
        // el screen toma el Virtual DOM
    })

    test('onClick: Pasar de NO a SI', () =>{
        render(<Switch checked={false} />)
        fireEvent.click(screen.getByText('NO'))
        expect(screen.getByText('SI')).toBeTruthy()
        fireEvent.click(screen.getByLabelText('sw-button'))
        expect(screen.getByText('NO')).toBeTruthy()
    })
})