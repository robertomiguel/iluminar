import { Caja } from '@/components/vamper/Caja';
import { AuthContext } from '@/context';
import { PageProps } from '@/type/global';
import { PantallaEstilo } from '@/type/pantallaEstilo';
import React, { useEffect, useRef } from 'react'
import { Slider } from '../vamper/Slider';
import { Switch } from '../vamper/Switch';

interface Point {
    x: number;
    y: number;
}

const colors = [
    'red',
    'green',
    'blue',
    'white',
    'yellow',
    'orange',
    'purple',
    'brown',
    'pink',
    'gray',
    'cyan',
    'magenta',
    'lime',
    'teal',
    'indigo',
    'violet',
    'silver',
    'gold'
];

export default function Draw({ socket }: PageProps) {

    const { logoutUser } = React.useContext(AuthContext)

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevPosRef = useRef<Point | null>(null);
    const isDrawingRef = useRef(false);

    const [color, setColor] = React.useState<number>(3);
    const [ancho, setAncho] = React.useState<number>(2);

    const [ config, setConfig ] = React.useState<PantallaEstilo>({
        mostrarCanvas: false,
        imagen: '',
    })

    useEffect(()=>{
        socket && socket.emit('pantalla', config)
      },[socket, config])
    
      React.useEffect(() => {
        if (!socket) return
        socket.on('control', (value: string) => {
          if (value === 'logout') logoutUser()
        });
        return () => {
          socket.off('control')
        };
      }, [socket, logoutUser])

    useEffect(()=>{
        socket && socket.emit('pantalla', config)
    },[socket, config])

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (ctx && canvas) {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
        };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ancho, color]);

    const startDrawing = (e: MouseEvent) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (ctx) {
        const x = e.offsetX;
        const y = e.offsetY;

        prevPosRef.current = { x, y };
        isDrawingRef.current = true;
        }
    };

    const draw = (e: MouseEvent) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
      
        if (ctx && isDrawingRef.current) {
          const x = e.offsetX;
          const y = e.offsetY;
          const prevPos = prevPosRef.current;
      
          if (prevPos) {
            const midX = (prevPos.x + x) / 2;
            const midY = (prevPos.y + y) / 2;
            ctx.beginPath();
            ctx.moveTo(prevPos.x, prevPos.y);
            ctx.bezierCurveTo(prevPos.x, prevPos.y, midX, midY, x, y);
            ctx.strokeStyle = colors[color];
            ctx.lineWidth = ancho;
            ctx.lineCap = 'round';
            ctx.stroke();
            prevPosRef.current = { x, y };
          }
        }
      };
  const stopDrawing = () => {
    isDrawingRef.current = false;
    prevPosRef.current = null;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (ctx && canvas) {
        // enviar el canvas al servidor websocket
        const img = canvas.toDataURL('image/jpeg')
        setConfig(prev => ({...prev, imagen: img}))
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
  
    if (ctx && canvas ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setConfig(prev => ({...prev, imagen: undefined}))
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
  
    if (ctx && canvas) {
      // Obtener la URL de la imagen como base64
      const url = canvas.toDataURL('image/jpeg');
  
      // Crear un enlace de descarga
      const link = document.createElement('a');
      link.download = 'canvas.jpg';
      link.href = url;
  
      // Agregar el enlace al documento y hacer clic en él
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (<Caja>
        <Caja vertical gap='30px' >
            <Switch label="Mostrar" checked={config.mostrarCanvas} onChange={(value) => setConfig(prev => ({...prev, mostrarCanvas: value})) } />
            <Slider min={1} max={10} value={ancho} label='Ancho' w='100%' onChange={ v => setAncho(v) } />
            <Slider min={0} max={17} value={color} label={colors[color]} w='100%' onChange={ v => setColor(v) } />
            <button onClick={clearCanvas}>Limpiar</button>
            <button onClick={downloadCanvas}>Descargar</button>
            <button onClick={ () => logoutUser() }>Salir</button>
        </Caja>
        <div style={{border: '1px solid cyan', width: '1024px', height: '768px', margin: 'auto'}} >
            <canvas ref={canvasRef} width={1024} height={768} />;
        </div>
    </Caja>)
}
