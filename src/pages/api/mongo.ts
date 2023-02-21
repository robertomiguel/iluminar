import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!mongoose.connection.readyState) {
    const url: string = process.env.MONGODB_URI || ''
    console.log('Iniciando conexión a DB')
    mongoose.set('strictQuery', false);
    mongoose.connect(url)
    const db = mongoose.connection
    // ejecuta una vez
    db.once('open', () => {
        console.log('conectado a DB')
    })
    // ejecuta cada vez que hay un error
    db.on('error', (error) => {
        console.log('error de conexión en DB: ', error)
    })
  }
  res.end()
}
