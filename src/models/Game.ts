export enum Role {
  Draw = "DRAW",
  Guess = "GUESS",
  None = "NONE",
  Main = "MAIN"
}

export default interface Game {
  code: string,
  players: {
    id: number;
    name: string;
    avatar: string;
    score: number;
    role: Role;
  }[]
}