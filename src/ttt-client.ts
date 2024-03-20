
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
                console.log(idLookup);
                const player = getPlayer(playerId, idLookup.type === 'playerX' ? 'X' : 'O');
                subscribe(playerId, player.onUpdate)
            }
        });
}

playSeries('02f8c567-3395-46ca-8ddf-35d8b568ca80'); // X
playSeries('85ddc1e2-8877-4570-8c7c-ff47fabf82a6'); // O

// createSeries(100, 15, 'The Big One', 'A series of 100 games with a 15 second time control')
//     .then(sc => {
//         console.log(`Series ${sc.id} created!`);
//         console.log(`PlayerX: ${sc.playerIds.x} PlayerO: ${sc.playerIds.o}`);        
//         setTimeout(() => {
//             playSeries(sc.playerIds.x), 10000;
//         });        
//     })
//     .catch(console.error);





