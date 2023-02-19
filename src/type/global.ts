
export interface PageProps {
    socket: any, title: string
  }
  
export interface SendData {
    sendData: (data: string) => void,
    socketData: string,
}
