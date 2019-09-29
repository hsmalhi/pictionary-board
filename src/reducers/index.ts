import { combineReducers } from 'redux'
import * as game from './game'

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
  game: game.State
}

/*
 * initialState of the app
 */
export const initialState: State = {
  game: game.initialState
}

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
  game: game.default
})