
import { PlayerId, SeriesCreated, SeriesId, SeriesSummary } from "./dtos";
import { createSeries } from "./clientActions";
import { getPlayer } from "./player";
import { subscribe } from "./socketSubscription";

const playSeries = (series: SeriesCreated) => {
    const playerX = getPlayer(series.playerIds.x, 'X');
    subscribe(series.id, playerX.onUpdate)

    const playerO = getPlayer(series.playerIds.o, 'O');
    subscribe(series.id, playerO.onUpdate);
}

createSeries(2)
    .then(playSeries)
    .catch(console.error);





