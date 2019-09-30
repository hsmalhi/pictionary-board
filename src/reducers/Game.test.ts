import { createStore } from "redux";
import { initialState } from "./game";
import { setup, addPlayer, removePlayer, startGame } from "../actions/game";
import reducer from "./game";
import { Role, Status } from "../models/Game";

describe("game reducer", () => {
  it("initializes state", () => {
    const store = createStore(reducer, initialState);

    expect(store.getState()).toMatchObject({
      game: { code: "", status: Status.Lobby, timer: 0, players: [] }
    });
  });

  it("sets up the game", () => {
    const store = createStore(reducer, initialState);
    store.dispatch(setup());

    expect(store.getState().game.code).toEqual("AAA");
  });

  it("adds a player to the game and increments id correctly", () => {
    const store = createStore(reducer, initialState);
    store.dispatch(setup());
    store.dispatch(addPlayer("Test1"));

    expect(store.getState().game.players[1]).toMatchObject({
      id: 1,
      name: "Test1",
      avatar: `https://api.adorable.io/avatars/285/Test1@adorable.png`,
      score: 0,
      role: Role.None
    });

    store.dispatch(addPlayer("Test2"));

    expect(store.getState().game.players[2]).toMatchObject({
      id: 2,
      name: "Test2",
      avatar: `https://api.adorable.io/avatars/285/Test2@adorable.png`,
      score: 0,
      role: Role.None
    });
  });

  it("does not add more than 9 players", () => {
    const store = createStore(reducer, initialState);
    store.dispatch(setup());
    store.dispatch(addPlayer("Test1"));
    store.dispatch(addPlayer("Test2"));
    store.dispatch(addPlayer("Test3"));
    store.dispatch(addPlayer("Test4"));
    store.dispatch(addPlayer("Test5"));
    store.dispatch(addPlayer("Test6"));
    store.dispatch(addPlayer("Test7"));
    store.dispatch(addPlayer("Test8"));
    store.dispatch(addPlayer("Test9"));
    store.dispatch(addPlayer("Test10"));

    expect(store.getState().game.players.length).toEqual(9);
  });

  it("removes a player from the game and frees up id correctly", () => {
    const store = createStore(reducer, initialState);
    store.dispatch(setup());
    store.dispatch(addPlayer("Test1"));
    store.dispatch(removePlayer(1));
    expect(store.getState().game.players.length).toEqual(1);

    store.dispatch(addPlayer("Test1"));
    expect(store.getState().game.players[1]).toMatchObject({
      id: 1,
      name: "Test1",
      avatar: `https://api.adorable.io/avatars/285/Test1@adorable.png`,
      score: 0,
      role: Role.None
    });

    store.dispatch(addPlayer("Test2"));
    store.dispatch(removePlayer(2));
    store.dispatch(addPlayer("Test2"));
    expect(store.getState().game.players[2]).toMatchObject({
      id: 2,
      name: "Test2",
      avatar: `https://api.adorable.io/avatars/285/Test2@adorable.png`,
      score: 0,
      role: Role.None
    });
  });

  it("starts the game only when there are the right amount of players", () => {
    const store = createStore(reducer, initialState);
    store.dispatch(setup());
    store.dispatch(addPlayer("Test1"));
    store.dispatch(addPlayer("Test2"));

    store.dispatch(startGame());

    expect((store.getState().game.status = Status.Lobby));

    store.dispatch(addPlayer("Test3"));

    expect((store.getState().game.status = Status.RoundStarting));
  });
});
