
import { PlayerId, SeriesId, } from "./dtos";
import { createSeries, getAvailableMoves, lookupId, getSeries, move } from "./clientActions";
import { getPlayer } from "./player";
import { subscribe } from "./socketSubscription";

const playSeries = (playerId: PlayerId | SeriesId) => {
    
    lookupId(playerId)
        .then(idLookup => {
            if (idLookup.type === 'series') {
                console.log("I can't do anything with a series id! Computers don't like to watch.");
            } else {
                console.log(idLookup);
                const player = getPlayer(playerId, idLookup.type === 'playerX' ? 'X' : 'O');
                subscribe(playerId, player.onUpdate)
            }
        });
}

playSeries('1ebb5402-3fa1-47fd-8649-0c8d56a2ed04'); // X

playSeries('e4d161b7-95c8-4814-be5a-beb583959d8a'); // O

// createSeries(100, 15, 'The Big One', 'A series of 100 games with a 15 second time control')
//     .then(sc => {
//         console.log(`Series ${sc.id} created!`);
//         console.log(`PlayerX: ${sc.playerIds.x} PlayerO: ${sc.playerIds.o}`);        
//         setTimeout(() => {
//             playSeries(sc.playerIds.x);
//             playSeries(sc.playerIds.o);
//         }, 10000);        
//     })
//     .catch(console.error);





