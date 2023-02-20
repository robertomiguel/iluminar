

export const getString = (name: string) => ({hola: name});

export const getAsync = (name: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(name);
        }, 1000);
    });
}