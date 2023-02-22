
export interface PageProps {
    socket: any, title?: string
  }
  
export interface SendData {
    sendData: (data: string) => void,
    socketData: string,
}

export interface User {
    id: string,
    name?: string,
    email: string,
}