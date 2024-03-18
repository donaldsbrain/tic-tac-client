import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./socket-events";
import { PlayerId, SeriesId, SeriesSummary } from "./dtos";
import { environment } from "./environment";

type UpdateCallback = (update: SeriesSummary) => void;

export const subscribe = (id: SeriesId | PlayerId, onUpdate: UpdateCallback) => {    
    const {protocol, host, port} = environment.socketIo;
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${protocol}://${host}:${port}`);
    socket.on("connect", () => {
        console.log(`Connected to server with ID: ${socket.id}`);  
        console.log(`Subscribing to series with ID: ${id}`);        
        socket.emit("subscribe", id, result => {
            if ('errorMessage' in result) {
                console.dir(result, { depth: null })
            } else {
                onUpdate(result);
            }
        });
    });
    
    socket.on("disconnect", () => {
        console.log(`Disconnected from server: ${socket.disconnected}`);
    });
    
    socket.on('connect_error', error => {    
        console.error(`Connection error: ${error.message}`)
    });
    
    socket.on('series-update', (update) => {        
        onUpdate(update);
    });
}