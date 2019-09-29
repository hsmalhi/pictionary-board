import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { reducer, initialState } from '../reducers'

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const store = createStore(reducer, initialState, applyMiddleware(logger))

export default store