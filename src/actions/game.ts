import { Role, Status } from '../models/Game'

/*
* In order to keep track of players
 */  
let players: any;

/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better 
 */
export enum ActionTypes {
  SETUP = 'SETUP',
  UPDATE_PLAYERS = 'UPDATE_PLAYERS',
  ADD_PLAYER = 'ADD_PLAYER',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  START_GAME = 'START_GAME',
  START_ROUND = 'START_ROUND',
  END_ROUND = 'END_ROUND',
  END_GAME = 'END_GAME'
}

/*
 * Define return types of our actions 
 * Every action returns a type and a payload
 */
export interface SetupAction { 
  type: ActionTypes.SETUP, 
  payload: { 
    code: string
  } 
}

export interface UpdatePlayersAction { 
  type: ActionTypes.UPDATE_PLAYERS, 
  payload: {
    players: {
      id: number,
      name: string 
    } []
  }
}

export interface AddPlayerAction { 
  type: ActionTypes.ADD_PLAYER, 
  payload: {
    id: number,
    name: string,
    avatar: string, 
    score: number, 
    role: Role 
  } 
}

export interface RemovePlayerAction { 
  type: ActionTypes.REMOVE_PLAYER, 
  payload: { 
    id: number
  } 
}

export interface StartGameAction { 
  type: ActionTypes.START_GAME, 
  payload: {
    status: Status,
    timer: number,
    leftDrawer: number,
    rightDrawer: number
  } 
}

export interface StartRoundAction { 
  type: ActionTypes.START_ROUND, 
  payload: {
    status: Status,
    timer: number
  } 
}

export interface EndRoundAction { 
  type: ActionTypes.END_ROUND, 
  payload: {
    status: Status,
    timer: number,
    leftDrawer: number,
    rightDrawer: number
  } 
}

export interface EndGameAction { 
  type: ActionTypes.END_GAME, 
  payload: {
    status: Status
  }
}

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
export function setup(code: string): SetupAction {
  //Represents the ids that have or have not been taken by players yet
  players = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  };

  return {
    type: ActionTypes.SETUP,
    payload: {
      code
    }
  }
}

export function updatePlayers(players: any[]): UpdatePlayersAction {
 
  return {
    type: ActionTypes.UPDATE_PLAYERS,
    payload: {
      players
    }
  }
}

export function addPlayer(name: string): AddPlayerAction {
  let id = Number(Object.keys(players).find(key => players[key] === false));
  //If there are no available ids, set it to 999 which the reducer then knows not to add this player
  if (isNaN(id)) {
    id = 999;
  } else {
    //Reserve the id so the new player can use it
    players[id] = true;
  }

  return {
    type: ActionTypes.ADD_PLAYER,
    payload: {
      id,
      name: "chen",
      avatar: `https://api.adorable.io/avatars/285/${name}@adorable.png`,
      score: 0,
      role: Role.None
    }
  }
}

export function removePlayer(id: number): RemovePlayerAction {
  //Free up this id for new players to use
  players[id] = false;
  
  return {
    type: ActionTypes.REMOVE_PLAYER,
    payload: {
      id
    }
  }
}

export function startGame(timer: number, leftDrawer: number, rightDrawer: number): StartGameAction {
  return {
    type: ActionTypes.START_GAME,
    payload: {
      status: Status.RoundStarting,
      timer,
      leftDrawer,
      rightDrawer
    }
  }
}

export function startRound(timer: number): StartRoundAction {
  return {
    type: ActionTypes.START_ROUND,
    payload: {
      status: Status.RoundInProgress,
      timer
    }
  }
}

export function endRound(timer: number, leftDrawer: number, rightDrawer: number): EndRoundAction {
  return {
    type: ActionTypes.END_ROUND,
    payload: {
      status: Status.RoundOver,
      timer,
      leftDrawer,
      rightDrawer
    }
  }
}

export function endGame(): EndGameAction {
  return {
    type: ActionTypes.END_GAME,
    payload: {
      status: Status.GameOver
    }
  }
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = SetupAction | UpdatePlayersAction | AddPlayerAction | RemovePlayerAction | StartGameAction | StartRoundAction | EndRoundAction | EndGameAction