import { getString, getAsync } from './getString';

describe('Pruebas en el archivo getString.js', () => {

    test('primer testing', async () => { 

        const name = 'Roberto';

        const name2 = await getAsync(name);

        // Inicialización
        const mensaje = { hola: name };

        // Estímulo
        const mensaje2 = getString(name);

        // Observar el comportamiento
        expect(typeof mensaje2).toBe('object'); // ===
        expect(typeof name).toBe('string'); // ===

        expect(name2).not.toBeNull(); // !==

        // .not compara si es diferente
        // .not.toBeNull compara si es diferente de null
        // .not.toBeUndefined compara si es diferente de undefined
        // .not.toMatchSnapshot compara si es diferente con funciones
        // .not.toThrowError compara si es diferente con funciones
        // .not.toThrowErrorMatchingSnapshot compara si es diferente con funciones
        // .toBe no compara objetos, solo valores primitivos
        // .toBeCloseTo compara si es igual con decimales
        // .toBeGreaterThan compara si es mayor
        // .toBeGreaterThanOrEqual compara si es mayor o igual
        // .toBeLessThan compara si es menor
        // .toBeLessThanOrEqual compara si es menor o igual
        // .toBeNull compara si es null
        // .toBeTruthy compara si es verdadero
        // .toBeUndefined compara si es undefined
        // .toContain compara si es igual con arrays
        // .toEqual compara objetos
        // .toFalsy compara si es falso
        // .toMatch compara si es igual con expresiones regulares
        // .toMatchSnapshot compara si es igual con funciones
        // .toThrow compara si es igual con funciones
        // .toThrowError compara si es igual con funciones

    })
})
