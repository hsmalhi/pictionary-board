import Game, { Status } from './Game';

it('initializes a new game', () => {
  const game = new Game();
  expect(game instanceof Game).toBe(true);
  expect(game.accessCode.length).toBe(3);
  expect(game.accessPlayers.length).toBe(0);
});

it('Game class generates unique words', () => {
  const game = new Game();

  const firstWord= game.generateWord();
  expect(typeof firstWord).toEqual('string');

  const secondWord= game.generateWord();
  expect(typeof firstWord).toEqual('string');

  const thirdWord= game.generateWord();
  expect(typeof firstWord).toEqual('string');

  expect(firstWord).not.toEqual(secondWord);
  expect(secondWord).not.toEqual(thirdWord);
});

it('adds players to a game', () => {
  const game = new Game();

  const firstName = "First";
  const firstId = game.addPlayer(firstName);

  let player = game.getPlayerById(firstId);
  expect(player).not.toBe(undefined);
  if (player) {
    expect(player.accessId).toEqual(firstId);
    expect(player.accessName).toEqual(firstName);
  }

  const secondName = "Second";
  const secondId = game.addPlayer(secondName);

  player = game.getPlayerById(secondId);
  expect(player).not.toBe(undefined);
  if (player) {
    expect(player.accessId).toEqual(secondId);
    expect(player.accessName).toEqual(secondName);
  }
});

it('game does not allow more than 8 players', () => {
  const game = new Game();

  game.addPlayer("1");
  game.addPlayer("2");
  game.addPlayer("3");
  game.addPlayer("4");
  game.addPlayer("5");
  game.addPlayer("6");
  game.addPlayer("7");
  game.addPlayer("8");
  game.addPlayer("9");
  game.addPlayer("10");

  expect(game.accessPlayers.length).toEqual(8);
});

it('removes a player from the game', () => {
  const game = new Game();

  const firstName = "First";
  const firstId = game.addPlayer(firstName);
  const secondName = "Second";
  const secondId = game.addPlayer(secondName);
  expect(game.removePlayer(firstId)).toBe(true);

  let player = game.getPlayerById(firstId);
  expect(player).toBe(undefined);
  
  player = game.getPlayerById(secondId);
  if (player) {
    expect(player.accessId).toEqual(secondId);
    expect(player.accessName).toEqual(secondName);
  }
});

it('starts a game only when there are enough players', () => {
  const game = new Game();

  const firstName = "First";
  const firstId = game.addPlayer(firstName);
  const secondName = "Second";
  const secondId = game.addPlayer(secondName);
  
  expect(game.startGame()).toBe(false);
  expect(game.accessStatus).toEqual(Status.Lobby);

  const thirdName = "Third";
  const thirdId = game.addPlayer(thirdName);

  expect(game.startGame()).toBe(true);
  expect(game.accessStatus).toEqual(Status.RoundStarting);
})

// it('starts a game and starts the round 10 seconds later', () => {
//   const game = new Game();

//   game.addPlayer("1");
//   game.addPlayer("2");
//   game.addPlayer("3");
//   game.addPlayer("4");
  
//   expect(game.startGame()).toBe(true);
//   expect(game.accessStatus).toEqual(Status.RoundStarting);
//   jest.advanceTimersByTime(11*1000);
//   expect(game.accessStatus).toEqual(Status.RoundOver);
// })