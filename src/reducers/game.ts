import Game from '../models/Game'
import { ActionTypes, Action } from '../actions/game'

// Define our State interface for the current reducer
export interface State {
  game: Game
}

// Define our initialState.
export const initialState: State = {
  game: {
    code: '',
    players: []
  }
}

/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in game reducer, action type is Action defined in our actions/game file.
 */
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case ActionTypes.SETUP: {
      const code = action.payload.code

      return {
        game: {
          ...state.game,
          code,
        }
      }
    }

    case ActionTypes.ADD_PLAYER: {
      const player = {
        id: (state.game.players.length > 0 ? state.game.players[state.game.players.length-1].id+1 : 0),
        name: action.payload.name,
        avatar: action.payload.avatar,
        score: action.payload.score,
        role: action.payload.role
      }

      return {
        ...state,
        game : {
          ...state.game,
          players: [...state.game.players, player]
        }
      }
    }

    case ActionTypes.REMOVE_PLAYER: {
      return {
        ...state,
        game : {
          ...state.game,
          players: state.game.players.filter((player) => {
            return !(player.id === action.payload.id)
          })
        }
      }
    }

    default:
      return state
  }
}