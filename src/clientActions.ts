import { PlayerId, SeriesCreated, SeriesSummary } from "./dtos";
import { environment } from "./environment";

const getUrl = (append: string) => {    
    const {protocol, host, port} = environment.rest;
    return `${protocol}://${host}:${port}${append}`;
}

export const createSeries = (gameCount: number): Promise<SeriesCreated> => 
    fetch(getUrl('/series'), {
        method: 'POST',
        body: JSON.stringify({gameCount}),
        headers: {'Content-Type': 'application/json'},
    })
        .then<SeriesCreated> (response => response.json())

export const randomMove = (playerId: PlayerId): Promise<SeriesSummary> => 
    fetch(getUrl(`/series/${playerId}/game/random-move`), {
        method: 'POST',
    })
        .then<SeriesSummary> (response => response.json())