import { Role } from '../models/Game'

/*
* In order to keep track of players
 */  
let players = 0

/*
 * We're defining every action name constant here
 * We're using Typescript's enum
 * Typescript understands enum better 
 */
export enum ActionTypes {
  SETUP = 'SETUP',
  ADD_PLAYER = 'ADD_PLAYER',
  REMOVE_PLAYER = 'REMOVE_PLAYER'
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

export interface AddPlayerAction { 
  type: ActionTypes.ADD_PLAYER, 
  payload: {
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

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
export function setup(): SetupAction {
  return {
    type: ActionTypes.SETUP,
    payload: {
      //This will need to be dynamically generated eventually
      code: 'AAA'
    }
  }
}

export function addPlayer(name: string = Role.Main): AddPlayerAction {
  if (name === Role.Main && players === 0) {
    return {
      type: ActionTypes.ADD_PLAYER,
      payload: {
        name,
        avatar: '',
        score: 0,
        role: Role.Main
      }
    }
  }
  
  return {
    type: ActionTypes.ADD_PLAYER,
    payload: {
      name,
      avatar: `https://api.adorable.io/avatars/285/${name}@adorable.png`,
      score: 0,
      role: Role.None
    }
  }
}

export function removePlayer(id: number): RemovePlayerAction {
  players--;
  
  return {
    type: ActionTypes.REMOVE_PLAYER,
    payload: {
      id
    }
  }
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = SetupAction | AddPlayerAction | RemovePlayerAction