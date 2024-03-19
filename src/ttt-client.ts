
import { PlayerId, SeriesCreated, SeriesId, SeriesSummary } from "./dtos";
import { createSeries, getSeries } from "./clientActions";
import { getPlayer } from "./player";
import { subscribe } from "./socketSubscription";

const playSeries = (series: SeriesCreated) => {
    const playerX = getPlayer(series.playerIds.x, 'X');
    getSeries(series.playerIds.x)
        .then(summary => subscribe(summary.id, playerX.onUpdate));        
    

    const playerO = getPlayer(series.playerIds.o, 'O');
    getSeries(series.playerIds.o)
        .then(summary => subscribe(summary.id, playerO.onUpdate));
}

createSeries(100, 15, 'The Big One', 'A series of 100 games with a 15 second time control')
    .then(sc => {
        console.log(`Series ${sc.id} created!`);        
        setTimeout(() => playSeries(sc), 10000);
    })
    .catch(console.error);





