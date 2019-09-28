import Player from './Player';

export enum Status {
  Lobby = "LOBBY",
  RoundStarting = "ROUND_STARTING",
  RoundInProgress = "ROUND_IN_PROGRESS",
  RoundOver = "ROUND_OVER",
  GameOver = "GAME_OVER"
}

export default class Game {
  //Static properties
  static activeGames: Game[] = [];
  static words: string[] = [
    "battle ship",
    "death star",
    "swimming pool"//,
    // "fire man",
    // "scape goat",
    // "butter ball",
    // "moon walk",
    // "desk top",
    // "lap top",
    // "tea pot"
  ]

  //Static methods
  static generateCode(): string {
    var code: string = "";
    var codeGenerated: boolean = false;

    do {
      var characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var charactersLength = characters.length;
      for (var i = 0; i < 3; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      codeGenerated = true;
      for (const game of Game.activeGames) {
        if ((game.code = code)) {
          codeGenerated = false;
        }
      }
    } while (!codeGenerated);

    return code;
  };

  //Instance properties
  private code: string;
  private players: Player[];
  private wordsPlayed: string[];
  private status: Status;
  private timer: number = 0;


  //Accessor methods
  get accessCode() {
    return this.code;
  }

  get accessPlayers() {
    return this.players;
  }

  get accessStatus() {
    return this.status;
  }

  get accessTimer() {
    return this.timer;
  }

  //Constructor
  constructor() {
    this.code = Game.generateCode();
    this.players = [];
    this.wordsPlayed = [];
    this.status = Status.Lobby;
    this.timer = 0;
  }

  //Instance methods
  generateWord(): string {
    let word = Game.words[Math.floor(Math.random()*100)%Game.words.length];
    while (this.wordsPlayed.find((wordPlayed) => { return word === wordPlayed })){
      word = Game.words[Math.floor(Math.random()*100)%Game.words.length];
    }
    this.wordsPlayed.push(word);
    return word;
  }

  addPlayer(name: string): number {
    if (this.players.length < 8) {
      this.players.push(new Player(this.players.length+1, name));
      return this.players.length;
    }
    return 0;
  }

  getPlayerById(id: number) {
    return this.players.find((player) => { return player.accessId === id })
  }

  removePlayer(id: number): boolean {
    const oldPlayerList = this.players
    this.players = oldPlayerList.filter((player) => {
      return !(player.accessId === id);
    });

    if (this.players.length !== oldPlayerList.length) {
      return true;
    }
    return false;
  }

  startCountdown(): void {

  }

  start(): boolean {
    if (this.players.length >= 3){
      this.status = Status.RoundStarting;
      this.timer = 10;
      this.startCountdown();
      return true;
    }
    return false;
  }
}
