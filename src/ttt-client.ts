
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

//playSeries('5759a838-e670-4b16-bc7c-62560fc8a4ee'); // X

// playSeries(''); // O

// createSeries(100, 15, 'The Big One', 'A series of 100 games with a 15 second time control')
//     .then(sc => {
//         console.log(`Series ${sc.id} created!`);
//         console.log(`PlayerX: ${sc.playerIds.x} PlayerO: ${sc.playerIds.o}`);        
//         setTimeout(() => {
//             playSeries(sc.playerIds.x), 10000;
//         });        
//     })
//     .catch(console.error);





