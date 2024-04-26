import { AvailableMoveResponse, FullPosition, IdLookupResponse, PlayerId, SeriesCreated, SeriesId, SeriesSummary } from "./dtos";
import { environment } from "./environment";

const getUrl = (append: string) => {    
    const {protocol, host, port} = environment.rest;
    return `${protocol}://${host}:${port}${append}`;
}

export const createSeries = (gameCount: number, timeControlSeconds: number, seriesName: string, description: string): Promise<SeriesCreated> => 
    fetch(getUrl('/api/series'), {
        method: 'POST',
        body: JSON.stringify({gameCount, timeControlSeconds, seriesName, description}),
        headers: {'Content-Type': 'application/json'},
    })
        .then<SeriesCreated> (response => response.ok ? response.json() : response.text())
        .then<SeriesCreated> (response => typeof response === 'string' ? Promise.reject(response) : response);

export const getAvailableMoves = (id: SeriesId | PlayerId): Promise<AvailableMoveResponse> =>
    fetch(getUrl(`/api/series/${id}/game/available-moves`), {
        method: 'GET',
    })
    .then<AvailableMoveResponse> (response => response.ok ? response.json() : response.text())
    .then<AvailableMoveResponse> (response => typeof response === 'string' ? Promise.reject(response) : response);

export const getSeries = (seriesId: SeriesId | PlayerId): Promise<SeriesSummary> =>
    fetch(getUrl(`/api/series/${seriesId}/summary`), {
        method: 'GET'
    })
        .then<SeriesSummary> (response => response.ok ? response.json() : response.text())
        .then<SeriesSummary> (response => typeof response === 'string' ? Promise.reject(response) : response);

export const lookupId = (id: SeriesId | PlayerId): Promise<IdLookupResponse> =>
    fetch(getUrl(`/api/id/${id}`), {
        method: 'GET'
    })
        .then<IdLookupResponse> (response => response.ok ? response.json() : response.text())
        .then<IdLookupResponse> (response => typeof response === 'string' ? Promise.reject(response) : response);


export const randomMove = (playerId: PlayerId): Promise<SeriesSummary> => 
    fetch(getUrl(`/api/series/${playerId}/game/random-move`), {
        method: 'POST',
    })
        .then<SeriesSummary> (response => response.ok ? response.json() : response.text())
        .then<SeriesSummary> (response => typeof response === 'string' ? Promise.reject(response) : response);

export const move = (playerId: PlayerId, position: FullPosition): Promise<SeriesSummary> =>
    fetch(getUrl(`/api/series/${playerId}/game/move/${position}`), {
        method: 'POST',        
    })
        .then<SeriesSummary> (response => response.ok ? response.json() : response.text())
        .then<SeriesSummary> (response => typeof response === 'string' ? Promise.reject(response) : response);
