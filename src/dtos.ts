const boardPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
type BoardPosition = typeof boardPositions[number];



export type AvailableMoveResponse = {
    turn: TurnInProgress
    available: FullPosition[]
}

export type FullPosition = `${BoardPosition}:${BoardPosition}`;

export type GameSummary = {
    turnsTaken: number
    secondsUsed: {
        x: number
        o: number
    }
    currentTurn: [PositionValue] | []
    availableMoves: FullPosition[]
    previousMoves: {value: PositionValue, position: FullPosition}[]
}

export type PlayerId = string;

export type PositionValue = 'X' | 'O';

export type SeriesCreated = {
    id: SeriesId
    playerIds: {
        x: PlayerId
        o: PlayerId
    }
    timeControlSeconds: number
    totalGamesCount: number
}

export type SeriesId = string;

export type SeriesSummary = {
    id: SeriesId
    currentGame: [GameSummary] | []
    timeControlSeconds: number
    gamesCompletedCount: number
    totalGamesCount: number
}

export type TurnInProgress = {
    startTime: Date
    toMove: PositionValue
}
