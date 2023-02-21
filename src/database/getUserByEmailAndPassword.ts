
const userList = [
    {
        id: "1",
        name: "Roberto",
        email: 'aaa',
        password: '123'
    },
    {
        id: '2',
        name: "Roberto Miguel",
        email: 'robertomiguel@outlook.com',
        password: 'RobertitoMiguelito1810'
    },
]

export const getUserByEmailAndPassword = async (email: string, password: string) => {

    const user = userList.find(user => user.email === email && user.password === password)

    return user ? {...user, password: undefined} : null 
}