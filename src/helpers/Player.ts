export enum Role {
  Draw = "DRAW",
  Guess = "GUESS",
  None = "NONE"
}

export default class Player {
  //Instance properties
  private id: number;
  private name: string;
  private avatar: string;
  private score: number;
  private role: Role;

  //Accessor methods

  get accessId() {
    return this.id;
  }

  get accessName() {
    return this.name;
  }

  get accessAvatar() {
    return this.avatar;
  }

  get accessScore() {
    return this.score;
  }

  get accessRole() {
    return this.role;
  }

  //Constructor
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.role = Role.None;
    this.avatar = `https://api.adorable.io/avatars/285/${name}@adorable.png`;
  }

  //Instance methods
  increaseScore(): void {
    this.score++;
  }

  changeRole(role: Role): void {
    this.role = role;
  }
}
