import Player, { Role } from './Player';

it('initializes a new player', () => {
  const name: string = "test";
  const id: number = 0;

  const player = new Player(id, name);

  expect(player instanceof Player).toBe(true);
  expect(player.accessId).toBe(id);
  expect(player.accessName).toBe(name);
  expect(player.accessAvatar).toBe(`https://api.adorable.io/avatars/285/${name}@adorable.png`);
  expect(player.accessScore).toBe(0);
  expect(player.accessRole).toBe(Role.None);
});

it('increases player score correctly', () => {
  const name: string = "test";
  const id: number = 0;

  const player = new Player(id, name);
  expect(player.accessScore).toBe(0);

  player.increaseScore();
  expect(player.accessScore).toBe(1);

  player.increaseScore();
  expect(player.accessScore).toBe(2);
});

it('changes player role correctly', () => {
  const name: string = "test";
  const id: number = 0;

  const player = new Player(id, name);
  expect(player.accessRole).toBe(Role.None);

  player.changeRole(Role.Draw);
  expect(player.accessRole).toBe(Role.Draw);

  player.changeRole(Role.Guess);
  expect(player.accessRole).toBe(Role.Guess);

  player.changeRole(Role.None);
  expect(player.accessRole).toBe(Role.None);
});