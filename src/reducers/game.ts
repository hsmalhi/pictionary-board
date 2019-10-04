import Game, { Status, Role } from '../models/Game'
import { ActionTypes, Action } from '../actions/game'

// Define our State interface for the current reducer
export interface State {
  game: Game
}

// Define our initialState.
export const initialState: State = {
  game: {
    code: '',
    status: Status.Lobby,
    timer: 0,
    players: [],
    leftDrawer: null,
    rightDrawer: null,
    word: null
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
        ...state,
        game: {
          ...state.game,
          code,
          players: [{
            id: 0,
            name: Role.Main,
            avatar: "",
            score: 0,
            role: Role.Main,
            correct: false
          }]
        }
      }
    }

    case ActionTypes.UPDATE_PLAYERS: {
      let players: any = [];

      action.payload.players.forEach((player, index) => {
        if (state.game.players[index]) {
          players[index] = state.game.players[index]
        } else {
          players[index] = {
            id: player.id,
            name: player.name,
            avatar: `https://api.adorable.io/avatars/285/${player.name}@adorable.png`,
            score: 0,
            role: Role.None,
            correct: false
          }

        }
      });
      
      return {
        ...state,
        game : {
          ...state.game,
          players: players
        }
      }
    }

    case ActionTypes.ADD_PLAYER: {
      if (action.payload.id === 999) {
        return state
      }

      const player = {
        id: action.payload.id,
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

    case ActionTypes.START_GAME: {
      if (state.game.players.length >= 4 && state.game.players.length <= 9) {
        return {
          ...state,
          game : {
            ...state.game,
            status: action.payload.status,
            timer: action.payload.timer,
            leftDrawer: action.payload.leftDrawer,
            rightDrawer: action.payload.rightDrawer,
            word: action.payload.word
          }
        }
      }

      //The player count is too low or too high
      return state
    }

    case ActionTypes.START_ROUND: {
      return {
        ...state,
        game : {
          ...state.game,
          status: action.payload.status,
          timer: action.payload.timer
        }
      }
    }

    case ActionTypes.END_ROUND: {
      let players = state.game.players.map((player: any) => {
        return {
          ...player,
          correct: false
        }
      });

      return {
        ...state,
        game : {
          ...state.game,
          timer: action.payload.timer,
          status: action.payload.status,
          leftDrawer: action.payload.leftDrawer,
          rightDrawer: action.payload.rightDrawer,
          word: action.payload.word,
          players
        }
      }
    }

    case ActionTypes.END_GAME: {
      return {
        ...state,
        game : {
          ...state.game,
          status: action.payload.status
        }
      }
    }

    case ActionTypes.UPDATE_SCORE: {

      let players = state.game.players;
      players[action.payload.playerId].score++;
      players[action.payload.playerId].correct = true;

      return {
        ...state,
        game: {
          ...state.game,
          players
        }
      }
    }

    default:
      return state
  }
}