export enum Role {
  Draw = "DRAW",
  Guess = "GUESS",
  None = "NONE",
  Main = "MAIN"
}

export enum Status {
  Lobby = "LOBBY",
  RoundStarting = "ROUND_STARTING",
  RoundInProgress = "ROUND_IN_PROGRESS",
  RoundOver = "ROUND_OVER",
  GameOver = "GAME_OVER"
}

export default interface Game {
  code: string,
  status: Status,
  timer: number,
  players: {
    id: number;
    name: string;
    avatar: string;
    score: number;
    role: Role;
  }[]
}