import { createStore } from 'redux';
import game, { initialState } from "./game";
import { setup, addPlayer, removePlayer } from "../actions/game";
import reducer from './game';
import { Role } from '../models/Game';

describe("game reducer", () => {

  it("initializes state", () => {
    const store = createStore(reducer, initialState);

    expect(store.getState()).toMatchObject({
      game: { code: '', players: [] }
    })
  });

  it("sets up the game", () => {
    const store = createStore(reducer, initialState);
    store.dispatch(setup());

    expect(store.getState()).toMatchObject({
      game: { code: 'AAA', players: [] }
    })
  });

  it("adds a player to the game", () => {
    const store = createStore(reducer, initialState);
    store.dispatch(setup());
    store.dispatch(addPlayer());

    expect(store.getState()).toMatchObject({
      game: { code: 'AAA', players: [{
        id: 0,
        name: Role.Main,
        avatar: "",
        score: 0,
        role: Role.Main
      }] }
    })
  });

  it("removes a player from the game", () => {
    const store = createStore(reducer, initialState);
    store.dispatch(setup());
    store.dispatch(addPlayer());
    store.dispatch(removePlayer(0));

    expect(store.getState()).toMatchObject({
      game: { code: 'AAA', players: [] }
    })
  })
});
