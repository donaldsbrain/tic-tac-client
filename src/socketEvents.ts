import { PlayerId, SeriesId, SeriesSummary } from "./dtos";

export type Error = {
    errorMessage: string
}

export type ClientToServerEvents = {
    subscribe: (
        id: PlayerId | SeriesId,
        callBack: (result: Error | SeriesSummary) => void
    ) => void;
}

export type ServerToClientEvents = {
    ["series-update"]: (update: SeriesSummary) => void
}