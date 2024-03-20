
import { PlayerId, SeriesId, } from "./dtos";
import { createSeries, getId, getSeries } from "./clientActions";
import { getPlayer } from "./player";
import { subscribe } from "./socketSubscription";

const playSeries = (playerId: PlayerId | SeriesId) => {
    
    getId(playerId)
        .then(idLookup => {
            if (idLookup.type === 'series') {
                console.log("I can't do anything with a series id! Computers don't like to watch.");
            } else {
                const player = getPlayer(playerId, idLookup.type === 'playerX' ? 'X' : 'O');
                subscribe(playerId, player.onUpdate)
            }
        });
}

createSeries(100, 600, 'The Big One', 'A series of 100 games with a 600 second time control')
    .then(sc => {
        console.log(`Series ${sc.id} created!`);
        console.log(`PlayerX: ${sc.playerIds.x} PlayerO: ${sc.playerIds.o}`);        
        setTimeout(() => {
            playSeries(sc.playerIds.x), 10000;
        });        
    })
    .catch(console.error);





