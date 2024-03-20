import { IdLookupResponse, PlayerId, SeriesCreated, SeriesId, SeriesSummary } from "./dtos";
import { environment } from "./environment";

const getUrl = (append: string) => {    
    const {protocol, host, port} = environment.rest;
    return `${protocol}://${host}:${port}${append}`;
}

export const createSeries = (gameCount: number, timeControlSeconds: number, seriesName: string, description: string): Promise<SeriesCreated> => 
    fetch(getUrl('/series'), {
        method: 'POST',
        body: JSON.stringify({gameCount, timeControlSeconds, seriesName, description}),
        headers: {'Content-Type': 'application/json'},
    })
        .then<SeriesCreated> (response => response.json())

export const getSeries = (seriesId: SeriesId | PlayerId): Promise<SeriesSummary> =>
    fetch(getUrl(`/series/${seriesId}/summary`), {
        method: 'GET'
    })
        .then<SeriesSummary> (response => response.json())

export const getId = (id: SeriesId | PlayerId): Promise<IdLookupResponse> =>
    fetch(getUrl(`/series/${id}/summary`), {
        method: 'GET'
    })
        .then<IdLookupResponse> (response => response.json());


export const randomMove = (playerId: PlayerId): Promise<SeriesSummary> => 
    fetch(getUrl(`/series/${playerId}/game/random-move`), {
        method: 'POST',
    })
        .then<SeriesSummary> (response => response.json())